import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const requestPasswordReset = useAuthStore((state) => state.requestPasswordReset);
  const verifyAndResetPassword = useAuthStore((state) => state.verifyAndResetPassword);

  const [step, setStep] = useState(1); // 1: Request Code, 2: Verify & Reset
  const [email, setEmail] = useState('');
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    setApiError('');
    setSuccessMessage('');

    const result = await requestPasswordReset(data.email);

    if (result.success) {
      setEmail(data.email);
      setSuccessMessage('Reset code sent to your email!');
      setTimeout(() => {
        setStep(2);
        setSuccessMessage('');
      }, 2000);
    } else {
      setApiError(result.error);
    }
    setIsSubmitting(false);
  };

  // Step 2: Verify code and reset password
  const onResetPassword = async (data) => {
    setIsSubmitting(true);
    setApiError('');
    setSuccessMessage('');

    const result = await verifyAndResetPassword({
      email,
      code: data.code,
      newPassword: data.newPassword,
    });

    if (result.success) {
      setSuccessMessage('Password reset successful!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setApiError(result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center items-center space-x-4">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-green-500 text-white'
              }`}
            >
              {step === 1 ? '1' : '✓'}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              Request Code
            </span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 2
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              2
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              Reset Password
            </span>
          </div>
        </div>

        {/* Messages */}
        {apiError && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{apiError}</p>
          </div>
        )}

        {successMessage && (
          <div className="rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        )}

        {/* Step 1: Request Code */}
        {step === 1 && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmitStep1(onRequestCode)}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...registerStep1('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
              {errorsStep1.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errorsStep1.email.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Code'}
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Verify Code & Reset Password */}
        {step === 2 && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmitStep2(onResetPassword)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="code" className="sr-only">
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  {...registerStep2('code', {
                    required: 'Verification code is required',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'Code must be 6 digits',
                    },
                  })}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="6-digit verification code"
                  maxLength={6}
                />
                {errorsStep2.code && (
                  <p className="mt-1 text-sm text-red-600">
                    {errorsStep2.code.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="sr-only">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  {...registerStep2('newPassword', {
                    required: 'New password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="New password"
                />
                {errorsStep2.newPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errorsStep2.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmNewPassword" className="sr-only">
                  Confirm New Password
                </label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  {...registerStep2('confirmNewPassword', {
                    required: 'Please confirm your new password',
                    validate: (value) =>
                      value === newPassword || 'Passwords do not match',
                  })}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Confirm new password"
                />
                {errorsStep2.confirmNewPassword && (
                  <p className="mt-1 text-sm text-red-600">
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
                  setApiError('');
                }}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
