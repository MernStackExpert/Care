import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ message: "userId query param is required" }), { status: 400 });
  }

  const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
  return new Response(JSON.stringify(bookings), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
