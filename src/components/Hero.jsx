"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaPlus } from "react-icons/fa";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className=" bg-base-100 flex items-center overflow-hidden py-10 lg:py-4">
      <div className=" container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Premium Home Care Service
            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              Every Life Deserves <br />
              <span className="heading-gradient uppercase ">
                Extraordinary
              </span>{" "}
              <br />
              Care.
            </h1>

            <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              We provide professional babysitting and compassionate elderly
              care, ensuring your family stays happy and healthy at home.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 mb-12">
              <Link
                href="/services"
                className="btn btn-gradient rounded-2xl px-10 py-4 h-auto text-lg flex items-center gap-3 group shadow-lg shadow-primary/20"
              >
                Get Started Now
                <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <Link
                href="/about"
                className="btn btn-ghost hover:bg-base-200 rounded-2xl px-10 py-4 h-auto text-lg font-bold border border-gray-200"
              >
                Watch How It Works
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative group">
              <div
                className="absolute -inset-1 bg-gradient-to-tr from-primary via-secondary to-accent rounded-full blur-sm opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"
                style={{ clipPath: "url(#heartMask)" }}
              ></div>

              <div
                className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] bg-white p-1.5"
                style={{ clipPath: "url(#heartMask)" }}
              >
                <svg width="0" height="0" className="absolute">
                  <defs>
                    <clipPath id="heartMask" clipPathUnits="objectBoundingBox">
                      <path d="M0.5,0.88 L0.435,0.821 C0.173,0.584 0,0.428 0,0.237 C0,0.081 0.123,0 0.28,0 C0.368,0 0.453,0.041 0.5,0.106 C0.547,0.041 0.632,0 0.72,0 C0.877,0 1,0.081 1,0.237 C1,0.428 0.827,0.584 0.565,0.822 L0.5,0.88 Z" />
                    </clipPath>
                  </defs>
                </svg>

                <div
                  className="w-full h-full overflow-hidden"
                  style={{ clipPath: "url(#heartMask)" }}
                >
                  <img
                    src="/HeroImage.jpg"
                    alt="Care"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 rounded-full"></div>

              <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-white/50 z-20 transform -rotate-6">
                <p className="text-lg font-black text-secondary leading-none text-center">
                  2025
                </p>
                <p className="text-[8px] uppercase font-bold text-gray-500 mt-1">
                  Trusted Serving
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 5s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
