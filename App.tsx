
import React, { useState } from 'react';
import { ThemeProvider } from './lib/ThemeContext';

// V5 Imports (Current Version)
import NavbarV5 from './components/v5/Navbar';
import HeroV5 from './components/v5/Hero';
import FeaturesV5 from './components/v5/Features';
import PricingV5 from './components/v5/Pricing';
import FooterV5 from './components/v5/Footer';
import CallToAction from './components/CallToAction';

// Auth Imports
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';

// Portal Imports
import AdvisorPortal from './components/portal/AdvisorPortal';

// Dashboard Imports
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardOverview from './components/dashboard/views/Overview';
import DashboardTeam from './components/dashboard/views/Team';
import DashboardSettings from './components/dashboard/views/Settings';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'signin' | 'signup' | 'forgot-password' | 'portal' | 'dashboard'>('landing');
  const [dashboardPage, setDashboardPage] = useState<'overview' | 'team' | 'settings'>('overview');

  // Handle Auth & Portal Routing
  if (currentPage === 'signin') {
    return <SignIn onNavigate={setCurrentPage} />;
  }
  if (currentPage === 'signup') {
    return <SignUp onNavigate={setCurrentPage} />;
  }
  if (currentPage === 'forgot-password') {
    return <ForgotPassword onNavigate={setCurrentPage} />;
  }
  if (currentPage === 'portal') {
    return <AdvisorPortal onNavigate={setCurrentPage} />;
  }

  // Handle Dashboard Routing
  if (currentPage === 'dashboard') {
    return (
      <DashboardLayout 
        activePage={dashboardPage} 
        onNavigate={setDashboardPage} 
        onLogout={() => setCurrentPage('landing')}
      >
        {dashboardPage === 'overview' && <DashboardOverview />}
        {dashboardPage === 'team' && <DashboardTeam />}
        {dashboardPage === 'settings' && <DashboardSettings />}
      </DashboardLayout>
    );
  }

  // Default Landing Page (V5)
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <NavbarV5 onNavigate={setCurrentPage} />
      <main className="flex-grow">
        <HeroV5 onNavigate={setCurrentPage} />
        <FeaturesV5 />
        <PricingV5 onNavigate={setCurrentPage} />
        <CallToAction onNavigate={setCurrentPage} />
      </main>
      <FooterV5 />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
