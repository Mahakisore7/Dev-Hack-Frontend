import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuthStore();
  const [localError, setLocalError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setLocalError('');
    clearError();

    // Remove confirmPassword from the data sent to API
    const { confirmPassword, ...signupData } = data;

    const result = await signup(signupData);
    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setLocalError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-bg-secondary))] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[rgb(var(--color-text-primary))]">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-[rgb(var(--color-text-secondary))]">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="font-medium text-[rgb(var(--color-accent))] hover:text-[rgb(var(--color-accent-hover))]"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-[rgb(var(--color-card-bg))] p-8 rounded-2xl shadow-xl" onSubmit={handleSubmit(onSubmit)}>
          {(error || localError) && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
              <p className="text-sm text-red-800 dark:text-red-300">{error || localError}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[rgb(var(--color-text-primary))]">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[rgb(var(--color-border))] placeholder-[rgb(var(--color-text-tertiary))] text-[rgb(var(--color-text-primary))] bg-[rgb(var(--color-input-bg))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-[rgb(var(--color-accent))] focus:z-10 sm:text-sm"
                placeholder="Username"
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                })}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[rgb(var(--color-text-primary))]">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[rgb(var(--color-border))] placeholder-[rgb(var(--color-text-tertiary))] text-[rgb(var(--color-text-primary))] bg-[rgb(var(--color-input-bg))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-[rgb(var(--color-accent))] focus:z-10 sm:text-sm"
                placeholder="Email address"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[rgb(var(--color-text-primary))]">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[rgb(var(--color-border))] placeholder-[rgb(var(--color-text-tertiary))] text-[rgb(var(--color-text-primary))] bg-[rgb(var(--color-input-bg))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-[rgb(var(--color-accent))] focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[rgb(var(--color-text-primary))]">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[rgb(var(--color-border))] placeholder-[rgb(var(--color-text-tertiary))] text-[rgb(var(--color-text-primary))] bg-[rgb(var(--color-input-bg))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-[rgb(var(--color-accent))] focus:z-10 sm:text-sm"
                placeholder="Confirm password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-accent-hover))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-accent))] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;