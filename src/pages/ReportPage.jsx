import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import HeroPart from '../components/HeroPart';
import Footer from '../components/Footer';

const ReportBackNavbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
          <Link
            to="/user"
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-900 font-medium hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
        </div>
        <div className="text-sm font-semibold text-gray-900">IncidentHub</div>
      </div>
    </div>
  </nav>
);

const ReportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <ReportBackNavbar />
      <main className="pt-16">
        <HeroPart onIncidentAdded={() => {}} />
      </main>
      <Footer />
    </div>
  );
};

export default ReportPage;