import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Github, Apple } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import styles from './LoginButton.module.css';

// Google Icon Component
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const LoginButton = ({ children, variant = 'primary', size = 'md', className = '' }) => {
  const [showProviders, setShowProviders] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleProviderLogin = async (provider) => {
    try {
      setLoading(true);
      
      // For now, we'll simulate the OAuth flow
      // In a real implementation, you'd redirect to the OAuth provider
      switch (provider) {
        case 'google':
          // Redirect to Google OAuth
          window.location.href = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_V1_STR}/auth/google/authorize`;
          break;
        case 'github':
          // Redirect to GitHub OAuth
          window.location.href = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_V1_STR}/auth/github/authorize`;
          break;
        case 'apple':
          // Apple Sign-In would be implemented here
          toast.error('Apple Sign-In coming soon!');
          break;
        default:
          throw new Error('Unknown provider');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const buttonClasses = `
    btn 
    btn-${variant} 
    btn-${size} 
    ${styles.loginButton} 
    ${className}
  `.trim();

  if (showProviders) {
    return (
      <motion.div
        className={styles.providersContainer}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <div className={styles.providersMenu}>
          <button
            className={styles.providerButton}
            onClick={() => handleProviderLogin('google')}
            disabled={loading}
          >
            <GoogleIcon />
            Continue with Google
          </button>
          
          <button
            className={styles.providerButton}
            onClick={() => handleProviderLogin('github')}
            disabled={loading}
          >
            <Github size={20} />
            Continue with GitHub
          </button>
          
          <button
            className={styles.providerButton}
            onClick={() => handleProviderLogin('apple')}
            disabled={loading}
          >
            <Apple size={20} />
            Continue with Apple
          </button>
          
          <button
            className={styles.cancelButton}
            onClick={() => setShowProviders(false)}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.button
      className={buttonClasses}
      onClick={() => setShowProviders(true)}
      disabled={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

export default LoginButton;
