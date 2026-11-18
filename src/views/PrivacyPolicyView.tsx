import React from 'react';
import { ShieldCheck, Lock, FileText, ArrowLeft, Phone, Mail } from 'lucide-react';
import { Language, AppView } from '../types';
import { translations } from '../data/translations';

interface PrivacyPolicyViewProps {
  lang: Language;
  onNavigateHome: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({
  lang,
  onNavigateHome,
}) => {
  const t = translations[lang];

  return (
    <div className="py-16 bg-[#071426] text-[#ECE7DF] animate-in fade-in duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Back */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#F5B800] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'es' ? '← Volver al Inicio' : '← Return to Home'}</span>
        </button>

        {/* Header */}
        <div className="space-y-3 pb-8 border-b border-[#4A4F54]/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2340] border border-[#F5B800]/40 text-[#F5B800] text-xs font-mono font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>Official Legal Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white">
            {t.privacy.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#F5B800] font-mono">
            {t.privacy.effectiveDate}
          </p>
        </div>

        {/* Legal Body Sections */}
        <div className="space-y-10 text-sm sm:text-base text-[#ECE7DF]/85 leading-relaxed">
          
          <div className="p-6 rounded-2xl bg-[#0D2340]/60 border border-[#4A4F54]/40">
            <p className="font-medium text-[#ECE7DF] leading-relaxed">
              {t.privacy.intro}
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#ECE7DF] font-display flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#F5B800]" />
              <span>{t.privacy.section1Title}</span>
            </h2>
            <p>{t.privacy.section1Body}</p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#ECE7DF] font-display flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#F5B800]" />
              <span>{t.privacy.section2Title}</span>
            </h2>
            <p>{t.privacy.section2Body}</p>
          </div>

          {/* Section 3: TCPA & SMS Compliance */}
          <div className="space-y-3 p-6 sm:p-8 rounded-2xl bg-[#0D2340] border-2 border-[#F5B800]/40">
            <h2 className="text-xl sm:text-2xl font-bold text-[#F5B800] font-display flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#F5B800]" />
              <span>{t.privacy.section3Title}</span>
            </h2>
            <p className="text-sm leading-relaxed text-[#ECE7DF]">
              {t.privacy.section3Body}
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#ECE7DF] font-display flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#F5B800]" />
              <span>{t.privacy.section4Title}</span>
            </h2>
            <p>{t.privacy.section4Body}</p>
          </div>

          {/* Contact Box */}
          <div className="pt-8 border-t border-[#4A4F54]/40 text-xs font-mono text-[#ECE7DF]/70 space-y-1">
            <p className="font-bold text-[#ECE7DF]">{t.privacy.contactLegal}</p>
            <p>Direct Inquiries: {t.brand.email} · {t.brand.phone}</p>
            <p>Physical Dispatch: Las Vegas Valley · Summerlin & Henderson, NV</p>
          </div>

        </div>

      </div>
    </div>
  );
};
