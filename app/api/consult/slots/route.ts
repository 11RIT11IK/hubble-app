// app/api/consult/slots/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const dateParam = req.nextUrl.searchParams.get("date"); // e.g., "2026-11-15"
  if (!dateParam) {
    return NextResponse.json({ message: "Date is required" }, { status: 400 });
  }

  const startOfDay = new Date(`${dateParam}T00:00:00.000Z`);
  const endOfDay = new Date(`${dateParam}T23:59:59.999Z`);

  const bookedConsults = await prisma.consult.findMany({
    where: {
      slotTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: "CONFIRMED",
    },
    select: {
      slotTime: true,
    },
  });

  const bookedTimes = bookedConsults
    .map((c) => c.slotTime?.toISOString())
    .filter(Boolean);

  return NextResponse.json({ bookedTimes });
}