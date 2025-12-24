import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return Response.json({ message: "Invalid ID" }, { status: 400 });
  }

  const service = await Service.findById(id);

  if (!service) {
    return Response.json({ message: "Service not found" }, { status: 404 });
  }

  return Response.json(service);
}
