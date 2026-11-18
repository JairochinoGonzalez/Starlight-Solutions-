/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, AppView, LeadSubmissionReceipt } from './types';
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
  const [lastReceipt, setLastReceipt] = useState<LeadSubmissionReceipt | null>(null);

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

  const handleSubmissionSuccess = (receipt: LeadSubmissionReceipt) => {
    setLastReceipt(receipt);
    setCurrentView('thank-you');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/gracias');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReturnHomeFromThankYou = () => {
    setLastReceipt(null);
    setCurrentView('home');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenForm = () => {
    scrollToSection('cotizacion');
  };

  return (
    <div className="min-h-screen bg-[#071426] text-[#ECE7DF] flex flex-col font-sans selection:bg-[#F5B800] selection:text-[#0D2340] overflow-x-hidden relative">
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

            {/* Lead Capture Form Ready for Custom Domain Email */}
            <InspectionForm
              lang={lang}
              onNavigate={navigateTo}
              onSubmissionSuccess={handleSubmissionSuccess}
            />
          </>
        )}

        {currentView === 'roofing-insurance' && (
          <>
            <RoofingInsuranceView
              lang={lang}
              onOpenForm={handleOpenForm}
            />
            <InspectionForm
              lang={lang}
              onNavigate={navigateTo}
              onSubmissionSuccess={handleSubmissionSuccess}
              defaultService="insurance_claim"
            />
          </>
        )}

        {currentView === 'windows' && (
          <>
            <WindowsView
              lang={lang}
              onOpenForm={handleOpenForm}
            />
            <InspectionForm
              lang={lang}
              onNavigate={navigateTo}
              onSubmissionSuccess={handleSubmissionSuccess}
              defaultService="windows_installation"
            />
          </>
        )}

        {currentView === 'hvac' && (
          <>
            <HvacView
              lang={lang}
              onOpenForm={handleOpenForm}
            />
            <InspectionForm
              lang={lang}
              onNavigate={navigateTo}
              onSubmissionSuccess={handleSubmissionSuccess}
              defaultService="hvac_system"
            />
          </>
        )}

        {currentView === 'about-us' && (
          <>
            <AboutUsView
              lang={lang}
              onOpenForm={handleOpenForm}
            />
            <InspectionForm
              lang={lang}
              onNavigate={navigateTo}
              onSubmissionSuccess={handleSubmissionSuccess}
              defaultService="roof_replacement"
            />
          </>
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
            receipt={lastReceipt}
            onReturnHome={handleReturnHomeFromThankYou}
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
