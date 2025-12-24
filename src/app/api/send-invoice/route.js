import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, totalCost, serviceName } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"Care.xyz" <mdnirob30k@gmail.com>',
      to: email,
      subject: "Your Booking Invoice - Care.xyz",
      html: `<h1>Invoice</h1><p>Service: ${serviceName}</p><p>Total Amount: ${totalCost} BDT</p><p>Status: Pending</p>`,
    });
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}