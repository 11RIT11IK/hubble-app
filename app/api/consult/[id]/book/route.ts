
import { NextRequest, NextResponse, after } from "next/server";
import { google } from "googleapis";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail } from "@/lib/email";

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: "v3", auth });
const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2002"
  );
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const consultId = parseInt(id, 10);

    if (isNaN(consultId)) {
      return NextResponse.json({ message: "Invalid consultation ID" }, { status: 400 });
    }

    const body = await req.json();
    const { slotTime } = body;

    if (!slotTime) {
      return NextResponse.json({ message: "Please select a time slot." }, { status: 400 });
    }

    const startTime = new Date(slotTime);
    if (isNaN(startTime.getTime())) {
      return NextResponse.json({ message: "Invalid slot time" }, { status: 400 });
    }
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

    const consult = await prisma.consult.findUnique({ where: { id: consultId } });

    if (!consult) {
      return NextResponse.json({ message: "Consultation record not found" }, { status: 404 });
    }

    // Is this slot already booked? Check BEFORE calling Google
    const taken = await prisma.consult.findFirst({
      where: { slotTime: startTime, status: "CONFIRMED" },
      select: { id: true },
    });
    if (taken) {
      return NextResponse.json(
        { message: "This time slot was just booked. Please choose a different slot." },
        { status: 409 }
      );
    }

    // 1. Create the Google Calendar event with a Meet link
    let googleEventId: string | null = null;
    let meetLink: string | null = null;

    try {
      const created = await calendar.events.insert({
        calendarId,
        conferenceDataVersion: 1, 
        sendUpdates: "all", 
        requestBody: {
          summary: `Consultation: ${consult.name} (${consult.company || "Individual"})`,
          description: `Message: ${consult.message}\nPhone: ${consult.phone || "N/A"}\nEmail: ${consult.email}`,
          start: { dateTime: startTime.toISOString(), timeZone: "UTC" },
          end: { dateTime: endTime.toISOString(), timeZone: "UTC" },
          attendees: [{ email: consult.email, displayName: consult.name }],
          conferenceData: {
            createRequest: {
              requestId: `meet-${consultId}-${Date.now()}`,
              conferenceSolutionKey: { type: "hangoutsMeet" },
            },
          },
        },
      });

      googleEventId = created.data.id ?? null;
      meetLink = created.data.hangoutLink ?? null;

      for (let i = 0; i < 3 && !meetLink && googleEventId; i++) {
        await sleep(1000);
        const fresh = await calendar.events.get({ calendarId, eventId: googleEventId });
        meetLink = fresh.data.hangoutLink ?? null;
      }
    } catch (calendarError) {
      console.error("Google Calendar error:", calendarError);
      return NextResponse.json(
        { message: "We could not create the calendar event. Please try again." },
        { status: 502 }
      );
    }

    if (!googleEventId || !meetLink) {
      console.error("Google created no Meet link", { googleEventId, meetLink });
      return NextResponse.json(
        { message: "The meeting link could not be created. Please try again." },
        { status: 502 }
      );
    }
    const link: string = meetLink;

    const updatedConsult = await prisma.consult.update({
      where: { id: consultId },
      data: {
        slotTime: startTime,
        meetLink: link,
        googleEventId,
        status: "CONFIRMED",
      },
    });

    after(async () => {
      try {
        await sendConfirmationEmail({
          to: consult.email,
          name: consult.name,
          slotTime: `${startTime.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "full",
            timeStyle: "short",
          })} IST`,
          meetLink: link,
        });
      } catch (emailErr) {
        console.error("Background confirmation email failed:", emailErr);
      }
    });

    return NextResponse.json({
      success: true,
      message: "Booking confirmed successfully!",
      data: updatedConsult,
    });
  } catch (error) {
    console.error("Booking error:", error);

    if (isUniqueViolation(error)) {
      return NextResponse.json(
        { message: "This time slot was just booked by another user. Please choose a different slot." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error during booking." },
      { status: 500 }
    );
  }
}