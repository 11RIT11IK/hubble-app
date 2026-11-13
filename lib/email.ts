// lib/email.ts
import nodemailer from "nodemailer";

interface ConfirmationEmailParams {
  to: string;
  name: string;
  slotTime: string;
  meetLink: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendConfirmationEmail({
  to,
  name,
  slotTime,
  meetLink,
}: ConfirmationEmailParams) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="color: #111827; margin-bottom: 16px;">Consultation Confirmed!</h2>
      <p style="color: #374151; font-size: 16px;">Hi <strong>${name}</strong>,</p>
      <p style="color: #374151; font-size: 16px;">
        Your consultation with <strong>Hubble (Cavli Wireless)</strong> has been scheduled. A calendar invitation has also been sent to your email[cite: 1].
      </p>
      
      <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0 0 8px 0; color: #111827;"><strong>Date & Time:</strong> ${slotTime}</p>
        <p style="margin: 0; color: #111827;">
          <strong>Google Meet Link:</strong> 
          <a href="${meetLink}" style="color: #2563eb; text-decoration: underline;">${meetLink}</a>
        </p>
      </div>

      <a href="${meetLink}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        Join Google Meet
      </a>

      <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
        If you need to reschedule or have any questions before our call, simply reply to this email.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Hubble Team" <${process.env.SMTP_USER}>`,
    to,
    subject: `Consultation Confirmed - ${slotTime}`,
    html: htmlContent,
  });
}