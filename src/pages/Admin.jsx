import React, { useState } from 'react';
import AdminNavbar from '../components/admin/AdminNavbar.jsx';
import AdminNavigation from '../components/admin/AdminNavigation';
import UnverifiedIncidents from '../components/admin/UnverifiedIncidents';
import VerifiedIncidents from '../components/admin/VerifiedIncidents';
import ResolvedIncidents from '../components/admin/ResolvedIncidents';
import RejectedIncidents from '../components/admin/RejectedIncidents';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('unverified');

  const renderContent = () => {
    switch (activeTab) {
      case 'unverified':
        return <UnverifiedIncidents />;
      case 'verified':
        return <VerifiedIncidents />;
      case 'resolved':
        return <ResolvedIncidents />;
      case 'rejected':
        return <RejectedIncidents />;
      default:
        return <UnverifiedIncidents />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <AdminNavbar /> */}
      <AdminNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pb-12">
        {renderContent()}
      </main>
    </div>
  );
};

export default Admin;
