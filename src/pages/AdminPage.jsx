import React, { useState } from 'react';
import AdminNavbar from '../components/admin/AdminNavbar';
import UnverifiedIncidents from '../components/admin/UnverifiedIncidents';
import VerifiedIncidents from '../components/admin/VerifiedIncidents';
import ResolvedIncidents from '../components/admin/ResolvedIncidents';
import RejectedIncidents from '../components/admin/RejectedIncidents';
import IncidentsMap from '../components/admin/IncidentsMap';
import Footer from '../components/Footer';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleStatusChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return <IncidentsMap key={refreshKey} />;
      case 'unverified':
        return <UnverifiedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      case 'verified':
        return <VerifiedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      case 'resolved':
        return <ResolvedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      case 'rejected':
        return <RejectedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      default:
        return <IncidentsMap key={refreshKey} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className={activeTab === 'map' ? '' : ''}>
        {renderContent()}
      </main>
      {activeTab !== 'map' && <Footer />}
    </div>
  );
};

export default AdminPage;
