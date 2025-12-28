import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-bg-secondary))] px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
          <ShieldAlert className="h-10 w-10 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-[rgb(var(--color-text-primary))]">
          Access Denied
        </h2>
        <p className="mt-4 text-base text-[rgb(var(--color-text-secondary))]">
          You don't have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-accent-hover))] shadow-lg hover:shadow-xl transition-all"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;