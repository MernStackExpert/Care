import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  serviceId: { type: String, required: true },
  duration: { type: Number, required: true }, // hours or days
  location: {
    division: String,
    district: String,
    city: String,
    area: String,
    address: String,
  },
  totalCost: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;
