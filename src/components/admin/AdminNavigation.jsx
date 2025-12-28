// import React from 'react';
// import { Clock, CheckCircle, XCircle, CheckCheck } from 'lucide-react';

// const AdminNavigation = ({ activeTab, onTabChange }) => {
//   const tabs = [
//     { id: 'unverified', label: 'Unverified', icon: Clock, color: 'text-status-unverified' },
//     { id: 'verified', label: 'Verified', icon: CheckCircle, color: 'text-status-verified' },
//     { id: 'resolved', label: 'Resolved', icon: CheckCheck, color: 'text-status-resolved' },
//     { id: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-status-rejected' }
//   ];

//   return (
//     <div className="bg-card border-b border-border sticky top-16 z-40">
//       <div className="container mx-auto px-4">
//         {/* Desktop Navigation - Single Row */}
//         <nav className="hidden lg:flex items-center justify-center gap-2 py-3">
//           {tabs.map(({ id, label, icon: Icon, color }) => (
//             <button
//               key={id}
//               onClick={() => onTabChange(id)}
//               className={`nav-tab flex items-center gap-2 px-6 py-2.5 ${
//                 activeTab === id 
//                   ? 'nav-tab-active' 
//                   : 'text-muted-foreground hover:bg-muted'
//               }`}
//             >
//               <Icon size={18} className={activeTab === id ? '' : color} />
//               <span>{label}</span>
//             </button>
//           ))}
//         </nav>

//         {/* Mobile Navigation - Horizontal Scroll */}
//         <nav className="lg:hidden flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
//           {tabs.map(({ id, label, icon: Icon, color }) => (
//             <button
//               key={id}
//               onClick={() => onTabChange(id)}
//               className={`nav-tab flex items-center gap-2 px-4 py-2 whitespace-nowrap flex-shrink-0 ${
//                 activeTab === id 
//                   ? 'nav-tab-active' 
//                   : 'text-muted-foreground hover:bg-muted'
//               }`}
//             >
//               <Icon size={16} className={activeTab === id ? '' : color} />
//               <span className="text-sm">{label}</span>
//             </button>
//           ))}
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default AdminNavigation;


import React from 'react';
import { Clock, CheckCircle, XCircle, CheckCheck } from 'lucide-react';

const AdminNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'unverified', label: 'Unverified', icon: Clock },
    { id: 'verified', label: 'Verified', icon: CheckCircle },
    { id: 'resolved', label: 'Resolved', icon: CheckCheck },
    { id: 'rejected', label: 'Rejected', icon: XCircle }
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6">
        {/* Desktop Navigation - Single Row */}
        <nav className="hidden md:flex items-center justify-center gap-8 py-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center gap-2 text-base font-medium transition-colors duration-200 ${
                activeTab === id 
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} strokeWidth={2} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Navigation - 2x2 Grid */}
        <nav className="md:hidden grid grid-cols-2 gap-4 py-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center justify-center gap-2 text-sm font-medium py-3 px-4 rounded-lg transition-colors duration-200 ${
                activeTab === id 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminNavigation;