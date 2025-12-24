import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;

  const booking = await Booking.findById(id);
  if (!booking) {
    return new Response(JSON.stringify({ message: "Booking not found" }), { status: 404 });
  }

  booking.status = "Cancelled";
  await booking.save();

  return new Response(JSON.stringify({ message: "Booking cancelled", booking }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
