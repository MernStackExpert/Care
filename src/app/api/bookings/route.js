import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const { userId, serviceId, duration, location, totalCost } = body;

  if (!userId || !serviceId || !duration || !totalCost || !location) {
    return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
  }

  const newBooking = await Booking.create({
    userId,
    serviceId,
    duration,
    location,
    totalCost,
    status: "Pending"
  });

  return new Response(JSON.stringify({ message: "Booking created", booking: newBooking }), {
    status: 201,
    headers: { "Content-Type": "application/json" }
  });
}
