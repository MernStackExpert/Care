import { NextResponse } from "next/server";

export async function GET() {
  const services = [
    {
      id: "baby-care",
      title: "Baby Care",
      desc: "Trusted and loving babysitters who ensure your child's safety, nutrition, and happiness while you are away.",
      price: 500,
    },
    {
      id: "elderly-care",
      title: "Elderly Service",
      desc: "Compassionate care for seniors, focusing on their health monitoring, companionship, and daily assistance.",
      price: 700,
    },
    {
      id: "sick-care",
      title: "Sick People Service",
      desc: "Professional home nursing and support for individuals recovering from illness or requiring medical attention.",
      price: 600,
    },
  ];

  return NextResponse.json(services);
}