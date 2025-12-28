import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { requestPasswordReset, resetPassword, isLoading, error, clearError } = useAuthStore();
  const [step, setStep] = useState(1); // 1: Request Code, 2: Verify & Reset
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
  } = useForm();

  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    watch,
    formState: { errors: errorsStep2 },
  } = useForm();

  const newPassword = watch('newPassword');

  // Step 1: Request reset code
  const onRequestCode = async (data) => {
    setLocalError('');
    setSuccessMessage('');
    clearError();

    const result = await requestPasswordReset(data.email);
    if (result.success) {
      setEmail(data.email);
      setStep(2);
      setSuccessMessage('Reset code sent to your email!');
    } else {
      setLocalError(result.error);
    }
  };

  // Step 2: Verify code and reset password
  const onResetPassword = async (data) => {
    setLocalError('');
    setSuccessMessage('');
    clearError();

    const resetData = {
      email: email,
      code: data.code,
      newPassword: data.newPassword,
    };

    const result = await resetPassword(resetData);
    if (result.success) {
      setSuccessMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    } else {
      setLocalError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-bg-secondary))] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[rgb(var(--color-text-primary))]">
            {step === 1 ? 'Reset your password' : 'Enter reset code'}
          </h2>
          <p className="mt-2 text-center text-sm text-[rgb(var(--color-text-secondary))]">
            {step === 1 ? (
              <>
                Remember your password?{' '}
                <Link
                  to="/auth/login"
                  className="font-medium text-[rgb(var(--color-accent))] hover:text-[rgb(var(--color-accent-hover))]"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Check your email for the 6-digit code we sent to{' '}
                <span className="font-medium">{email}</span>
              </>
            )}
          </p>
        </div>

        {successMessage && (
          <div className="rounded-md bg-green-50 dark:bg-green-900/30 p-4">
            <p className="text-sm text-green-800 dark:text-green-300">{successMessage}</p>
          </div>
        )}

        {(error || localError) && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
            <p className="text-sm text-red-800 dark:text-red-300">{error || localError}</p>
          </div>
        )}

        {step === 1 ? (
          // Step 1: Request reset code
          <form className="mt-8 space-y-6 bg-[rgb(var(--color-card-bg))] p-8 rounded-2xl shadow-xl" onSubmit={handleSubmitStep1(onRequestCode)}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[rgb(var(--color-border))] placeholder-[rgb(var(--color-text-tertiary))] text-[rgb(var(--color-text-primary))] bg-[rgb(var(--color-input-bg))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-[rgb(var(--color-accent))] focus:z-10 sm:text-sm"
                placeholder="Email address"
                {...registerStep1('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errorsStep1.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errorsStep1.email.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-accent-hover))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-accent))] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
              >
                {isLoading ? 'Sending...' : 'Send reset code'}
              </button>
            </div>
          </form>
        ) : (
          // Step 2: Verify code and reset password
          <form className="mt-8 space-y-6 bg-[rgb(var(--color-card-bg))] p-8 rounded-2xl shadow-xl" onSubmit={handleSubmitStep2(onResetPassword)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-[rgb(var(--color-text-primary))]">
                  6-Digit Code
                </label>
                <input
                  id="code"
                  type="text"
                  maxLength={6}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[rgb(var(--color-border))] placeholder-[rgb(var(--color-text-tertiary))] text-[rgb(var(--color-text-primary))] bg-[rgb(var(--color-input-bg))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-[rgb(var(--color-accent))] focus:z-10 sm:text-sm text-center text-lg tracking-widest"
                  placeholder="000000"
                  {...registerStep2('code', {
                    required: 'Reset code is required',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'Code must be 6 digits',
                    },
                  })}
                />
                {errorsStep2.code && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errorsStep2.code.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-[rgb(var(--color-text-primary))]">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  autoComplete="new-password"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[rgb(var(--color-border))] placeholder-[rgb(var(--color-text-tertiary))] text-[rgb(var(--color-text-primary))] bg-[rgb(var(--color-input-bg))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-[rgb(var(--color-accent))] focus:z-10 sm:text-sm"
                  placeholder="New password"
                  {...registerStep2('newPassword', {
                    required: 'New password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                {errorsStep2.newPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errorsStep2.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-[rgb(var(--color-text-primary))]">
                  Confirm New Password
                </label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  autoComplete="new-password"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[rgb(var(--color-border))] placeholder-[rgb(var(--color-text-tertiary))] text-[rgb(var(--color-text-primary))] bg-[rgb(var(--color-input-bg))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-[rgb(var(--color-accent))] focus:z-10 sm:text-sm"
                  placeholder="Confirm new password"
                  {...registerStep2('confirmNewPassword', {
                    required: 'Please confirm your new password',
                    validate: (value) =>
                      value === newPassword || 'Passwords do not match',
                  })}
                />
                {errorsStep2.confirmNewPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errorsStep2.confirmNewPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setLocalError('');
                  setSuccessMessage('');
                }}
                className="flex-1 py-2 px-4 border border-[rgb(var(--color-border))] rounded-lg shadow-sm text-sm font-medium text-[rgb(var(--color-text-primary))] bg-[rgb(var(--color-card-bg))] hover:bg-[rgb(var(--color-bg-tertiary))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-accent))] transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-accent-hover))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-accent))] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
              >
                {isLoading ? 'Resetting...' : 'Reset password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;