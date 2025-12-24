"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const MyBookings = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`/api/bookings/my-bookings?userId=${user.uid}`)
        .then(res => res.json())
        .then(data => setBookings(data));
    }
  }, [user]);

  const handleCancel = async (id) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.status === 200) setBookings(bookings.map(b => b._id === id ? { ...b, status: "Cancelled" } : b));
    else alert(data.message);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-black mb-6">My Bookings</h2>
      {bookings.length === 0 && <p>No bookings found</p>}
      <div className="space-y-4">
        {bookings.map(b => (
          <div key={b._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-bold">{b.serviceId}</p>
              <p>Duration: {b.duration}</p>
              <p>Status: {b.status}</p>
            </div>
            {b.status !== "Cancelled" && (
              <button onClick={() => handleCancel(b._id)} className="bg-red-600 text-white px-4 py-2 rounded">
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
