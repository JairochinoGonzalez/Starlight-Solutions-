/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, AppView } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { AppleBentoGrid } from './components/AppleBentoGrid';
import { InspectionForm } from './components/InspectionForm';
import { RoofingInsuranceView } from './views/RoofingInsuranceView';
import { WindowsView } from './views/WindowsView';
import { HvacView } from './views/HvacView';
import { AboutUsView } from './views/AboutUsView';
import { PrivacyPolicyView } from './views/PrivacyPolicyView';
import { ThankYouView } from './views/ThankYouView';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { FloatingShingles } from './components/FloatingShingles';

function detectInitialView(): AppView {
  if (typeof window === 'undefined') return 'home';

  const path = window.location.pathname.toLowerCase();
  const search = new URLSearchParams(window.location.search);
  const hash = window.location.hash.toLowerCase();

  if (
    path.includes('/gracias') ||
    path.includes('/thank-you') ||
    path.includes('/thanks') ||
    search.get('submitted') === 'true' ||
    search.get('gracias') === 'true' ||
    search.get('success') === 'true' ||
    hash === '#gracias' ||
    hash === '#thank-you'
  ) {
    return 'thank-you';
  }

  if (path.includes('/privacidad') || path.includes('/privacy')) {
    return 'privacy-policy';
  }

  return 'home';
}

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [currentView, setCurrentView] = useState<AppView>(detectInitialView);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(detectInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    if (typeof window !== 'undefined' && view !== 'thank-you') {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
    }
  };

  const handleReturnHome = () => {
    setCurrentView('home');
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const viewsWithForm: AppView[] = [
    'home',
    'roofing-insurance',
    'windows',
    'hvac',
    'about-us',
  ];

  const getDefaultServiceForView = (view: AppView) => {
    switch (view) {
      case 'roofing-insurance':
        return 'insurance_claim' as const;
      case 'windows':
        return 'windows_installation' as const;
      case 'hvac':
        return 'hvac_system' as const;
      default:
        return 'roof_replacement' as const;
    }
  };

  const scrollToSection = (id: string) => {
    if (!viewsWithForm.includes(currentView)) {
      navigateTo('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenForm = () => {
    scrollToSection('cotizacion');
  };

  return (
    <div className="min-h-screen bg-[#071426] text-[#ECE7DF] flex flex-col font-sans selection:bg-[#F5B800] selection:text-[#0D2340] overflow-x-clip relative">
      {/* Flying Black Asphalt Shingles Parallax Layer Across Scroll */}
      <FloatingShingles />

      {/* Modern Single-Row Navbar */}
      <Navbar
        currentView={currentView}
        lang={lang}
        onNavigate={navigateTo}
        onLanguageChange={setLang}
        onOpenSchedule={handleOpenForm}
      />

      {/* Main View Router */}
      <main className="flex-grow relative z-10">
        {currentView === 'home' && (
          <>
            {/* Modern Asymmetrical Hero with Floating Black Shingles (No People) */}
            <HeroSection
              lang={lang}
              onScrollToForm={handleOpenForm}
            />

            {/* Same-Image Interactive Before & After Slider */}
            <BeforeAfterSlider
              lang={lang}
              onCtaClick={handleOpenForm}
            />

            {/* Bento Grid with Roofing, Insurance, White Aluminum Windows & HVAC */}
            <AppleBentoGrid
              lang={lang}
              onNavigate={navigateTo}
              onScrollToForm={handleOpenForm}
            />
          </>
        )}

        {currentView === 'roofing-insurance' && (
          <RoofingInsuranceView
            lang={lang}
            onOpenForm={handleOpenForm}
          />
        )}

        {currentView === 'windows' && (
          <WindowsView
            lang={lang}
            onOpenForm={handleOpenForm}
          />
        )}

        {currentView === 'hvac' && (
          <HvacView
            lang={lang}
            onOpenForm={handleOpenForm}
          />
        )}

        {currentView === 'about-us' && (
          <AboutUsView
            lang={lang}
            onOpenForm={handleOpenForm}
          />
        )}

        {/* Single Unified Lead Capture Form shared identically across Home & all Service Views */}
        {viewsWithForm.includes(currentView) && (
          <InspectionForm
            lang={lang}
            activeView={currentView}
            onNavigate={navigateTo}
            onBackToHome={handleReturnHome}
            defaultService={getDefaultServiceForView(currentView)}
          />
        )}

        {currentView === 'privacy-policy' && (
          <PrivacyPolicyView
            lang={lang}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {currentView === 'thank-you' && (
          <ThankYouView
            lang={lang}
            onReturnHome={handleReturnHome}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onNavigate={navigateTo}
        onOpenSchedule={handleOpenForm}
      />

      {/* Sticky Bottom Contact Bar */}
      <FloatingCTA
        lang={lang}
        onOpenSchedule={handleOpenForm}
      />
    </div>
  );
}
