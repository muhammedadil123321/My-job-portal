import React, { useEffect } from "react";
import { Target, Eye, Award, ArrowRight, Users, Briefcase, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const aboutcontent = [
    {
      title: "Our Mission",
      paragraph:
        "To bridge the gap between local job seekers and employers by providing a simple, fast, and reliable platform for daily wage and part-time employment opportunities.",
      icon: <Target className="w-10 h-10 text-white" />,
      gradient: "from-blue-600 to-blue-900",
    },
    {
      title: "Our Vision",
      paragraph:
        "To become India's leading job portal for local and flexible work, empowering workers to earn with dignity and employers to find trusted talent instantly.",
      icon: <Eye className="w-10 h-10 text-white" />,
      gradient: "from-blue-600 to-blue-900",
    },
    {
      title: "Our Values",
      paragraph:
        "Trust, Transparency, Speed, and Accessibility. We believe in supporting real people with real opportunities and creating meaningful employment connections.",
      icon: <Award className="w-10 h-10 text-white" />,
      gradient: "from-blue-600 to-blue-900",
    },
  ];

  const features = [
    "Quick job matching",
    "Location-based search",
    "Verified profiles",
    "Flexible work options",
    "Easy application process",
    "Real-time notifications",
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 py-6">
        {/* Clean professional dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50"></div>

        <div className="absolute inset-0 overflow-hidden">
  {/* Ivory White - Top Left */}
  <div
    className="absolute top-12 left-12 w-80 h-80 rounded-full opacity-18"
    style={{
      background: "radial-gradient(circle, #fffaf0 0%, transparent 70%)",
      filter: "blur(42px)",
      animation: "rotate 22s linear infinite",
    }}
  />

  {/* Soft Champagne - Top Center */}
  <div
    className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-16"
    style={{
      background: "radial-gradient(circle, #fef3c7 0%, transparent 70%)",
      filter: "blur(55px)",
      animation: "rotate 26s linear infinite",
    }}
  />

  {/* Light Peach - Top Right */}
  <div
    className="absolute top-24 right-12 w-[420px] h-[420px] rounded-full opacity-15"
    style={{
      background: "radial-gradient(circle, #ffe4e6 0%, transparent 70%)",
      filter: "blur(58px)",
      animation: "rotate 24s linear infinite reverse",
    }}
  />

  {/* Warm Pearl - Bottom Left */}
  <div
    className="absolute -bottom-12 left-24 w-[380px] h-[380px] rounded-full opacity-17"
    style={{
      background: "radial-gradient(circle, #fafafa 0%, transparent 70%)",
      filter: "blur(48px)",
      animation: "rotate 28s linear infinite",
    }}
  />

  {/* Soft Mint - Bottom Center */}
  <div
    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-14"
    style={{
      background: "radial-gradient(circle, #ecfdf5 0%, transparent 70%)",
      filter: "blur(52px)",
      animation: "rotate 30s linear infinite reverse",
    }}
  />

  {/* Lavender White - Bottom Right */}
  <div
    className="absolute -bottom-24 right-1/4 w-[360px] h-[360px] rounded-full opacity-15"
    style={{
      background: "radial-gradient(circle, #f5f3ff 0%, transparent 70%)",
      filter: "blur(50px)",
      animation: "rotate 27s linear infinite",
    }}
  />
</div>

        <style>{`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-gray-950 mb-4 leading-tight drop-shadow-lg">
              About Earnease
            </h1>
            <p className="text-base md:text-xl text-gray-900 leading-relaxed  drop-shadow-md">
              Connecting talented workers with opportunities that matter
            </p>
           
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8  border-t-4 border-blue-950 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-linear-to-br from-blue-600 to-blue-900 group-hover:scale-110 transition-transform duration-300 ease-out">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-outfit font-bold text-gray-900">
                For Workers
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm md:text-[17px] mb-5">
              Earnease helps local workers find quick part-time, daily, and short-term jobs based on their skills, availability, and location. Workers can easily explore nearby opportunities and start earning without long registration or waiting periods.
            </p>
            <ul className="space-y-2">
              {features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700 text-[17px]">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border-t-4 border-blue-950 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-linear-to-br from-blue-600 to-blue-900 group-hover:scale-110 transition-transform duration-300 ease-out">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-outfit font-bold text-gray-900">
                For Employers
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm md:text-[17px] mb-5">
              Employers can post jobs instantly and hire workers when needed, whether it's for shops, cafés, delivery, household tasks, events, or seasonal work. Our platform makes hiring faster, simpler, and more reliable for every business or individual.
            </p>
            <ul className="space-y-2">
              {features.slice(3, 6).map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700 text-[17px]">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mission, Vision, Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-outfit font-bold text-gray-900 mb-3">
              Our Foundation
            </h2>
            <div className="w-16 h-0.5 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {aboutcontent.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white group rounded-lg shadow-md p-6 md:p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div className="flex justify-center mb-5">
                    <div className={`p-4 rounded-full bg-linear-to-br group-hover:scale-110 transition-transform duration-300 ease-out ${item.gradient}`}>
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-outfit font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {item.paragraph}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12 border border-gray-200">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-outfit font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 text-base mb-8 max-w-2xl mx-auto">
                Whether you're looking for work or need to hire, Earnease makes it simple and efficient.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate("/findjob")}
                  className="group bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                  Browse Jobs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate("/employer/post-job")}
                  className="group bg-white text-gray-900 font-medium px-8 py-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                  Post a Job
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
