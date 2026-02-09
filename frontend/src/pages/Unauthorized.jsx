import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50 pointer-events-none"></div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

      <div className="relative max-w-lg w-full text-center">
        {/* Error Code - Elegant Typography */}
        <div className="mb-6">
          <h1 className="text-8xl font-light text-slate-900 mb-2 tracking-tighter">
            403
          </h1>
          <div className="h-0.5 w-16 bg-slate-400 mx-auto"></div>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl font-semibold text-slate-800 mb-6 tracking-tight">
          Access Denied
        </h2>

        {/* Description - Professional tone */}
        <p className="text-slate-600 text-lg mb-12 leading-relaxed font-light">
          You do not have permission to access this resource. If you believe this is an error, please contact support.
        </p>

        {/* CTA Button - Subtle and professional */}
        <button
          onClick={() => navigate(-1)}
          className="px-12 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors duration-300 shadow-sm hover:shadow-md"
        >
          Return to Home
        </button>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm font-light">
            Error Code: <span className="text-slate-700 font-medium">403</span>
          </p>
        </div>
      </div>
    </div>
  );
}