import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './lib/ThemeContext';

// V1 Imports (Default)
import NavbarV1 from './components/Navbar';
import HeroV1 from './components/Hero';
import FeaturesV1 from './components/Features';
import PricingV1 from './components/Pricing';
import FooterV1 from './components/Footer';
import CallToAction from './components/CallToAction';

// V2 Imports (Modern Creative)
import NavbarV2 from './components/v2/Navbar';
import HeroV2 from './components/v2/Hero';
import FeaturesV2 from './components/v2/Features';
import PricingV2 from './components/v2/Pricing';
import FooterV2 from './components/v2/Footer';

// V3 Imports (Retro/Vintage)
import NavbarV3 from './components/v3/Navbar';
import HeroV3 from './components/v3/Hero';
import FeaturesV3 from './components/v3/Features';
import PricingV3 from './components/v3/Pricing';
import FooterV3 from './components/v3/Footer';

// V4 Imports (Hybrid)
import NavbarV4 from './components/v4/Navbar';
import HeroV4 from './components/v4/Hero';
import FeaturesV4 from './components/v4/Features';
import PricingV4 from './components/v4/Pricing';
import FooterV4 from './components/v4/Footer';

// V5 Imports (Ultimate Hybrid)
import NavbarV5 from './components/v5/Navbar';
import HeroV5 from './components/v5/Hero';
import FeaturesV5 from './components/v5/Features';
import PricingV5 from './components/v5/Pricing';
import FooterV5 from './components/v5/Footer';

// Auth Imports
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';

// Portal Imports
import AdvisorPortal from './components/portal/AdvisorPortal';

const AppContent: React.FC = () => {
  const { variant } = useTheme();
  const [currentPage, setCurrentPage] = useState<'landing' | 'signin' | 'signup' | 'forgot-password' | 'portal'>('landing');

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

  // --- Variants ---

  if (variant === 'v2') {
    return (
      <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <NavbarV2 />
        <main className="flex-grow">
          <HeroV2 />
          <FeaturesV2 />
          <PricingV2 />
          <CallToAction /> 
        </main>
        <FooterV2 />
      </div>
    );
  }

  if (variant === 'v3') {
    return (
      <div className="min-h-screen flex flex-col font-mono text-black dark:text-green-500 bg-[#008080] dark:bg-black transition-colors duration-300">
        <NavbarV3 />
        <main className="flex-grow">
          <HeroV3 />
          <FeaturesV3 />
          <PricingV3 />
        </main>
        <FooterV3 />
      </div>
    );
  }

  if (variant === 'v4') {
    return (
      <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <NavbarV4 />
        <main className="flex-grow">
          <HeroV4 />
          <FeaturesV4 />
          <PricingV4 />
          <CallToAction />
        </main>
        <FooterV4 />
      </div>
    );
  }

  if (variant === 'v5') {
    return (
      <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        {/* Pass navigation handler to V5 components */}
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
  }

  // Default V1
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-950 transition-colors duration-300">
      <NavbarV1 />
      <main className="flex-grow">
        <HeroV1 />
        <FeaturesV1 />
        <PricingV1 />
        <CallToAction />
      </main>
      <FooterV1 />
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