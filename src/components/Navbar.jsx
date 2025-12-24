"use client";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-5 bg-gray-800 text-white">
      <Link href="/">Care.xyz</Link>
      <div className="flex gap-4">
        <Link href="/my-bookings">My Bookings</Link>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </nav>
  );
}