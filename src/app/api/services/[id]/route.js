import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return new Response(JSON.stringify({ message: "Service not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(service), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
