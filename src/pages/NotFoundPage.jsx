import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 */}
        <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/user"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Home size={18} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;