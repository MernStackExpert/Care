"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const ServiceDetailPage = ({ params }) => {
  const { id } = params;
  const [service, setService] = useState(null);
  const [user, setUser] = useState(null);
  const [duration, setDuration] = useState(1);
  const [location, setLocation] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push("/login");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        const found = data.find(s => s._id === id);
        if (!found) setService({ notFound: true });
        else {
          setService(found);
          setTotalCost(found.price);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    if (service && !service.notFound) setTotalCost(service.price * duration);
  }, [duration, service]);

  const handleBooking = async () => {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: service._id,
        userId: user.uid,
        duration,
        location,
        totalCost,
        status: "Pending"
      })
    });

    const data = await res.json();
    if (res.ok) router.push("/my-bookings");
    else alert(data.message);
  };

  if (!service) return <p className="text-center py-10">Loading service...</p>;
  if (service.notFound) return <p className="text-center py-10">No data available for this service.</p>;

  return (
    <section className="py-10 container mx-auto px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
        <p className="text-gray-500 mb-6">{service.description}</p>
        <p className="text-lg font-bold mb-6">Price per unit: {service.price} ৳</p>

        <div className="mb-4">
          <label className="font-bold mb-2 block">Duration (days/hours)</label>
          <input
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold mb-2 block">Location / Address</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <p className="font-bold mb-4">Total Cost: {totalCost} ৳</p>

        <button
          onClick={handleBooking}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700"
        >
          Confirm Booking
        </button>
      </div>
    </section>
  );
};

export default ServiceDetailPage;
