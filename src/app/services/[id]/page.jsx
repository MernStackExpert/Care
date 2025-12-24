import Link from "next/link";

export async function generateMetadata({ params }) {
  return { title: `Details of ${params.id} | Care.xyz` };
}

export default function ServiceDetail({ params }) {
  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold capitalize mb-4">{params.id.replace("-", " ")}</h1>
      <div className="bg-gray-100 h-64 w-full rounded-lg mb-6 flex items-center justify-center">
        [Service Image Placeholder]
      </div>
      <p className="text-gray-700 mb-6">
        Our professional caregivers are trained to provide the best possible support 
        for your loved ones. We ensure safety, hygiene, and emotional well-being.
      </p>
      <Link href={`/booking/${params.id}`} className="bg-blue-600 text-white px-8 py-3 rounded-lg block text-center font-bold">
        Book This Service
      </Link>
    </div>
  );
}