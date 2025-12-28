import useAuthStore from '../store/authStore';

const AdminDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg-secondary))] p-6">
      <h1 className="text-3xl font-bold text-[rgb(var(--color-text-primary))] mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-[rgb(var(--color-card-bg))] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-[rgb(var(--color-border))]">
          <h3 className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
        </div>
        
        <div className="bg-[rgb(var(--color-card-bg))] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-[rgb(var(--color-border))]">
          <h3 className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">Active Sessions</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">567</p>
        </div>
        
        <div className="bg-[rgb(var(--color-card-bg))] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-[rgb(var(--color-border))]">
          <h3 className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">New Registrations</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">89</p>
        </div>
        
        <div className="bg-[rgb(var(--color-card-bg))] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-[rgb(var(--color-border))]">
          <h3 className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">System Health</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">98%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Management */}
        <div className="bg-[rgb(var(--color-card-bg))] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-[rgb(var(--color-border))]">
          <h2 className="text-lg font-semibold mb-4 text-[rgb(var(--color-text-primary))]">User Management</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all">
              View All Users
            </button>
            <button className="w-full text-left px-3 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-all">
              Pending Approvals
            </button>
            <button className="w-full text-left px-3 py-2 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition-all">
              Banned Users
            </button>
            <button className="w-full text-left px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-all">
              User Reports
            </button>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-[rgb(var(--color-card-bg))] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-[rgb(var(--color-border))]">
          <h2 className="text-lg font-semibold mb-4 text-[rgb(var(--color-text-primary))]">System Settings</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
              General Settings
            </button>
            <button className="w-full text-left px-3 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all">
              Security Settings
            </button>
            <button className="w-full text-left px-3 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all">
              Email Templates
            </button>
            <button className="w-full text-left px-3 py-2 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-all">
              System Logs
            </button>
          </div>
        </div>
      </div>

      {/* Admin Info */}
      <div className="mt-8 bg-[rgb(var(--color-card-bg))] p-6 rounded-xl shadow-lg border border-[rgb(var(--color-border))]">
        <h2 className="text-lg font-semibold mb-4 text-[rgb(var(--color-text-primary))]">Admin Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">Admin Email</p>
            <p className="font-medium text-[rgb(var(--color-text-primary))]">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">Admin Username</p>
            <p className="font-medium text-[rgb(var(--color-text-primary))]">{user?.username || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">Access Level</p>
            <p className="font-medium capitalize text-[rgb(var(--color-text-primary))]">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;