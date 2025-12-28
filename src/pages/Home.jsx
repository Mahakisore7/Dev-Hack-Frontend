import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Home = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to
            <span className="block text-indigo-600">Dev Hack Platform</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            A secure, scalable platform built with React, featuring robust authentication 
            and role-based access control. Ready for your next big idea.
          </p>
          
          {!isAuthenticated && (
            <div className="mt-10 flex justify-center space-x-4">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <div className="mt-10">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section - Ready for expansion */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Built for Scale
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to build your next application
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Secure Authentication</h3>
              <p className="mt-2 text-gray-600">
                HttpOnly cookies, role-based access, and social login integration.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">High Performance</h3>
              <p className="mt-2 text-gray-600">
                Built with Vite, optimized for speed and developer experience.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Scalable Structure</h3>
              <p className="mt-2 text-gray-600">
                Organized codebase ready for feature expansion and team collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
