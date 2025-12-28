import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import HeroPart from '../components/HeroPart';
import Footer from '../components/Footer';

const ReportBackNavbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgb(var(--color-card-bg))]/95 backdrop-blur-sm border-b border-[rgb(var(--color-border))] shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
          <Link
            to="/user"
            className="inline-flex items-center gap-2 px-4 py-2 text-[rgb(var(--color-text-primary))] font-medium hover:text-[rgb(var(--color-accent))] transition-colors rounded-lg hover:bg-[rgb(var(--color-bg-tertiary))]"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
        </div>
        <div className="text-sm font-semibold text-[rgb(var(--color-text-primary))]">IncidentHub</div>
      </div>
    </div>
  </nav>
);

const ReportPage = () => {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg-secondary))]">
      <ReportBackNavbar />
      <main className="pt-16">
        <HeroPart onIncidentAdded={() => {}} />
      </main>
      <Footer />
    </div>
  );
};

export default ReportPage;