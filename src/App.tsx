/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { FloatingShingles } from './components/FloatingShingles';

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [currentView, setCurrentView] = useState<AppView>('home');

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
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
        onNavigate={setCurrentView}
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
              onNavigate={setCurrentView}
              onScrollToForm={handleOpenForm}
            />

            {/* Lead Capture Form Ready for Custom Domain Email */}
            <InspectionForm
              lang={lang}
              onNavigate={setCurrentView}
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
              onNavigate={setCurrentView}
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
              onNavigate={setCurrentView}
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
              onNavigate={setCurrentView}
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
              onNavigate={setCurrentView}
              defaultService="roof_replacement"
            />
          </>
        )}

        {currentView === 'privacy-policy' && (
          <PrivacyPolicyView
            lang={lang}
            onNavigateHome={() => setCurrentView('home')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onNavigate={setCurrentView}
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
