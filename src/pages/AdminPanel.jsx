import useAuthStore from '../store/authStore';

const AdminPanel = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Panel
            </h1>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Admin Access
            </span>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 mb-4">
              Welcome, {user?.username}! You have administrator privileges.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-900">
                  User Management
                </h3>
                <p className="text-sm text-indigo-700 mt-2">
                  Manage user accounts and permissions
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900">
                  System Settings
                </h3>
                <p className="text-sm text-green-700 mt-2">
                  Configure system-wide settings
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900">
                  Analytics
                </h3>
                <p className="text-sm text-purple-700 mt-2">
                  View platform analytics and reports
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
