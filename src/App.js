
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { VideoProvider } from './contexts/VideoContext';
import { useAuth } from './hooks/useAuth';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import TempLanding from './pages/TempLanding';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Profile from './pages/Profile';
import Gallery from './pages/Gallery';
import AuthCallback from './components/auth/AuthCallback';

// Styles
import './App.module.css';
import './styles/globals.css';

// Environment flag to switch between temp landing and main app
const SHOW_TEMP_LANDING = process.env.REACT_APP_TEMP_LANDING === 'true';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  return user ? children : <Navigate to="/" replace />;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  return !user ? children : <Navigate to="/dashboard" replace />;
};

// Main App Content (with auth context)
function MainAppContent() {
  const { user } = useAuth();

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            } 
          />
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create" 
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/gallery" 
            element={
              <ProtectedRoute>
                <Gallery />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {user && <Footer />}
    </div>
  );
}

// Temp Landing Content (no auth context needed)
function TempLandingContent() {
  return (
    <div className="app">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<TempLanding />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      {SHOW_TEMP_LANDING ? (
        // For temp landing, no providers needed
        <>
          <TempLandingContent />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </>
      ) : (
        // For main app, wrap with providers
        <AuthProvider>
          <VideoProvider>
            <MainAppContent />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
          </VideoProvider>
        </AuthProvider>
      )}
    </Router>
  );
}

export default App;
