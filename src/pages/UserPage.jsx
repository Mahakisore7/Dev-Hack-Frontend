// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import HeroPart from '../components/HeroPart';
// import Blogs from '../components/Blogs';
// import Footer from '../components/Footer';
// import { getIncidents } from '../data/incidents';

// const UserPage = () => {
//   const [incidents, setIncidents] = useState([]);

//   const refreshIncidents = () => {
//     setIncidents(getIncidents());
//   };

//   useEffect(() => {
//     refreshIncidents();
//   }, []);

//   const handleNavigate = (section) => {
//     const el = document.getElementById(section);
//     if (el) {
//       el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   console.log('UserPage rendering'); // Debug log

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">
//       <Navbar onNavigate={handleNavigate} />
//       <main className="pt-16">
//         <Blogs incidents={incidents} onRefresh={refreshIncidents} />
//         <HeroPart onIncidentAdded={refreshIncidents} />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default UserPage;


import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroPart from '../components/HeroPart';
import Blogs from '../components/Blogs';
import Footer from '../components/Footer';
import { getIncidents } from '../data/incidents';

const UserPage = () => {
  const [incidents, setIncidents] = useState([]);

  const refreshIncidents = () => {
    setIncidents(getIncidents());
  };

  useEffect(() => {
    refreshIncidents();
  }, []);

  const handleNavigate = (section) => {
    // Section navigation is kept for blogs, but report now goes to dedicated route
    if (section === 'report') {
      return window.location.assign('/user/report');
    }
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  console.log('UserPage rendering'); // Debug log

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar onNavigate={handleNavigate} />
      <main className="pt-16">
        <Blogs incidents={incidents} onRefresh={refreshIncidents} />
      </main>
      <Footer />
    </div>
  );
};

export default UserPage;