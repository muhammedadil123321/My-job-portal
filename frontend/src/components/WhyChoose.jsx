import React from "react";
import { MapPin, FileText, Clock ,Zap} from "lucide-react";

export default function WhyChoose() {
  const features = [
    {
      icon: <MapPin className="w-10 h-10 text-white" />,
      title: "Local Job Matching",
      desc: "Find jobs in your community with our advanced location-based search.",
      gradient:"from-blue-600 to-blue-900"
    },
    {
      icon: <FileText className="w-10 h-10 text-white" />,
      title: "Easy Application",
      desc: "Apply to jobs in just a few clicks with your streamlined profile.",
      gradient:"from-green-600 to-green-900"
    },
    {
      icon: <Clock className="w-10 h-10 text-white" />,
      title: "Flexible Work",
      desc: "Discover part-time and flexible opportunities that fit your schedule.",
      gradient:"from-teal-600 to-teal-900"
    },
      {
      icon: <Zap className="w-10 h-10 text-white" />,
      title: "Fast Hiring Process",
      desc: " Employers respond quickly so you get hired faster than traditional platforms.",
      gradient:"from-gray-600 to-gray-900",
    }
  ];

  return (
    <section className="py-16 bg-linear-to-tr from-white to-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 data-aos="zoom-in" className="font-outfit text-3xl md:text-4xl font-bold text-center mb-4">Why Choose Us?</h2>
        <p data-aos="zoom-in" className="font-poppins text-md sm:text-lg text-gray-800  mb-12 max-w-2xl mx-auto text-center">
          Our platform is designed to make your job search simple, fast, and effective.
          Discover opportunities right in your neighborhood.
        </p>

        <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, index) => (
            <div 
              key={index}
              className="bg-white group  border border-gray-100 rounded-2xl shadow-md p-8 text-center  hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full bg-linear-to-br group-hover:scale-110  transition-transform duration-300 ease-out ${item.gradient}`}>{item.icon}</div>
              </div>

              <h3 className="font-outfit text-lg font-semibold mb-2">{item.title}</h3>
              <p className="font-poppins text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
