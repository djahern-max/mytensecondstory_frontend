import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, Settings, LogOut, Video, Home, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import LoginButton from '../auth/LoginButton';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navigation = user ? [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Create', href: '/create', icon: Plus },
    { name: 'Gallery', href: '/gallery', icon: Video },
  ] : [];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <motion.div
            className={styles.logoIcon}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Video size={24} />
          </motion.div>
          <span className={styles.logoText}>MyTenSecondStory</span>
        </Link>

        {/* Desktop Navigation */}
        {user && (
          <nav className={styles.desktopNav}>
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${styles.navLink} ${
                    isActiveRoute(item.href) ? styles.navLinkActive : ''
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        )}

        {/* User Actions */}
        <div className={styles.userActions}>
          {user ? (
            /* Authenticated User Menu */
            <div className={styles.userMenu}>
              <motion.button
                className={styles.userButton}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {user.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt={user.name}
                    className={styles.userAvatar}
                  />
                ) : (
                  <div className={styles.userAvatarFallback}>
                    <User size={20} />
                  </div>
                )}
                <span className={styles.userName}>{user.name || user.email}</span>
              </motion.button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <motion.div
                  className={styles.profileDropdown}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <Link
                    to="/profile"
                    className={styles.dropdownItem}
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={16} />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className={styles.dropdownItem}
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings size={16} />
                    Settings
                  </Link>
                  <hr className={styles.dropdownDivider} />
                  <button
                    onClick={handleLogout}
                    className={`${styles.dropdownItem} ${styles.logoutItem}`}
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            /* Login Button for Guests */
            <LoginButton variant="primary" size="sm">
              Get Started
            </LoginButton>
          )}

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className={styles.mobileNav}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {user ? (
              <>
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${styles.mobileNavLink} ${
                        isActiveRoute(item.href) ? styles.mobileNavLinkActive : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon size={18} />
                      {item.name}
                    </Link>
                  );
                })}
                <hr className={styles.mobileNavDivider} />
                <Link
                  to="/profile"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings size={18} />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className={`${styles.mobileNavLink} ${styles.logoutItem}`}
                >
                  <LogOut size={18} />
                  Sign out
                </button>
              </>
            ) : (
              <div className={styles.mobileAuthActions}>
                <LoginButton variant="primary">
                  Get Started
                </LoginButton>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Backdrop for profile dropdown */}
      {isProfileOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
