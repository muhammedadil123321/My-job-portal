import React, { useState } from "react";
import { Search } from "lucide-react";

const HeroMain = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="flex flex-col items-center bg-slate-900 pb-16 md:pb-24 relative overflow-hidden">
      {/* Clean professional dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950"></div>

      {/* 3D Floating Cards Background - Professional Job Cards */}
      <div className="hidden sm:block absolute inset-0 overflow-hidden perspective">
        {/* 3D Card 1 - Top Left - Job Card Style */}
        <div 
          className="absolute top-20 left-10 w-64 h-48 rounded-xl shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(30, 41, 59, 0.3) 100%)',
            transform: 'perspective(1200px) rotateX(12deg) rotateY(-20deg) translateZ(50px)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            animation: 'float3d 6s ease-in-out infinite',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="p-4 h-full flex flex-col justify-between opacity-60">
            <div>
              <div className="w-10 h-10 bg-blue-500/30 rounded-lg mb-2"></div>
              <div className="h-3 bg-slate-600/50 rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-slate-600/30 rounded w-1/2"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-blue-500/20 rounded w-16"></div>
              <div className="h-6 bg-green-500/20 rounded w-16"></div>
            </div>
          </div>
        </div>

        {/* 3D Card 2 - Top Right - Job Card Style */}
        <div 
          className="absolute top-40 right-10 w-72 h-56 rounded-xl shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(30, 41, 59, 0.3) 100%)',
            transform: 'perspective(1200px) rotateX(-18deg) rotateY(25deg) translateZ(40px)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            animation: 'float3d 7s ease-in-out infinite reverse',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="p-5 h-full flex flex-col justify-between opacity-60">
            <div>
              <div className="w-12 h-12 bg-blue-500/30 rounded-lg mb-3"></div>
              <div className="h-3 bg-slate-600/50 rounded w-4/5 mb-2"></div>
              <div className="h-2 bg-slate-600/30 rounded w-2/3 mb-2"></div>
              <div className="h-2 bg-slate-600/30 rounded w-1/2"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-blue-500/20 rounded w-20"></div>
              <div className="h-6 bg-green-500/20 rounded w-20"></div>
            </div>
          </div>
        </div>

        {/* 3D Card 3 - Bottom Left - Job Card Style */}
        <div 
          className="absolute bottom-20 left-1/4 w-60 h-52 rounded-xl shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.4) 0%, rgba(31, 41, 55, 0.3) 100%)',
            transform: 'perspective(1200px) rotateX(15deg) rotateY(-15deg) translateZ(30px)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(156, 163, 175, 0.2)',
            animation: 'float3d 8s ease-in-out infinite',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="p-4 h-full flex flex-col justify-between opacity-60">
            <div>
              <div className="w-11 h-11 bg-green-500/30 rounded-lg mb-2"></div>
              <div className="h-3 bg-slate-600/50 rounded w-full mb-2"></div>
              <div className="h-2 bg-slate-600/30 rounded w-3/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-slate-600/20 rounded w-full"></div>
              <div className="h-2 bg-slate-600/20 rounded w-4/5"></div>
            </div>
          </div>
        </div>

        {/* 3D Card 4 - Bottom Right - Job Card Style */}
        <div 
          className="absolute bottom-32 right-20 w-56 h-44 rounded-xl shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.4) 0%, rgba(31, 41, 55, 0.3) 100%)',
            transform: 'perspective(1200px) rotateX(-12deg) rotateY(20deg) translateZ(35px)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(156, 163, 175, 0.2)',
            animation: 'float3d 7.5s ease-in-out infinite reverse',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="p-4 h-full flex flex-col justify-between opacity-60">
            <div>
              <div className="w-10 h-10 bg-green-500/30 rounded-lg mb-2"></div>
              <div className="h-3 bg-slate-600/50 rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-slate-600/30 rounded w-1/2"></div>
            </div>
            <div className="h-6 bg-blue-500/20 rounded w-full"></div>
          </div>
        </div>
      </div>

      {/* Six professional dark color combinations rotating */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dark Black - Top Left */}
        <div 
          className="absolute top-10 left-10 w-80 h-80 rounded-full opacity-35"
          style={{
            background: 'radial-gradient(circle, #0a0a0a 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'rotate 20s linear infinite'
          }}
        ></div>

        {/* Dark Navy Blue - Top Center */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #1e3a8a 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'rotate 24s linear infinite'
          }}
        ></div>

        {/* Dark Royal Blue - Top Right */}
        <div 
          className="absolute top-20 right-10 w-[420px] h-[420px] rounded-full opacity-28"
          style={{
            background: 'radial-gradient(circle, #1e40af 0%, transparent 70%)',
            filter: 'blur(65px)',
            animation: 'rotate 22s linear infinite reverse'
          }}
        ></div>

        {/* Dark Charcoal - Bottom Left */}
        <div 
          className="absolute -bottom-10 left-20 w-[380px] h-[380px] rounded-full opacity-32"
          style={{
            background: 'radial-gradient(circle, #1f2937 0%, transparent 70%)',
            filter: 'blur(55px)',
            animation: 'rotate 26s linear infinite'
          }}
        ></div>

        {/* Dark Slate Blue - Bottom Center */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, #334155 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'rotate 28s linear infinite reverse'
          }}
        ></div>

        {/* Dark Indigo - Bottom Right */}
        <div 
          className="absolute -bottom-20 right-1/4 w-[360px] h-[360px] rounded-full opacity-27"
          style={{
            background: 'radial-gradient(circle, #312e81 0%, transparent 70%)',
            filter: 'blur(58px)',
            animation: 'rotate 25s linear infinite'
          }}
        ></div>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float3d {
          0%, 100% { 
            transform: perspective(1200px) rotateX(var(--rotX, 15deg)) rotateY(var(--rotY, -25deg)) translateZ(50px) translateY(0px); 
          }
          50% { 
            transform: perspective(1200px) rotateX(var(--rotX, 15deg)) rotateY(var(--rotY, -25deg)) translateZ(50px) translateY(-20px); 
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out 0.4s backwards;
        }
      `}</style>

      {/* CONTENT */}
      <div className="relative z-10 pt-28 lg:pt-40 w-full flex flex-col items-center">
        <div className="flex flex-col justify-center items-center text-center px-4 animate-fadeIn">
          <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg animate-slideDown">
            Your Local Platform for Quick Hiring & Flexible Work
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-3xl leading-relaxed drop-shadow-md animate-slideUp">
            Workers discover nearby part-time and daily wage jobs, while
            employers post tasks and hire trusted people with ease.
          </p>
        </div>

        {/* Search / Action Area */}
        <div className="w-full flex justify-center px-4 mb-12 animate-fadeInUp">
          <div className="w-full max-w-3xl">
            {/* SEARCH BAR → md and above ONLY */}
             <div className="hidden md:flex items-center rounded-lg overflow-hidden shadow-2xl border border-slate-700 hover:border-slate-800 focus-within:border-slate-300 transition-all duration-300 bg-slate-800 backdrop-blur-sm h-[55px]"
              style={{
                transform: 'perspective(1000px) translateZ(30px)',
                boxShadow: '0 20px 60px rgba(15, 23, 42, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}>
              <Search className="ml-6 text-slate-400" size={20} />

              <input
                type="text"
                placeholder="Search jobs by title, keyword, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-4 text-white bg-slate-800 outline-none text-base placeholder-slate-500"
              />

              <button
                onClick={handleSearch}
                className="bg-blue-700 hover:bg-blue-800 border-2 border-blue-800 text-white px-10 py-4 font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap shadow-lg"
              >
                Search
              </button>
            </div>

            {/* MOBILE ACTION BUTTONS → below md ONLY */}
            <div className="flex flex-col w-full md:hidden gap-4">
              <button className="relative flex-1 bg-blue-900 hover:bg-blue-950 text-white py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 active:scale-95 overflow-hidden group"
                style={{
                  transform: 'perspective(800px) translateZ(20px)',
                  boxShadow: '0 15px 40px rgba(30, 58, 138, 0.4)'
                }}>
                <span className="relative z-10">Find Job</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="relative flex-1 bg-slate-800 border-2 border-slate-700 hover:border-blue-800 text-white py-4 rounded-lg font-semibold transition-all duration-300 active:scale-95 group"
                style={{
                  transform: 'perspective(800px) translateZ(15px)',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.4)'
                }}>
                <span className="relative z-10">Post a Job</span>
                <div className="absolute inset-0 bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMain;