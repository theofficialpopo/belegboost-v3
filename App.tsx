import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from './lib/ThemeContext';

// Landing Components
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import Pricing from './components/landing/Pricing';
import Footer from './components/landing/Footer';
import CallToAction from './components/CallToAction';

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
    <CallToAction />
  </>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
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

          {/* Client Portal */}
          <Route path="/portal" element={<AdvisorPortal />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/overview" replace />} />
            <Route path="overview" element={<DashboardOverview />} />
            <Route path="team" element={<DashboardTeam />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;