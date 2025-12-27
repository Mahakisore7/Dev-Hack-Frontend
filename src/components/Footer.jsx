import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">IncidentHub</h3>
        <p className="text-gray-500 text-sm mb-4">
          Empowering communities through incident awareness and reporting.
        </p>
        <div className="text-xs text-gray-500">
          © {new Date().getFullYear()} IncidentHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
