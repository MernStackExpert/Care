"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", nid: "", contact: "" });
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert("Password requirements not met");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      router.push("/booking/default");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
        <input type="text" placeholder="Name" required className="border p-2" onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input type="text" placeholder="NID No" required className="border p-2" onChange={(e) => setFormData({...formData, nid: e.target.value})} />
        <input type="email" placeholder="Email" required className="border p-2" onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input type="text" placeholder="Contact" required className="border p-2" onChange={(e) => setFormData({...formData, contact: e.target.value})} />
        <input type="password" placeholder="Password" required className="border p-2" onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <button type="submit" className="bg-blue-500 text-white p-2">Register</button>
      </form>
    </div>
  );
}