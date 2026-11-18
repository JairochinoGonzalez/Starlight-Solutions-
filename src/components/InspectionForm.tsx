import React, { useState, useEffect, useRef } from 'react';
import {
  ClipboardCheck,
  Send,
  CheckCircle2,
  Phone,
  MessageSquare,
  MapPin,
  ShieldCheck,
  AlertCircle,
  Mail,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import {
  Language,
  InspectionFormData,
  ServiceOption,
  AppView,
} from '../types';
import { translations } from '../data/translations';
import { leadConfig } from '../config/leadConfig';

interface InspectionFormProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
  onBackToHome?: () => void;
  defaultService?: ServiceOption;
}

export const InspectionForm: React.FC<InspectionFormProps> = ({
  lang,
  onNavigate,
  onBackToHome,
  defaultService = 'roof_replacement',
}) => {
  const t = translations[lang];
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState<InspectionFormData>({
    fullName: '',
    phone: '',
    propertyAddress: '',
    email: '',
    service: defaultService,
    privacyConsent: false,
    notes: '',
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, service: defaultService }));
  }, [defaultService]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const serviceNames: Record<ServiceOption, string> = {
    roof_repair: lang === 'es' ? 'Reparación de Goteras y Tejas de Asfalto' : 'Roof Leak & Shingle Repair',
    roof_replacement: lang === 'es' ? 'Reemplazo Completo de Techo (Shingles Negros)' : 'Full Architectural Shingle Replacement',
    insurance_claim: lang === 'es' ? 'Reclamo de Seguro por Tormenta (Techo Nuevo)' : 'Storm Roof Insurance Claim',
    windows_installation: lang === 'es' ? 'Instalación de Ventanas de Aluminio Blanco Low-E' : 'White Aluminum Low-E Windows',
    hvac_system: lang === 'es' ? 'Sistema de Aire Acondicionado HVAC' : 'Residential HVAC / A/C System',
  };

  // Phone input mask (702) XXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 10) raw = raw.slice(0, 10);

    let formatted = raw;
    if (raw.length > 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6)}`;
    } else if (raw.length > 3) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
    } else if (raw.length > 0) {
      formatted = `(${raw}`;
    }
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim()) {
      setErrorMessage(lang === 'es' ? 'Ingresa tu nombre completo.' : 'Please enter your full name.');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMessage(
        lang === 'es' ? 'Ingresa un número telefónico de 10 dígitos.' : 'Please enter a valid 10-digit phone number.'
      );
      return;
    }
    if (!formData.propertyAddress.trim()) {
      setErrorMessage(
        lang === 'es' ? 'Ingresa la dirección de la propiedad en Nevada.' : 'Please enter your property address in Nevada.'
      );
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage(lang === 'es' ? 'Ingresa un correo electrónico válido.' : 'Please enter a valid email address.');
      return;
    }
    if (!formData.privacyConsent) {
      setErrorMessage(
        lang === 'es'
          ? 'Debes aceptar las Políticas de Privacidad y consentimiento de contacto.'
          : 'You must accept the Privacy Policy and contact consent.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(leadConfig.endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          serviceLabel: serviceNames[formData.service],
          language: lang,
          domain: leadConfig.customDomain,
          targetEmail: leadConfig.businessEmail,
        }),
      });

      const rawText = await response.text().catch(() => '');
      let data: { ok?: boolean; ticketId?: string; error?: string } | null = null;
      if (rawText) {
        try {
          data = JSON.parse(rawText);
        } catch {
          data = null;
        }
      }

      if (!response.ok || (data && data.ok === false)) {
        setErrorMessage(
          data?.error ||
            (lang === 'es'
              ? `No pudimos enviar la solicitud (Error ${response.status}). Verifica tus datos o llámanos al ${t.brand.phone}.`
              : `Unable to submit request (Error ${response.status}). Please verify your details or call ${t.brand.phone}.`)
        );
        return;
      }

      const resolvedTicket =
        data?.ticketId || `SL-NV-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(resolvedTicket);

      // Keep confirmation card top cleanly aligned below sticky header on mobile and desktop
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } catch {
      setErrorMessage(
        lang === 'es'
          ? `No pudimos conectar con el servidor de envío. Intenta nuevamente o llámanos directo al ${t.brand.phone}.`
          : `Could not connect to the submission server. Please try again or call us directly at ${t.brand.phone}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndGoHome = () => {
    setTicketId(null);
    setErrorMessage(null);
    setFormData({
      fullName: '',
      phone: '',
      propertyAddress: '',
      email: '',
      service: defaultService,
      privacyConsent: false,
      notes: '',
    });
    if (onBackToHome) {
      onBackToHome();
    } else {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getWhatsAppConfirmationUrl = () => {
    const text =
      lang === 'es'
        ? `Hola Starlight Solutions LLC. Deseo confirmar mi solicitud de Inspección Gratuita.\nFolio: ${ticketId}\nNombre: ${formData.fullName}\nDirección: ${formData.propertyAddress}\nServicio: ${serviceNames[formData.service]}\nTel: ${formData.phone}`
        : `Hello Starlight Solutions LLC. I would like to confirm my Free Roof Inspection request.\nTicket: ${ticketId}\nName: ${formData.fullName}\nAddress: ${formData.propertyAddress}\nService: ${serviceNames[formData.service]}\nPhone: ${formData.phone}`;
    return `https://wa.me/${t.brand.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      ref={sectionRef}
      id="cotizacion"
      className="scroll-mt-20 py-14 sm:py-24 bg-[#0D2340] border-b border-[#4A4F54]/30 relative overflow-hidden z-10"
    >
      {/* Background Halftone & Solar Gold Glow */}
      <div aria-hidden="true" className="absolute inset-0 dot-matrix-subtle opacity-40 pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[420px] bg-[#F5B800]/10 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-[#F5B800] uppercase mb-3">
            <ClipboardCheck className="w-4 h-4" />
            <span>{t.form.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#ECE7DF] tracking-tight font-display text-balance">
            {t.form.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#ECE7DF]/80 leading-relaxed">
            {t.form.subtitle}
          </p>
        </div>

        {ticketId ? (
          /* In-Page Starlight Dark & Gold Confirmation Card (Zero redirect / Zero reload) */
          <div className="bg-[#0B1120] border-2 border-[#F5B800] rounded-3xl p-6 sm:p-12 text-center shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F5B800]/15 text-[#F5B800] border-2 border-[#F5B800] flex items-center justify-center mx-auto mb-5 shadow-[0_0_32px_rgba(245,184,0,0.4)]">
              <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>

            <span className="text-xs font-mono font-bold text-[#F5B800] tracking-widest uppercase block mb-2">
              {t.form.ticketRef}: {ticketId}
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-[#ECE7DF] mb-3 font-display">
              {lang === 'es' ? '¡Solicitud recibida!' : 'Request Received!'}
            </h3>
            <p className="text-sm sm:text-base text-[#ECE7DF]/85 max-w-2xl mx-auto leading-relaxed mb-6">
              {lang === 'es'
                ? 'Un especialista de Starlight Solutions se pondrá en contacto contigo en menos de 24 horas para coordinar tu cita previa gratuita y ayudarte en tu caso.'
                : 'A Starlight Solutions specialist will contact you within 24 hours to schedule your complimentary preliminary appointment and assist with your case.'}
            </p>

            {/* Submitted Case Summary */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#071426] border border-[#4A4F54]/45 max-w-xl mx-auto text-left grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6">
              <div className="min-w-0">
                <span className="text-[#F5B800] font-mono uppercase block text-[10px]">
                  {lang === 'es' ? 'Nombre' : 'Name'}
                </span>
                <span className="text-[#ECE7DF] font-semibold break-words block">{formData.fullName}</span>
              </div>
              <div className="min-w-0">
                <span className="text-[#F5B800] font-mono uppercase block text-[10px]">
                  {lang === 'es' ? 'Teléfono' : 'Phone'}
                </span>
                <span className="text-[#ECE7DF] font-mono font-semibold block">{formData.phone}</span>
              </div>
              <div className="min-w-0">
                <span className="text-[#F5B800] font-mono uppercase block text-[10px]">
                  {lang === 'es' ? 'Servicio' : 'Service'}
                </span>
                <span className="text-[#ECE7DF] font-semibold break-words block">{serviceNames[formData.service]}</span>
              </div>
              <div className="min-w-0">
                <span className="text-[#F5B800] font-mono uppercase block text-[10px]">
                  {lang === 'es' ? 'Dirección' : 'Address'}
                </span>
                <span className="text-[#ECE7DF] font-semibold break-words block">{formData.propertyAddress}</span>
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#0D2340] border border-[#4A4F54]/50 text-xs text-[#ECE7DF]/85 font-mono mb-7 max-w-full">
              <Mail className="w-3.5 h-3.5 text-[#F5B800] shrink-0" />
              <span className="break-all">{leadConfig.businessEmail}</span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#0D2340] border border-[#4A4F54]/50 max-w-xl mx-auto text-left space-y-4">
              <span className="text-xs font-bold text-[#F5B800] uppercase tracking-wider block">
                {t.form.directCallPrompt}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={getWhatsAppConfirmationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>{lang === 'es' ? 'Confirmar en WhatsApp' : 'Confirm on WhatsApp'}</span>
                </a>

                <a
                  href={`tel:${t.brand.rawPhone}`}
                  className="py-3 px-4 rounded-full bg-[#F5B800] hover:bg-[#FFD54F] text-[#0D2340] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-[#0D2340] shrink-0" />
                  <span>{lang === 'es' ? `Llamar ${t.brand.phone}` : `Call ${t.brand.phone}`}</span>
                </a>
              </div>

              <div className="pt-3 border-t border-[#4A4F54]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetAndGoHome}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#071426] hover:bg-[#0B1120] border border-[#F5B800]/45 text-[#F5B800] text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[42px]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{lang === 'es' ? 'Volver al inicio' : 'Back to Home'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTicketId(null);
                    setErrorMessage(null);
                    setFormData({
                      fullName: '',
                      phone: '',
                      propertyAddress: '',
                      email: '',
                      service: defaultService,
                      privacyConsent: false,
                      notes: '',
                    });
                  }}
                  className="text-xs text-[#ECE7DF]/70 hover:text-[#F5B800] underline transition-colors cursor-pointer py-1"
                >
                  {lang === 'es' ? 'Enviar otra solicitud' : 'Submit another request'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Main Lead Capture Form */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#071426]/92 backdrop-blur-xl border border-[#F5B800]/35 rounded-3xl p-5 sm:p-10 lg:p-12 shadow-2xl space-y-5 sm:space-y-6"
          >
            {/* Row 1: Full Name & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#ECE7DF] block mb-2 font-mono">
                  1. {t.form.fullName} <span className="text-[#F5B800]">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={lang === 'es' ? 'Ej. Alejandro Navarro' : 'e.g. Alexander Vance'}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0D2340] border border-[#4A4F54]/60 text-[#ECE7DF] placeholder-[#ECE7DF]/40 text-base sm:text-sm focus:outline-none focus:border-[#F5B800] transition-colors min-h-[48px]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#ECE7DF] block mb-2 font-mono">
                  2. {t.form.phone} <span className="text-[#F5B800]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(702) 000-0000"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0D2340] border border-[#4A4F54]/60 text-[#ECE7DF] placeholder-[#ECE7DF]/40 text-base sm:text-sm font-mono focus:outline-none focus:border-[#F5B800] transition-colors min-h-[48px]"
                />
              </div>
            </div>

            {/* Row 2: Property Address & Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#ECE7DF] block mb-2 font-mono">
                  3. {t.form.address} <span className="text-[#F5B800]">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#F5B800] absolute left-3.5 top-4 pointer-events-none" />
                  <input
                    type="text"
                    name="propertyAddress"
                    required
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                    placeholder={
                      lang === 'es' ? 'Calle, Número, Summerlin / Henderson' : 'Street Address, Las Vegas Valley'
                    }
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#0D2340] border border-[#4A4F54]/60 text-[#ECE7DF] placeholder-[#ECE7DF]/40 text-base sm:text-sm focus:outline-none focus:border-[#F5B800] transition-colors min-h-[48px]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#ECE7DF] block mb-2 font-mono">
                  4. {t.form.email} <span className="text-[#F5B800]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0D2340] border border-[#4A4F54]/60 text-[#ECE7DF] placeholder-[#ECE7DF]/40 text-base sm:text-sm focus:outline-none focus:border-[#F5B800] transition-colors min-h-[48px]"
                />
              </div>
            </div>

            {/* Row 3: Service Option Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#ECE7DF] block mb-2 font-mono">
                5. {t.form.service} <span className="text-[#F5B800]">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceOption })}
                className="w-full px-4 py-3.5 rounded-xl bg-[#0D2340] border border-[#4A4F54]/60 text-[#ECE7DF] text-base sm:text-sm focus:outline-none focus:border-[#F5B800] transition-colors cursor-pointer min-h-[48px]"
              >
                <option value="roof_repair" className="bg-[#071426] text-white">
                  {serviceNames.roof_repair}
                </option>
                <option value="roof_replacement" className="bg-[#071426] text-white">
                  {serviceNames.roof_replacement}
                </option>
                <option value="insurance_claim" className="bg-[#071426] text-white">
                  {serviceNames.insurance_claim}
                </option>
                <option value="windows_installation" className="bg-[#071426] text-white">
                  {serviceNames.windows_installation}
                </option>
                <option value="hvac_system" className="bg-[#071426] text-white">
                  {serviceNames.hvac_system}
                </option>
              </select>
            </div>

            {/* Row 4: Optional Notes */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#ECE7DF] block mb-2 font-mono">
                6. {t.form.notesLabel}
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={t.form.notesPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[#0D2340] border border-[#4A4F54]/60 text-[#ECE7DF] placeholder-[#ECE7DF]/40 text-base sm:text-sm focus:outline-none focus:border-[#F5B800] transition-colors resize-none"
              />
            </div>

            {/* Privacy Policy & TCPA Consent Mandatory Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={formData.privacyConsent}
                  onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                  className="mt-1 w-5 h-5 sm:w-4 sm:h-4 rounded border-[#4A4F54] bg-[#0D2340] text-[#F5B800] focus:ring-[#F5B800] accent-[#F5B800] cursor-pointer shrink-0"
                />
                <span className="text-xs text-[#ECE7DF]/80 leading-relaxed group-hover:text-[#ECE7DF]">
                  {t.form.privacyConsentText}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('privacy-policy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#F5B800] underline hover:text-[#FFD54F] font-bold cursor-pointer inline"
                  >
                    {lang === 'es' ? 'Ver Políticas y Términos TCPA' : 'View TCPA Terms & Privacy Policy'}
                  </button>
                  .
                </span>
              </label>
            </div>

            {/* Submit Button & Error Display Directly Below Button */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#F5B800] hover:bg-[#FFD54F] active:scale-[0.98] disabled:opacity-65 text-[#0D2340] font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#F5B800]/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer min-h-[52px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#0D2340]" />
                    <span>{t.form.submitting}</span>
                  </>
                ) : (
                  <>
                    <ClipboardCheck className="w-4 h-4 text-[#0D2340]" />
                    <span>{t.form.submitBtn}</span>
                    <Send className="w-4 h-4 text-[#0D2340]" />
                  </>
                )}
              </button>

              {errorMessage && (
                <div
                  role="alert"
                  className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/70 text-rose-100 text-xs sm:text-sm flex items-center gap-3 shadow-lg"
                >
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-center text-[11px] text-[#ECE7DF]/65 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F5B800] shrink-0" />
                <span>
                  {lang === 'es'
                    ? `Envío directo seguro a ${leadConfig.businessEmail} · Cumplimiento TCPA`
                    : `Direct encrypted lead dispatch to ${leadConfig.businessEmail} · TCPA Compliant`}
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
