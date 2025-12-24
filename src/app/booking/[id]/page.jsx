"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; 
import { addDoc, collection } from "firebase/firestore";

export default function BookingPage({ params }) {
  const [duration, setDuration] = useState(1);
  const [location, setLocation] = useState({ division: "", district: "", city: "", area: "", address: "" });
  const serviceCharge = 500; 
  const totalCost = duration * serviceCharge;

  const handleBooking = async () => {
    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        serviceId: params.id,
        duration,
        location,
        totalCost,
        status: "Pending",
        createdAt: new Date(),
      });
      
      await fetch('/api/send-invoice', {
        method: 'POST',
        body: JSON.stringify({ email: "user@email.com", totalCost, serviceName: params.id })
      });

      alert("Booking Successful!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Book Service: {params.id}</h1>
      
      <div className="mt-5 space-y-4">
        <input 
          type="number" 
          placeholder="Duration (Hours)" 
          className="border p-2 w-full"
          onChange={(e) => setDuration(e.target.value)}
        />
        
        <input 
          type="text" 
          placeholder="Full Address" 
          className="border p-2 w-full"
          onChange={(e) => setLocation({...location, address: e.target.value})}
        />

        <div className="bg-gray-100 p-4 rounded">
          <p className="text-lg">Total Cost: <strong>{totalCost} BDT</strong></p>
        </div>

        <button 
          onClick={handleBooking}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}