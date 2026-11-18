import React from 'react';
import { Phone, Mail, MapPin, Shield, MessageSquare, Calendar } from 'lucide-react';
import { Language, AppView } from '../types';
import { translations } from '../data/translations';
import { OfficialLogo } from './OfficialLogo';

interface FooterProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
  onOpenSchedule: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate, onOpenSchedule }) => {
  const t = translations[lang];

  const handleLinkClick = (view: AppView) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050D18] text-[#ECE7DF] border-t border-[#4A4F54]/40 pt-16 pb-24 sm:pb-20 text-xs sm:text-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#4A4F54]/30">
          
          {/* Brand Column (Spans 5) */}
          <div className="lg:col-span-5 space-y-4">
            <OfficialLogo size="md" variant="full" showSubtitle />
            <p className="text-xs text-[#ECE7DF]/75 leading-relaxed max-w-sm mt-3">
              {t.footer.tagline} {t.brand.location}.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#F5B800] font-mono font-bold">
                <Shield className="w-3.5 h-3.5" />
                <span>{t.brand.license}</span>
              </div>
              <div className="flex items-center gap-2 text-[#ECE7DF]/70">
                <MapPin className="w-3.5 h-3.5 text-[#F5B800]" />
                <span>Clark County: Summerlin, Henderson, Las Vegas & Enterprise</span>
              </div>
            </div>
          </div>

          {/* Corporate Navigation (Spans 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#F5B800] uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#ECE7DF]/80">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-[#F5B800] transition-colors cursor-pointer py-0.5"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('roofing-insurance')}
                  className="hover:text-[#F5B800] transition-colors cursor-pointer py-0.5"
                >
                  {t.nav.roofingInsurance}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('windows')}
                  className="hover:text-[#F5B800] transition-colors cursor-pointer py-0.5"
                >
                  {t.nav.windows}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('hvac')}
                  className="hover:text-[#F5B800] transition-colors cursor-pointer py-0.5"
                >
                  {t.nav.hvac}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('about-us')}
                  className="hover:text-[#F5B800] transition-colors cursor-pointer py-0.5"
                >
                  {t.nav.aboutUs}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('privacy-policy')}
                  className="hover:text-[#F5B800] transition-colors cursor-pointer text-[#F5B800]/90 underline py-0.5"
                >
                  {t.nav.privacyPolicy}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hotline (Spans 4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#F5B800] uppercase tracking-wider">
              {lang === 'es' ? 'Contacto Directo' : 'Direct Contact'}
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={`tel:${t.brand.rawPhone}`}
                className="flex items-center gap-2 text-[#ECE7DF] hover:text-[#F5B800] font-mono font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F5B800]" />
                <span>{t.brand.phone}</span>
              </a>

              <a
                href={`https://wa.me/${t.brand.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {t.brand.phone}</span>
              </a>

              <a
                href={`mailto:${t.brand.email}`}
                className="flex items-center gap-2 text-[#ECE7DF]/75 hover:text-[#F5B800] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#F5B800]" />
                <span>{t.brand.email}</span>
              </a>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenSchedule}
                  className="w-full py-3.5 px-5 rounded-full bg-[#F5B800] hover:bg-[#FFD54F] text-[#0D2340] font-black uppercase text-xs tracking-wider transition-all shadow-md shadow-[#F5B800]/20 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.nav.ctaInspection}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#ECE7DF]/60">
          <p>© {new Date().getFullYear()} Starlight Solutions LLC. {t.footer.rights}</p>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
            <span>{t.footer.nvLicense}</span>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleLinkClick('privacy-policy')}
              className="text-[#F5B800] hover:underline cursor-pointer"
            >
              {t.nav.privacyPolicy}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
