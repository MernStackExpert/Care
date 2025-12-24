"use client";
import { FaQuoteLeft, FaStar, FaHeart, FaUsers, FaShieldAlt } from "react-icons/fa";

const Testimonials = () => {
  const stats = [
    { id: 1, label: "Happy Families", value: "2,500+", icon: <FaHeart />, color: "text-primary bg-primary/10" },
    { id: 2, label: "Verified Staff", value: "850+", icon: <FaUsers />, color: "text-secondary bg-secondary/10" },
    { id: 3, label: "Secure Service", value: "99.9%", icon: <FaShieldAlt />, color: "text-indigo-600 bg-indigo-50" },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Working Mother",
      comment: "Finding a reliable babysitter was so stressful until I found Care.xyz. The process was seamless and the caregiver was amazing!",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "David Miller",
      role: "Entrepreneur",
      comment: "The elderly care service provided for my father was exceptional. Very professional and compassionate staff.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];

  return (
    <section className="pb-10 bg-base-100">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-base-200 shadow-sm border border-gray-100 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Reviews & Stats</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Success <span className="heading-gradient">Metrics</span>
          </h2>
          <p className="text-gray-500 font-medium">
            Building trust through transparency and compassion. Here is why families choose us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {stats.map((stat) => (
            <div key={stat.id} className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 ${stat.color}`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-gray-800">{stat.value}</h3>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <div className="flex justify-center gap-1 text-yellow-400 mb-4 text-xl">
             {[...Array(5)].map((_, i) => <FaStar key={i} />)}
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-gray-800">What Our <span className="text-primary">Happy Clients</span> Say</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-base-200/50 p-8 md:p-10 rounded-[3rem] relative border border-white shadow-sm hover:bg-white hover:shadow-xl transition-all duration-500 group">
              <FaQuoteLeft className="absolute top-8 right-8 text-5xl text-gray-200 group-hover:text-primary/10 transition-colors" />
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8 relative z-10 italic">
                {review.comment}
              </p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md relative z-10"
                  />
                  <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full -z-10 animate-pulse"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{review.name}</h4>
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;