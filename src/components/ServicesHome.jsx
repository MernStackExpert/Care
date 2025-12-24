"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaBaby, FaUserShield, FaHandHoldingMedical } from "react-icons/fa";

const ServicesHome = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading services...</p>;
  if (!services.length) return <p className="text-center py-10">No services available.</p>;

  const getIcon = (category) => {
    switch (category) {
      case "baby": return <FaBaby />;
      case "elderly": return <FaUserShield />;
      case "sick": return <FaHandHoldingMedical />;
      default: return <FaArrowRight />;
    }
  };

  return (
    <section className="py-10 bg-base-200/40">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Services Overview</h2>
          <p className="text-gray-500 font-medium">
            We provide specialized caregiving solutions tailored to meet the unique needs of every family member.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service._id} className="group relative bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 border transition-transform duration-500 group-hover:rotate-6">
                {getIcon(service.category)}
              </div>

              <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
              <p className="font-bold mb-6">Price: {service.price} ৳</p>

              <Link href={`/services/${service._id}`} className="inline-flex items-center gap-2 font-bold text-sm py-3 px-6 rounded-xl border border-gray-100 transition-all duration-300 hover:bg-blue-600 hover:text-white">
                Book Service <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesHome;
