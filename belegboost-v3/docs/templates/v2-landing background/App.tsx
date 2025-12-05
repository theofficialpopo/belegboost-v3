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

// Content Pages
import PageWrapper from './components/pages/PageWrapper';
import { Datenschutz, AGB, Impressum } from './components/pages/LegalPages';
import { FeaturesPage, IntegrationPage, SecurityPage } from './components/pages/ProductPages';
import { BlogPage, DocumentationPage, ApiReferencePage } from './components/pages/ResourcePages';
import { AboutPage, CareerPage, ContactPage } from './components/pages/CompanyPages';

type PageType = 
  | 'landing' | 'signin' | 'signup' | 'forgot-password' 
  | 'portal' | 'dashboard'
  | 'datenschutz' | 'agb' | 'impressum'
  | 'features' | 'integration' | 'sicherheit'
  | 'blog' | 'dokumentation' | 'api-referenz'
  | 'ueber-uns' | 'karriere' | 'kontakt';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [dashboardPage, setDashboardPage] = useState<'overview' | 'team' | 'settings'>('overview');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
  };

  // Helper for content pages - Now passes onNavigate to children
  const renderContentPage = (Component: React.FC<{ onNavigate?: (page: string) => void }>) => (
    <PageWrapper onNavigate={handleNavigate}>
      <Component onNavigate={handleNavigate} />
    </PageWrapper>
  );

  // Auth Routing
  if (currentPage === 'signin') return <SignIn onNavigate={setCurrentPage} />;
  if (currentPage === 'signup') return <SignUp onNavigate={setCurrentPage} />;
  if (currentPage === 'forgot-password') return <ForgotPassword onNavigate={setCurrentPage} />;
  
  // Portal Routing
  if (currentPage === 'portal') return <AdvisorPortal onNavigate={handleNavigate} />;

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

  // Legal Pages
  if (currentPage === 'datenschutz') return renderContentPage(Datenschutz);
  if (currentPage === 'agb') return renderContentPage(AGB);
  if (currentPage === 'impressum') return renderContentPage(Impressum);

  // Product Pages
  if (currentPage === 'features') return renderContentPage(FeaturesPage);
  if (currentPage === 'integration') return renderContentPage(IntegrationPage);
  if (currentPage === 'sicherheit') return renderContentPage(SecurityPage);

  // Resource Pages
  if (currentPage === 'blog') return renderContentPage(BlogPage);
  if (currentPage === 'dokumentation') return renderContentPage(DocumentationPage);
  if (currentPage === 'api-referenz') return renderContentPage(ApiReferencePage);

  // Company Pages
  if (currentPage === 'ueber-uns') return renderContentPage(AboutPage);
  if (currentPage === 'karriere') return renderContentPage(CareerPage);
  if (currentPage === 'kontakt') return renderContentPage(ContactPage);

  // Default: Landing Page (The Aurora Theme)
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-50 transition-colors duration-300 relative">
       
       {/* Global Aurora Background */}
       <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Base Layer */}
          <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/90 transition-colors duration-500" />
          
          {/* Animated Blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary-200/30 dark:bg-primary-500/10 blur-[120px] animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-200/30 dark:bg-blue-600/10 blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-purple-200/30 dark:bg-purple-600/10 blur-[120px] animate-blob animation-delay-4000" />
          
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" />
       </div>

      <Navbar onNavigate={handleNavigate} />
      
      <main className="flex-grow relative z-10">
        <Hero onNavigate={setCurrentPage} />
        <Features />
        <Pricing onNavigate={setCurrentPage} />
        <CallToAction onNavigate={setCurrentPage} />
      </main>
      
      <div className="relative z-10">
        <Footer onNavigate={handleNavigate} />
      </div>
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