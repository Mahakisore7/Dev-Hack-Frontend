import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Home = () => {
  const { isAuthenticated, role, user } = useAuthStore();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-[rgb(var(--color-bg-secondary))] flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-[rgb(var(--color-text-primary))] mb-6">Welcome back, {user?.username}!</h1>
          <div className="space-y-4">
            <div>
              <Link
                to={role === 'admin' ? '/admin' : '/user'}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-accent-hover))] shadow-lg hover:shadow-xl transition-all"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg-secondary))] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-[rgb(var(--color-text-primary))] mb-6">Emergency Response System</h1>
        <p className="text-xl text-[rgb(var(--color-text-secondary))] mb-8">Report and track emergency incidents in your community</p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            to="/auth/login"
            className="w-full sm:w-auto flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-accent-hover))] md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all"
          >
            Sign In
          </Link>
          <Link
            to="/auth/signup"
            className="w-full sm:w-auto flex justify-center items-center px-8 py-3 border border-[rgb(var(--color-accent))] text-base font-medium rounded-lg text-[rgb(var(--color-accent))] bg-transparent hover:bg-[rgb(var(--color-bg-tertiary))] md:py-4 md:text-lg md:px-10 transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;