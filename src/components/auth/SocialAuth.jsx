import { useState } from 'react';
import useAuthStore from '../../store/authStore';

// Google Sign-In Button Component
export const GoogleSignInButton = ({ onSuccess, onError, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, you would use Google's JavaScript SDK
      // For now, this is a placeholder that shows the integration pattern
      
      // Example: After Google OAuth flow, you would get a credential
      // const credential = await googleSignIn();
      // onSuccess({ credential });
      
      alert('Google sign-in integration needed. Please integrate with @google/oauth library.');
    } catch (error) {
      if (onError) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={disabled || isLoading}
      className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
      ) : (
        <>
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
          <span className="ml-2">Continue with Google</span>
        </>
      )}
    </button>
  );
};

// Apple Sign-In Button Component
export const AppleSignInButton = ({ onSuccess, onError, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, you would use Apple's Sign In JavaScript
      // For now, this is a placeholder that shows the integration pattern
      
      // Example: After Apple OAuth flow, you would get a credential
      // const credential = await appleSignIn();
      // onSuccess({ credential });
      
      alert('Apple sign-in integration needed. Please integrate with Apple Sign-In JS.');
    } catch (error) {
      if (onError) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAppleSignIn}
      disabled={disabled || isLoading}
      className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
      ) : (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          <span className="ml-2">Continue with Apple</span>
        </>
      )}
    </button>
  );
};

// Combined Social Auth Component
const SocialAuth = ({ onSuccess, onError, disabled }) => {
  return (
    <div className="space-y-3">
      <GoogleSignInButton
        onSuccess={onSuccess}
        onError={onError}
        disabled={disabled}
      />
      <AppleSignInButton
        onSuccess={onSuccess}
        onError={onError}
        disabled={disabled}
      />
    </div>
  );
};

export default SocialAuth;