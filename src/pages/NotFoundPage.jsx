import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg-secondary))] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 */}
        <h1 className="text-8xl font-bold text-[rgb(var(--color-text-primary))] mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[rgb(var(--color-text-primary))] mb-2">Page Not Found</h2>

        {/* Description */}
        <p className="text-[rgb(var(--color-text-secondary))] mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/user"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-accent-hover))] text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            <Home size={18} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[rgb(var(--color-bg-tertiary))] hover:bg-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] font-semibold rounded-lg transition-all"
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