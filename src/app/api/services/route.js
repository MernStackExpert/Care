import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({});
    return new Response(JSON.stringify(services), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Failed to fetch services" }), { status: 500 });
  }
}
