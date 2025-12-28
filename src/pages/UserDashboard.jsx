import useAuthStore from '../store/authStore';

const UserDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg-secondary))] p-6">
      <h1 className="text-3xl font-bold text-[rgb(var(--color-text-primary))] mb-6">User Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-[rgb(var(--color-card-bg))] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-[rgb(var(--color-border))]">
          <h2 className="text-lg font-semibold mb-4 text-[rgb(var(--color-text-primary))]">Profile</h2>
          <div className="space-y-2">
            <p className="text-[rgb(var(--color-text-secondary))]"><strong className="text-[rgb(var(--color-text-primary))]">Email:</strong> {user?.email}</p>
            <p className="text-[rgb(var(--color-text-secondary))]"><strong className="text-[rgb(var(--color-text-primary))]">Username:</strong> {user?.username || 'Not set'}</p>
            <p className="text-[rgb(var(--color-text-secondary))]"><strong className="text-[rgb(var(--color-text-primary))]">Role:</strong> {user?.role}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[rgb(var(--color-card-bg))] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-[rgb(var(--color-border))]">
          <h2 className="text-lg font-semibold mb-4 text-[rgb(var(--color-text-primary))]">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all">
              Update Profile
            </button>
            <button className="w-full text-left px-3 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-all">
              Change Password
            </button>
            <button className="w-full text-left px-3 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all">
              Account Settings
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[rgb(var(--color-card-bg))] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-[rgb(var(--color-border))]">
          <h2 className="text-lg font-semibold mb-4 text-[rgb(var(--color-text-primary))]">Recent Activity</h2>
          <div className="space-y-3">
            <div className="text-sm text-[rgb(var(--color-text-secondary))]">
              <p>No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;