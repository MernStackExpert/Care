import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

export async function GET(req) {
  await connectDB();
  const services = await Service.find();
  return new Response(JSON.stringify(services), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
