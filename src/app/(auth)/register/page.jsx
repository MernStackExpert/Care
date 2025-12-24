"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser, FaIdCard, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", nid: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validatePassword = (pass) => {
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const isLongEnough = pass.length >= 6;
    return hasUpper && hasLower && isLongEnough;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentErrors = {};

    if (!formData.nid || formData.nid.length < 10) currentErrors.nid = "Invalid NID number.";
    if (!validatePassword(formData.password)) currentErrors.password = "Requires 6+ chars, 1 uppercase & 1 lowercase.";
    
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      setLoading(true);
      try {
        // 1. Create User in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // 2. Update Auth Profile (Display Name)
        await updateProfile(user, { displayName: formData.fullName });

        // 3. Save additional data to Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          fullName: formData.fullName,
          email: formData.email,
          nid: formData.nid,
          createdAt: new Date()
        });

        router.push("/"); // Redirect after success
      } catch (error) {
        setErrors({ firebase: error.message });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen container mx-auto bg-base-200 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 text-black">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-800 mb-2">
            Create <span className="heading-gradient">Account</span>
          </h2>
          <p className="text-gray-500 font-medium">Join Care.xyz today</p>
        </div>

        {errors.firebase && (
          <p className="bg-red-100 text-red-600 p-3 rounded-xl text-center text-sm font-bold mb-4">
            {errors.firebase}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 ml-2 uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Full Name" className="w-full bg-base-200 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary font-medium text-black" onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 ml-2 uppercase tracking-widest">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" placeholder="Email Address" className="w-full bg-base-200 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary font-medium text-black" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 ml-2 uppercase tracking-widest">NID Number</label>
              <div className="relative">
                <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="NID Number" className={`w-full bg-base-200 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 font-medium text-black ${errors.nid ? 'ring-2 ring-red-400' : 'focus:ring-primary'}`} onChange={(e) => setFormData({...formData, nid: e.target.value})} required />
              </div>
              {errors.nid && <p className="text-red-500 text-[10px] font-bold ml-2 italic">{errors.nid}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 ml-2 uppercase tracking-widest">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`w-full bg-base-200 border-none rounded-2xl py-4 pl-12 pr-12 focus:ring-2 font-medium text-black ${errors.password ? 'ring-2 ring-red-400' : 'focus:ring-primary'}`} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[10px] font-bold ml-2 italic">{errors.password}</p>}
            </div>
          </div>

          <div className="max-w-md mx-auto pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 h-auto rounded-2xl text-lg font-black uppercase tracking-widest text-white transition-all ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-lg'}`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <p className="text-center text-gray-500 font-bold text-sm mt-6">Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;