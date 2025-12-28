import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const ForgotPassword = () => {
  const requestPasswordReset = useAuthStore((state) => state.requestPasswordReset);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError('');

    const result = await requestPasswordReset(data.email);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setApiError(result.error);
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="hidden dark:block absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-gradient-cyan to-gradient-blue rounded-full opacity-10 filter blur-3xl animate-float"></div>
          <div className="hidden dark:block absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-gradient-purple to-gradient-pink rounded-full opacity-10 filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-md w-full space-y-8 relative z-10">
          <div className="text-center">
            <div className="mx-auto h-16 w-auto flex items-center justify-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-gradient-pink to-gradient-blue bg-clip-text text-transparent">
                DevHack
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-light-text-primary dark:text-dark-text-primary">
              Check your email
            </h2>
            <p className="mt-2 text-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
              We've sent password reset instructions to your email address.
            </p>
          </div>

          <div className="bg-light-card dark:bg-dark-card shadow-2xl rounded-2xl border border-light-border dark:border-dark-border p-8 backdrop-blur-sm transition-all duration-300">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-gradient-cyan to-gradient-blue mb-4">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Please check your email and follow the instructions to reset your password.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-gradient-pink to-gradient-blue hover:from-gradient-cyan hover:to-gradient-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gradient-blue transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-10 filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 filter blur-3xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-16 w-auto flex items-center justify-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              DevHack
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-cyan-600 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 p-8 backdrop-blur-sm transition-all duration-300">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {apiError && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                {apiError}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:shadow-lg"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending reset link...
                  </>
                ) : (
                  'Send reset link'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;