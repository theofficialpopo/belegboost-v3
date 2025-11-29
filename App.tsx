import React, { useState } from 'react';
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

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'signin' | 'signup' | 'forgot-password' | 'portal' | 'dashboard'>('landing');
  const [dashboardPage, setDashboardPage] = useState<'overview' | 'team' | 'settings'>('overview');

  // Auth Routing
  if (currentPage === 'signin') return <SignIn onNavigate={setCurrentPage} />;
  if (currentPage === 'signup') return <SignUp onNavigate={setCurrentPage} />;
  if (currentPage === 'forgot-password') return <ForgotPassword onNavigate={setCurrentPage} />;
  
  // Portal Routing
  if (currentPage === 'portal') return <AdvisorPortal onNavigate={setCurrentPage} />;

  // Dashboard Routing
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

  // Default: Landing Page
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar onNavigate={setCurrentPage} />
      <main className="flex-grow">
        <Hero onNavigate={setCurrentPage} />
        <Features />
        <Pricing onNavigate={setCurrentPage} />
        <CallToAction onNavigate={setCurrentPage} />
      </main>
      <Footer />
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
