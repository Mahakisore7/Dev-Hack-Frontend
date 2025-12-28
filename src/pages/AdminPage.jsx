import React, { useState } from 'react';
import AdminNavbar from '../components/admin/AdminNavbar';
import UnverifiedIncidents from '../components/admin/UnverifiedIncidents';
import VerifiedIncidents from '../components/admin/VerifiedIncidents';
import ResolvedIncidents from '../components/admin/ResolvedIncidents';
import RejectedIncidents from '../components/admin/RejectedIncidents';
import Footer from '../components/Footer';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('unverified');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleStatusChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'unverified':
        return <UnverifiedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      case 'verified':
        return <VerifiedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      case 'resolved':
        return <ResolvedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      case 'rejected':
        return <RejectedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      default:
        return <UnverifiedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
