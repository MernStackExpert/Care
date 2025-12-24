"use client";
import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, "bookings"), where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        setBookings(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    };
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    await deleteDoc(doc(db, "bookings", id));
    setBookings(bookings.filter(b => b.id !== id));
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">My Bookings</h1>
      <div className="grid gap-4">
        {bookings.map((b) => (
          <div key={b.id} className="border p-4 flex justify-between">
            <div>
              <p className="font-bold">{b.serviceName}</p>
              <p>Cost: {b.totalCost} BDT | Status: {b.status}</p>
              <p>Location: {b.location.address}</p>
            </div>
            <button onClick={() => cancelBooking(b.id)} className="bg-red-500 text-white px-3 py-1">Cancel</button>
          </div>
        ))}
      </div>
    </div>
  );
}