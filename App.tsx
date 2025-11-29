import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from './lib/ThemeContext';
import { AuthProvider } from './lib/AuthContext';
import { ToastProvider } from './lib/ToastContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Landing Components
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import Pricing from './components/landing/Pricing';
import Footer from './components/landing/Footer';

// Auth Components
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';

// Portal Components
import AdvisorPortal from './components/portal/AdvisorPortal';

// Dashboard Components
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardOverview from './components/dashboard/views/Overview';
import DashboardTeam from './components/dashboard/views/Team';
import DashboardSettings from './components/dashboard/views/Settings';

// Layout wrapper for landing pages
const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const LandingPage: React.FC = () => (
  <>
    <Hero />
    <Features />
    <Pricing />
  </>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Landing Routes */}
                <Route path="/" element={<LandingLayout />}>
                  <Route index element={<LandingPage />} />
                </Route>

                {/* Auth Routes */}
                <Route path="/login" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Client Portal - Standalone Layout */}
                <Route path="/portal" element={<AdvisorPortal />} />

                {/* Dashboard Routes - Protected Layout */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="/dashboard/overview" replace />} />
                  <Route path="overview" element={<DashboardOverview />} />
                  <Route path="team" element={<DashboardTeam />} />
                  <Route path="settings" element={<DashboardSettings />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;