import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 pointer-events-none"></div>
      
      <div className="relative max-w-md w-full text-center">
        {/* Error Code - Clean and Minimal */}
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-gray-900 mb-2 tracking-tight">
            404
          </h1>
          <div className="h-1 w-12 bg-gray-400 mx-auto rounded-full"></div>
        </div>

        {/* Main Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-base mb-10 leading-relaxed">
          Sorry, the page you're looking for doesn't exist. It may have been moved or deleted.
        </p>

        {/* Action Button - Professional Slate Color */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors duration-200 shadow-sm hover:shadow-md active:bg-slate-900"
        >
          <Home size={18} />
          Go to Home
        </button>

        {/* Back Link - Secondary Action */}
        <div className="mt-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>

        {/* Status Message */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Error Code: <span className="text-gray-700 font-mono">404</span>
          </p>
        </div>
      </div>
    </div>
  );
}