"use client";
import { FaCheckCircle, FaAward } from "react-icons/fa";

const About = () => {
  return (
    <section className="pt-10 bg-base-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block px-4 py-1 rounded-full bg-base-200 shadow-sm border border-gray-100 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Platform Mission</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            About <span className="heading-gradient">Care.xyz</span>
          </h2>
          <p className="text-gray-500 font-medium">
            Dedicated to making professional caregiving easy, secure, and accessible for every family.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="relative group">
                <img 
                  src="/babyImage.jpg" 
                  alt="Child Care" 
                  className="rounded-[2rem] shadow-2xl w-full aspect-[3/4] object-cover border-b-8 border-primary transition-transform duration-500 group-hover:scale-95"
                />
              </div>
              <div className="relative group pt-12">
                <img 
                  src="/elderImage.jpg" 
                  alt="Elderly Care" 
                  className="rounded-[2rem] shadow-2xl w-full aspect-[3/4] object-cover border-b-8 border-secondary transition-transform duration-500 group-hover:scale-95"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-xl">
                    <FaAward />
                  </div>
                  <div>
                    <p className="text-xl font-bold leading-none text-gray-800">10+</p>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Years Exp.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full"></div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-[1.2] text-gray-800">
              We Are on a Mission to <br />
              <span className="heading-gradient uppercase">Redefine Care</span> <br />
              For Your Family.
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              At <span className="font-bold text-gray-800">Care.xyz</span>, we believe everyone deserves specialized attention. Our platform connects you with the heart of caregiving.
            </p>
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 mb-10">
              {["Background Checked", "Certified Specialists", "Instant Booking", "Quality Guaranteed"].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <FaCheckCircle className="text-primary group-hover:text-white text-sm" />
                  </div>
                  <span className="font-bold text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-ghost border-2 border-gray-200 hover:border-primary hover:text-primary rounded-2xl px-8 font-black">
              Discover Our Story
            </button>
          </div>
        </div>
        </div>
    </section>
  );
};

export default About;