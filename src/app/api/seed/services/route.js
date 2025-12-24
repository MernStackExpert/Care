import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

export async function POST() {
  await connectDB();

  await Service.deleteMany();

  await Service.insertMany([
    {
      name: "Baby Care Service",
      description: "Professional babysitting service at your home",
      price: 500,
      category: "baby",
    },
    {
      name: "Elderly Care Service",
      description: "Trusted elderly care and daily assistance",
      price: 600,
      category: "elderly",
    },
    {
      name: "Sick Patient Care",
      description: "Home nursing and sick patient support",
      price: 700,
      category: "sick",
    },
    {
      name: "Newborn Care",
      description: "Professional care for newborn babies, 24/7 support",
      price: 900,
      category: "baby",
    },
    {
      name: "Post-Surgery Care",
      description: "Home care for patients recovering from surgery",
      price: 750,
      category: "sick",
    },
    {
      name: "Elderly Companion Service",
      description: "Companionship and support for elderly people",
      price: 650,
      category: "elderly",
    }
  ]);

  return new Response(JSON.stringify({ message: "Services seeded successfully" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
