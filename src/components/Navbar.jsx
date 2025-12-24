"use client";
import { useState, useEffect } from "react";
import { FaHeartbeat } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isActive = (path) => pathname === path;

  const navLinks = (
    <>
      <li>
        <Link href="/" className={isActive("/") ? "text-blue-600 font-bold px-4 py-2" : "font-medium hover:text-blue-600 px-4 py-2"} onClick={() => setIsOpen(false)}>
          Home
        </Link>
      </li>
      {user && (
        <li>
          <Link href="/my-bookings" className={isActive("/my-bookings") ? "text-blue-600 font-bold px-4 py-2" : "font-medium hover:text-blue-600 px-4 py-2"} onClick={() => setIsOpen(false)}>
            My Bookings
          </Link>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <FaHeartbeat className="text-blue-600 text-2xl" />
          <span className="text-xl font-bold">Care.xyz</span>
        </Link>

        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-4 font-medium">
            {navLinks}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <button onClick={() => signOut(auth)} className="bg-red-500 text-white px-6 py-2 rounded-full font-bold">
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full font-bold">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">
                  Register
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-blue-600 text-3xl">
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute left-0 w-full bg-white border-b shadow-xl p-5 z-40">
          <ul className="flex flex-col gap-3">
            {navLinks}
            <div className="flex flex-col gap-4 mt-4">
              {user ? (
                <button onClick={() => signOut(auth)} className="bg-red-500 text-white p-2 rounded-xl">Logout</button>
              ) : (
                <>
                  <Link href="/login" className="border-2 border-blue-600 text-center text-blue-600 p-2 rounded-xl" onClick={() => setIsOpen(false)}>Login</Link>
                  <Link href="/register" className="bg-blue-600 text-white text-center p-2 rounded-xl" onClick={() => setIsOpen(false)}>Register</Link>
                </>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;