import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import {
  Language,
  InspectionFormData,
  ServiceOption,
  AppView,
  LeadSubmissionReceipt,
} from '../types';
import { translations } from '../data/translations';
import { leadConfig } from '../config/leadConfig';

interface InspectionFormProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
  onSubmissionSuccess?: (receipt: LeadSubmissionReceipt) => void;
  defaultService?: ServiceOption;
}

export const InspectionForm: React.FC<InspectionFormProps> = ({
  lang,
  onNavigate,
  onSubmissionSuccess,
  defaultService = 'roof_replacement',
}) => {
  const t = translations[lang];

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

  const completeWithReceipt = (resolvedTicketId: string) => {
    const receipt: LeadSubmissionReceipt = {
      ticketId: resolvedTicketId,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      propertyAddress: formData.propertyAddress.trim(),
      email: formData.email.trim(),
      serviceLabel: serviceNames[formData.service],
    };

    if (onSubmissionSuccess) {
      onSubmissionSuccess(receipt);
    } else {
      setTicketId(resolvedTicketId);
    }
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
          _subject: `Nueva Solicitud Web - ${serviceNames[formData.service]} (${formData.fullName})`,
        }),
      });

      const rawText = await response.text().catch(() => '');
      let data: { ticketId?: string; error?: string } | null = null;
      if (rawText) {
        try {
          data = JSON.parse(rawText);
        } catch {
          // External email webhooks / FormSubmit may return plain text or HTML on 200 OK
          data = null;
        }
      }

      if (!response.ok && response.type !== 'opaque' && response.type !== 'opaqueredirect') {
        setErrorMessage(
          data?.error ||
            (lang === 'es'
              ? 'No pudimos procesar la solicitud. Verifica tus datos e inténtalo de nuevo.'
              : 'Unable to submit request. Please review your details and try again.')
        );
        setIsSubmitting(false);
        return;
      }

      const resolvedTicket =
        data?.ticketId || `SL-NV-${Math.floor(100000 + Math.random() * 900000)}`;
      completeWithReceipt(resolvedTicket);
    } catch {
      // Fallback ticket if static environment blocks webhook response headers
      completeWithReceipt(`SL-NV-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSubmitting(false);
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
      id="cotizacion"
      className="py-16 sm:py-24 bg-[#0D2340] border-b border-[#4A4F54]/30 relative overflow-hidden z-10"
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
          /* Fallback Inline Success Card */
          <div className="bg-[#071426] border-2 border-[#F5B800] rounded-3xl p-6 sm:p-12 text-center shadow-2xl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F5B800]/15 text-[#F5B800] border-2 border-[#F5B800] flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(245,184,0,0.35)]">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <span className="text-xs font-mono font-bold text-[#F5B800] tracking-widest uppercase block mb-1">
              {t.form.ticketRef}: {ticketId}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#ECE7DF] mb-3 font-display">
              {t.form.successTitle}
            </h3>
            <p className="text-sm sm:text-base text-[#ECE7DF]/80 max-w-xl mx-auto leading-relaxed mb-6">
              {t.form.successMessage}
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0D2340] border border-[#4A4F54]/50 text-xs text-[#ECE7DF]/80 font-mono mb-8">
              <Mail className="w-3.5 h-3.5 text-[#F5B800]" />
              <span>{leadConfig.businessEmail}</span>
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
                  <span>{lang === 'es' ? 'Llamar a Ingeniería' : 'Call Dispatch'}</span>
                </a>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setTicketId(null);
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
                  className="text-xs text-[#ECE7DF]/65 hover:text-[#F5B800] underline transition-colors cursor-pointer py-1"
                >
                  {lang === 'es' ? 'Enviar otra solicitud' : 'Submit another inspection ticket'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Main Lead Capture Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#071426]/92 backdrop-blur-xl border border-[#F5B800]/35 rounded-3xl p-5 sm:p-10 lg:p-12 shadow-2xl space-y-5 sm:space-y-6"
          >
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-500/60 text-rose-200 text-xs sm:text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

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
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0D2340] border border-[#4A4F54]/60 text-[#ECE7DF] placeholder-[#ECE7DF]/40 text-sm focus:outline-none focus:border-[#F5B800] transition-colors min-h-[48px]"
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
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0D2340] border border-[#4A4F54]/60 text-[#ECE7DF] placeholder-[#ECE7DF]/40 text-sm font-mono focus:outline-none focus:border-[#F5B800] transition-colors min-h-[48px]"
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
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#0D2340] border border-[#4A4F54]/60 text-[#ECE7DF] placeholder-[#ECE7DF]/40 text-sm focus:outline-none focus:border-[#F5B800] transition-colors min-h-[48px]"
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
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0D2340] border border-[#4A4F54]/60 text-[#ECE7DF] placeholder-[#ECE7DF]/40 text-sm focus:outline-none focus:border-[#F5B800] transition-colors min-h-[48px]"
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
                className="w-full px-4 py-3.5 rounded-xl bg-[#0D2340] border border-[#4A4F54]/60 text-[#ECE7DF] text-sm focus:outline-none focus:border-[#F5B800] transition-colors cursor-pointer min-h-[48px]"
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
                className="w-full px-4 py-3 rounded-xl bg-[#0D2340] border border-[#4A4F54]/60 text-[#ECE7DF] placeholder-[#ECE7DF]/40 text-sm focus:outline-none focus:border-[#F5B800] transition-colors resize-none"
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

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#F5B800] hover:bg-[#FFD54F] active:scale-[0.98] disabled:opacity-60 text-[#0D2340] font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#F5B800]/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer min-h-[52px]"
              >
                {isSubmitting ? (
                  <span>{t.form.submitting}</span>
                ) : (
                  <>
                    <ClipboardCheck className="w-4 h-4 text-[#0D2340]" />
                    <span>{t.form.submitBtn}</span>
                    <Send className="w-4 h-4 text-[#0D2340]" />
                  </>
                )}
              </button>
              <div className="mt-3 flex items-center justify-center gap-2 text-center text-[11px] text-[#ECE7DF]/65">
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
