"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaUser,
  FaIdCard,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    nid: "",
    password: "",
  });

  const router = useRouter();

  const validatePassword = (pass) => {
    return (
      /[A-Z]/.test(pass) &&
      /[a-z]/.test(pass) &&
      pass.length >= 6
    );
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentErrors = {};

    if (!formData.fullName.trim())
      currentErrors.fullName = "Name required";

    if (!validateEmail(formData.email))
      currentErrors.email = "Invalid email address";

    if (!formData.nid || formData.nid.length < 10)
      currentErrors.nid = "Invalid NID number";

    if (!validatePassword(formData.password))
      currentErrors.password =
        "6+ chars, 1 uppercase & 1 lowercase required";

    setErrors(currentErrors);

    if (Object.keys(currentErrors).length !== 0) return;

    try {
      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      await updateProfile(userCredential.user, {
        displayName: formData.fullName,
      });

      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          uid: userCredential.user.uid,
          fullName: formData.fullName,
          email: formData.email,
          nid: formData.nid,
          role: "user",
          createdAt: serverTimestamp(),
        }
      );

      router.push("/");
    } catch (err) {
      setErrors({
        firebase:
          err.code === "auth/email-already-in-use"
            ? "Email already in use"
            : "Registration failed. Try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen container mx-auto bg-base-200 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 text-black">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-800 mb-2">
            Create <span className="heading-gradient">Account</span>
          </h2>
          <p className="text-gray-500 font-medium">
            Join Care.xyz today
          </p>
        </div>

        {errors.firebase && (
          <p className="bg-red-100 text-red-600 p-3 rounded-xl text-center text-sm font-bold mb-6">
            {errors.firebase}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 ml-2 uppercase tracking-widest">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value,
                    })
                  }
                  placeholder="Full Name"
                  className="w-full bg-base-200 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary font-medium text-black"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 ml-2 uppercase tracking-widest">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  placeholder="Email Address"
                  className={`w-full bg-base-200 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 font-medium text-black ${
                    errors.email
                      ? "ring-2 ring-red-400"
                      : "focus:ring-primary"
                  }`}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] font-bold ml-2 italic">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 ml-2 uppercase tracking-widest">
                NID Number
              </label>
              <div className="relative">
                <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.nid}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nid: e.target.value,
                    })
                  }
                  placeholder="NID Number"
                  className={`w-full bg-base-200 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 font-medium text-black ${
                    errors.nid
                      ? "ring-2 ring-red-400"
                      : "focus:ring-primary"
                  }`}
                  required
                />
              </div>
              {errors.nid && (
                <p className="text-red-500 text-[10px] font-bold ml-2 italic">
                  {errors.nid}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 ml-2 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  className={`w-full bg-base-200 border-none rounded-2xl py-4 pl-12 pr-12 focus:ring-2 font-medium text-black ${
                    errors.password
                      ? "ring-2 ring-red-400"
                      : "focus:ring-primary"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[10px] font-bold ml-2 italic">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div className="max-w-md mx-auto pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 h-auto rounded-2xl text-lg font-black uppercase tracking-widest text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-lg"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-gray-500 font-bold text-sm mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
