import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import styles from './AuthCallback.module.css';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        const provider = searchParams.get('provider') || 'google';

        if (error) {
          throw new Error(error);
        }

        if (!code) {
          throw new Error('No authorization code received');
        }

        // Exchange code for tokens
        await login(provider, { code, state });
        
        // Redirect to dashboard on success
        navigate('/dashboard');
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Authentication failed. Please try again.');
        navigate('/');
      }
    };

    handleCallback();
  }, [searchParams, login, navigate]);

  return (
    <div className={styles.callbackContainer}>
      <div className={styles.loadingSpinner}>
        <div className={styles.spinner}></div>
        <h2>Completing sign in...</h2>
        <p>Please wait while we process your authentication.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
