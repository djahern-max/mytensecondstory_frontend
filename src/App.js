import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styles from './App.module.css';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { VideoProvider } from './contexts/VideoContext';

// Pages
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile';

// Auth Components
import AuthCallback from './components/auth/AuthCallback';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Hooks
import { useAuth } from './hooks/useAuth';

// App Layout Component for authenticated routes
const AppLayout = ({ children }) => {
  return (
    <div className={styles.appLayout}>
      <Header />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/home" replace />;
};

// Main App Component
function App() {
  return (
    <div className={styles.app}>
      <AuthProvider>
        <VideoProvider>
          <Router>
            <Routes>
              {/* Default route - show Home instead of landing */}
              <Route path="/" element={
                <AppLayout>
                  <Home />
                </AppLayout>
              } />

              {/* Public Routes */}
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />

              {/* Main App Routes */}
              <Route path="/home" element={
                <AppLayout>
                  <Home />
                </AppLayout>
              } />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              } />

              <Route path="/create" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Create />
                  </AppLayout>
                </ProtectedRoute>
              } />

              <Route path="/gallery" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Gallery />
                  </AppLayout>
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Profile />
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </VideoProvider>
      </AuthProvider>
    </div>
  );
}

export default App;