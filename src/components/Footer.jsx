import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[rgb(var(--color-card-bg))] border-t border-[rgb(var(--color-border))] py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-xl font-bold text-[rgb(var(--color-text-primary))] mb-2">IncidentHub</h3>
        <p className="text-[rgb(var(--color-text-secondary))] text-sm mb-4">
          Empowering communities through incident awareness and reporting.
        </p>
        <div className="text-xs text-[rgb(var(--color-text-tertiary))]">
          © {new Date().getFullYear()} IncidentHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
