import React, { useState, useEffect, useRef } from "react";
import { Briefcase, Users, Building2, Search } from "lucide-react";
import bgimage from "../assets/images/bgimage1.jpg";

const JOBSOVERALL = [
  { icon: Briefcase, count: 25678, title: "Jobs" },
  { icon: Users, count: 25678, title: "Workers" },
  { icon: Building2, count: 25678, title: "Employers" },
];

// Counter animation component
const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(target * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, target, duration]);

  return (
    <p ref={countRef} className="text-xl text-white font-bold">
      {count.toLocaleString()}
    </p>
  );
};

const MainHero = () => {
  return (
    <div 
      className="relative py-16 px-4 sm:px-6 lg:px-8 "
      style={{ backgroundImage: `url(${bgimage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Backdrop Layer */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto py-16">

        {/* Text & Heading with fade-in animation */}
        <div className="flex flex-col justify-center items-center text-center animate-fadeIn">
          <h1 className="lg:w-4xl font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight animate-slideDown">
            Your Local Platform for Quick Hiring & Flexible Work
          </h1>
          <p className="font-poppins text-md sm:text-lg text-slate-200 mb-8 max-w-2xl animate-slideUp">
            Workers discover nearby part-time and daily wage jobs, while employers
            post tasks and hire trusted people with ease.
          </p>
        </div>

         
        <div className="flex flex-col sm:flex-row gap-4 justify-center pb-8">
          {/* Find Jobs - Transparent with blur and border */}
          <button className="bg-transparent text-white font-semibold px-8 py-3 rounded-sm transition-all duration-600 border-2 border-white/70 hover:border-white/80 shadow-lg hover:shadow-white/20 hover:scale-105 cursor-pointer ">
            <span>Find Jobs</span>
          </button>

          {/* Post a Job - White gradient style */}
          <button className="bg-gradient-to-r from-white to-gray-300 text-gray-900 font-semibold px-8 py-3 rounded-sm transition-all duration-600 shadow-lg hover:shadow-xl border-2 border-gray-300 hover:scale-105 cursor-pointer">
            <span>Post a Job</span>
          </button>
        </div>

        {/* Stats with staggered animation */}
        <div className="hidden md:flex max-w-xl mx-auto w-full flex-wrap sm:gap-16 justify-center">
          {JOBSOVERALL.map((item, index) => (
            <div 
              key={index} 
              className="flex justify-center gap-2 mt-12 backdrop:blur-4xl bg-black/20 p-2 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-fadeInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-blue-700 p-3 rounded-full animate-bounce-slow">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <AnimatedCounter target={item.count} duration={2000} />
                <p className="text-md text-gray-300">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.8s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out 0.2s backwards;
        }

        .animate-slideLeft {
          animation: slideLeft 0.6s ease-out 0.4s backwards;
        }

        .animate-slideRight {
          animation: slideRight 0.6s ease-out 0.5s backwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out backwards;
        }

        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MainHero;