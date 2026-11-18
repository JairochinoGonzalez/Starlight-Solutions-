import React, { useState } from 'react';
import { Phone, Globe, Menu, X, ArrowRight } from 'lucide-react';
import { Language, AppView } from '../types';
import { translations } from '../data/translations';
import { OfficialLogo } from './OfficialLogo';

interface NavbarProps {
  currentView: AppView;
  lang: Language;
  onNavigate: (view: AppView) => void;
  onLanguageChange: (lang: Language) => void;
  onOpenSchedule: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  lang,
  onNavigate,
  onLanguageChange,
  onOpenSchedule,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const navLinks: { view: AppView; label: string }[] = [
    { view: 'home', label: t.nav.home },
    { view: 'roofing-insurance', label: t.nav.roofingInsurance },
    { view: 'windows', label: t.nav.windows },
    { view: 'hvac', label: t.nav.hvac },
    { view: 'about-us', label: t.nav.aboutUs },
    { view: 'privacy-policy', label: t.nav.privacyPolicy },
  ];

  const handleLinkClick = (view: AppView) => {
    setMobileMenuOpen(false);
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#071426]/88 backdrop-blur-xl border-b border-[#F5B800]/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer text-left focus:outline-none shrink-0"
          >
            <OfficialLogo size="sm" variant="full" />
          </button>

          {/* Zone 2: Clean Single-Line Nav Links with Active Solar Gold Underline */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold tracking-widest uppercase text-[#ECE7DF]/80">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  type="button"
                  onClick={() => handleLinkClick(link.view)}
                  className={`relative py-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#ECE7DF]'
                      : 'hover:text-[#F5B800]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F5B800] rounded-full shadow-[0_0_8px_#F5B800]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Switch + 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 bg-[#0D2340] rounded-full p-1 border border-[#4A4F54]/40">
              <Globe className="w-3.5 h-3.5 text-[#F5B800] ml-1.5" />
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-0.5 text-[11px] font-bold rounded-full transition-colors cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#F5B800] text-[#0D2340]'
                    : 'text-[#ECE7DF]/70 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('es')}
                className={`px-2 py-0.5 text-[11px] font-bold rounded-full transition-colors cursor-pointer ${
                  lang === 'es'
                    ? 'bg-[#F5B800] text-[#0D2340]'
                    : 'text-[#ECE7DF]/70 hover:text-white'
                }`}
              >
                ES
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenSchedule}
              className="px-5 py-2.5 rounded-full bg-[#F5B800] hover:bg-[#FFD54F] active:scale-95 text-[#0D2340] font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#F5B800]/25 hover:shadow-[#F5B800]/40 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{t.nav.ctaInspection}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right Controls (Language + Hamburger) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => onLanguageChange(lang === 'es' ? 'en' : 'es')}
              className="px-2.5 py-2 text-xs font-bold rounded-lg bg-[#0D2340] border border-[#4A4F54]/50 text-[#F5B800] cursor-pointer min-h-[40px]"
              aria-label="Cambiar idioma"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#ECE7DF] hover:text-[#F5B800] rounded-lg border border-[#4A4F54]/40 bg-[#0D2340] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071426]/98 backdrop-blur-xl border-b border-[#F5B800]/30 px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-1.5 text-sm font-semibold text-[#ECE7DF]">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  type="button"
                  onClick={() => handleLinkClick(link.view)}
                  className={`text-left py-3 px-4 rounded-xl transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-[#0D2340] text-[#F5B800] border border-[#F5B800]/40'
                      : 'hover:bg-[#0D2340]/60 text-[#ECE7DF]/85 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#4A4F54]/40 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSchedule();
              }}
              className="w-full py-3.5 text-center text-xs font-black uppercase tracking-wider text-[#0D2340] bg-[#F5B800] rounded-full shadow-lg flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>{t.nav.ctaInspection}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${t.brand.rawPhone}`}
              className="w-full py-3 text-center text-xs font-bold text-[#ECE7DF] bg-[#0D2340] rounded-full border border-[#4A4F54]/50 flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-[#F5B800]" />
              <span>{t.brand.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
