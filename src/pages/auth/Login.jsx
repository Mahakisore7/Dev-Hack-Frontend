import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, googleLogin, isLoading, error, clearError } = useAuthStore();
  const [localError, setLocalError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    setLocalError('');
    clearError();

    // Convert identifier to email for API compatibility
    const loginData = {
      email: data.identifier,
      password: data.password
    };

    const result = await login(loginData);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setLocalError(result.error);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setLocalError('');
    clearError();

    const result = await googleLogin(credentialResponse.credential);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setLocalError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-bg-secondary))] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[rgb(var(--color-text-primary))]">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-[rgb(var(--color-text-secondary))]">
            Or{' '}
            <Link
              to="/auth/signup"
              className="font-medium text-[rgb(var(--color-accent))] hover:text-[rgb(var(--color-accent-hover))]"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-[rgb(var(--color-card-bg))] p-8 rounded-2xl shadow-xl" onSubmit={handleSubmit(onSubmit)}>
          {(error || localError) && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
              <p className="text-sm text-red-800 dark:text-red-300">{error || localError}</p>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="identifier" className="sr-only">
                Email
              </label>
              <input
                id="identifier"
                type="email"
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[rgb(var(--color-border))] placeholder-[rgb(var(--color-text-tertiary))] text-[rgb(var(--color-text-primary))] bg-[rgb(var(--color-input-bg))] rounded-t-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-[rgb(var(--color-accent))] focus:z-10 sm:text-sm"
                placeholder="Email"
                {...register('identifier', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.identifier && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[rgb(var(--color-border))] placeholder-[rgb(var(--color-text-tertiary))] text-[rgb(var(--color-text-primary))] bg-[rgb(var(--color-input-bg))] rounded-b-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-[rgb(var(--color-accent))] focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/auth/forgot-password"
                className="font-medium text-[rgb(var(--color-accent))] hover:text-[rgb(var(--color-accent-hover))]"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-accent-hover))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-accent))] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {/* Social Login Section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[rgb(var(--color-border))]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[rgb(var(--color-card-bg))] text-[rgb(var(--color-text-secondary))]">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  // Google sign-in would be implemented here
                  alert('Google sign-in integration needed');
                }}
                className="w-full inline-flex justify-center py-2 px-4 border border-[rgb(var(--color-border))] rounded-lg shadow-sm bg-[rgb(var(--color-card-bg))] text-sm font-medium text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-bg-tertiary))] transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  // Apple sign-in would be implemented here
                  alert('Apple sign-in integration needed');
                }}
                className="w-full inline-flex justify-center py-2 px-4 border border-[rgb(var(--color-border))] rounded-lg shadow-sm bg-[rgb(var(--color-card-bg))] text-sm font-medium text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-bg-tertiary))] transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="ml-2">Apple</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
