"use client";
import Link from "next/link";
import { FaBaby, FaUserShield, FaHandHoldingMedical, FaArrowRight } from "react-icons/fa";

const ServicesHome = () => {
  const services = [
    {
      id: "baby-care",
      title: "Baby Care",
      desc: "Trusted and loving babysitters who ensure your child's safety, nutrition, and happiness while you are away.",
      icon: <FaBaby />,
      color: "text-primary bg-primary/10 border-primary/20",
      btnStyle: "hover:bg-primary hover:text-white"
    },
    {
      id: "elderly-care",
      title: "Elderly Service",
      desc: "Compassionate care for seniors, focusing on their health monitoring, companionship, and daily assistance.",
      icon: <FaUserShield />,
      color: "text-secondary bg-secondary/10 border-secondary/20",
      btnStyle: "hover:bg-secondary hover:text-white"
    },
    {
      id: "sick-care",
      title: "Sick People Service",
      desc: "Professional home nursing and support for individuals recovering from illness or requiring medical attention.",
      icon: <FaHandHoldingMedical />,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      btnStyle: "hover:bg-indigo-600 hover:text-white"
    },
  ];

  return (
    <section className="py-10 bg-base-200/40">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block px-4 py-1 rounded-full bg-white shadow-sm border border-gray-100 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Our Expertise</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Services <span className="heading-gradient">Overview</span>
          </h2>
          <p className="text-gray-500 font-medium">
            We provide specialized caregiving solutions tailored to meet the unique needs of every family member.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-[0.03] transition-transform duration-700 group-hover:scale-150 ${service.color.split(' ')[1]}`}></div>

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 border transition-transform duration-500 group-hover:rotate-6 ${service.color}`}>
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {service.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {service.desc}
              </p>

              <Link 
                href={`/services/${service.id}`}
                className={`inline-flex items-center gap-2 font-bold text-sm py-3 px-6 rounded-xl border border-gray-100 transition-all duration-300 ${service.btnStyle}`}
              >
                View Details 
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
        </div>
    </section>
  );
};

export default ServicesHome;