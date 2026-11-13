//our consult form submission api end point like a server our next js router handles

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	try {
  const body = await req.json();
  const { name, email, phone, company, message } = body;		

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, phone and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

		const cleanedPhone = phone.replace(/[\s-+()]/g, "");
    const phoneRegex = /^(?:91)?[6-9]\d{9}$/;

      if (!phoneRegex.test(cleanedPhone)) {
        return NextResponse.json(
          { error: "Please enter a valid 10-digit Indian mobile number." },
          { status: 400 }
        );
      }

			console.log(prisma)
   const newConsult = await prisma.consult.create({
      data: {
        name,
        email,
        phone,
        company: company || null,
        message,
        status: "PENDING",
      },
    });

	return NextResponse.json({ success: true, id: newConsult.id }, { status: 201 });

  } catch (error) {

		console.error("Consult creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}