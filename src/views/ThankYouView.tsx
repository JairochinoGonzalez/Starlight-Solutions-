import React from 'react';
import {
  CheckCircle2,
  Phone,
  MessageSquare,
  Send,
  ArrowLeft,
  CalendarClock,
  ClipboardCheck,
  ShieldCheck,
  Mail,
} from 'lucide-react';
import { Language, LeadSubmissionReceipt } from '../types';
import { translations } from '../data/translations';
import { leadConfig } from '../config/leadConfig';

interface ThankYouViewProps {
  lang: Language;
  receipt?: LeadSubmissionReceipt | null;
  onReturnHome: () => void;
}

export const ThankYouView: React.FC<ThankYouViewProps> = ({
  lang,
  receipt,
  onReturnHome,
}) => {
  const t = translations[lang];

  const steps =
    lang === 'es'
      ? [
          {
            num: '01',
            icon: ClipboardCheck,
            title: 'Revisión de tu Caso',
            desc: 'Nuestro equipo técnico ya recibió tu solicitud y está revisando los detalles de tu propiedad.',
          },
          {
            num: '02',
            icon: CalendarClock,
            title: 'Contacto para Cita Previa',
            desc: 'Muy pronto un especialista profesional se comunicará contigo para agendar la cita en el horario que prefieras.',
          },
          {
            num: '03',
            icon: ShieldCheck,
            title: 'Inspección Gratis y Solución',
            desc: 'Evaluamos tu hogar sin compromiso y te asesoramos con tu reclamo de aseguranza o plan de financiamiento.',
          },
        ]
      : [
          {
            num: '01',
            icon: ClipboardCheck,
            title: 'Case Review Underway',
            desc: 'Our engineering team has received your details and is reviewing your Nevada property requirements.',
          },
          {
            num: '02',
            icon: CalendarClock,
            title: 'Preliminary Appointment Scheduling',
            desc: 'A dedicated specialist will contact you shortly to confirm a preliminary appointment time that works for you.',
          },
          {
            num: '03',
            icon: ShieldCheck,
            title: 'Free Inspection & Action Plan',
            desc: 'We provide a no-obligation diagnostic and guide you through insurance claim coverage or flexible financing.',
          },
        ];

  const whatsappConfirmUrl = `https://wa.me/${t.brand.whatsappNumber}?text=${encodeURIComponent(
    lang === 'es'
      ? `Hola Starlight Solutions LLC, acabo de enviar mi solicitud${
          receipt?.ticketId ? ` (Folio: ${receipt.ticketId})` : ''
        } y quiero coordinar mi cita previa gratuita.`
      : `Hello Starlight Solutions LLC, I just submitted my request${
          receipt?.ticketId ? ` (Ticket: ${receipt.ticketId})` : ''
        } and would like to coordinate my free preliminary appointment.`
  )}`;

  return (
    <section className="min-h-[78vh] py-12 sm:py-20 bg-[#071426] text-[#ECE7DF] relative overflow-hidden z-10 flex items-center">
      {/* Subtle Background Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 dot-matrix-subtle opacity-60 pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[#F5B800]/10 blur-[140px] rounded-full pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="bg-[#0D2340]/85 backdrop-blur-xl border-2 border-[#F5B800]/45 rounded-3xl p-6 sm:p-12 shadow-2xl text-center">
          {/* Illuminated Confirmation Icon */}
          <div className="w-20 h-20 rounded-full bg-[#F5B800]/15 text-[#F5B800] border-2 border-[#F5B800] flex items-center justify-center mx-auto mb-6 shadow-[0_0_35px_rgba(245,184,0,0.4)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-mono font-bold text-[#F5B800] tracking-[0.2em] uppercase block mb-2">
            {receipt?.ticketId
              ? `${t.form.ticketRef}: ${receipt.ticketId}`
              : lang === 'es'
              ? 'SOLICITUD CONFIRMADA · STARLIGHT SOLUTIONS LLC'
              : 'REQUEST CONFIRMED · STARLIGHT SOLUTIONS LLC'}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight text-balance">
            {lang === 'es'
              ? '¡Gracias por Contactarnos!'
              : 'Thank You for Contacting Us!'}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#ECE7DF]/90 max-w-2xl mx-auto leading-relaxed">
            {lang === 'es'
              ? 'Hemos recibido tu información correctamente. Muy pronto nuestro equipo profesional se pondrá en contacto contigo para coordinar una cita previa gratuita y ayudarte en tu caso.'
              : 'We have successfully received your details. Our professional team will contact you shortly to schedule a complimentary preliminary appointment and help with your case.'}
          </p>

          {/* Submitted Lead Summary (if available in session) */}
          {receipt && (receipt.fullName || receipt.serviceLabel || receipt.propertyAddress) && (
            <div className="mt-7 p-4 sm:p-5 rounded-2xl bg-[#071426]/85 border border-[#4A4F54]/45 max-w-2xl mx-auto text-left grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {receipt.fullName && (
                <div className="min-w-0">
                  <span className="text-[#F5B800] font-mono uppercase block text-[10px]">
                    {lang === 'es' ? 'Propietario' : 'Homeowner'}
                  </span>
                  <span className="text-[#ECE7DF] font-semibold text-sm break-words block">{receipt.fullName}</span>
                </div>
              )}
              {receipt.phone && (
                <div className="min-w-0">
                  <span className="text-[#F5B800] font-mono uppercase block text-[10px]">
                    {lang === 'es' ? 'Teléfono' : 'Phone'}
                  </span>
                  <span className="text-[#ECE7DF] font-mono font-semibold text-sm block">{receipt.phone}</span>
                </div>
              )}
              {receipt.serviceLabel && (
                <div className="min-w-0">
                  <span className="text-[#F5B800] font-mono uppercase block text-[10px]">
                    {lang === 'es' ? 'Servicio Solicitado' : 'Requested Service'}
                  </span>
                  <span className="text-[#ECE7DF] font-semibold text-sm break-words block">{receipt.serviceLabel}</span>
                </div>
              )}
              {receipt.propertyAddress && (
                <div className="min-w-0">
                  <span className="text-[#F5B800] font-mono uppercase block text-[10px]">
                    {lang === 'es' ? 'Dirección en Nevada' : 'Property Address'}
                  </span>
                  <span className="text-[#ECE7DF] font-semibold text-sm break-words block">{receipt.propertyAddress}</span>
                </div>
              )}
            </div>
          )}

          {/* 3 Next Steps */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-5 rounded-2xl bg-[#071426]/75 border border-[#4A4F54]/40 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-[#F5B800] bg-[#0D2340] px-2.5 py-1 rounded border border-[#F5B800]/30">
                      {step.num}
                    </span>
                    <Icon className="w-4 h-4 text-[#F5B800]" />
                  </div>
                  <h2 className="text-sm font-bold text-[#ECE7DF] font-display mt-1">
                    {step.title}
                  </h2>
                  <p className="text-xs text-[#ECE7DF]/75 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Direct Contact & Navigation Controls */}
          <div className="mt-8 pt-7 border-t border-[#4A4F54]/40 space-y-5">
            <div className="inline-flex items-center justify-center gap-2 text-xs text-[#ECE7DF]/75 font-mono max-w-full">
              <Mail className="w-3.5 h-3.5 text-[#F5B800] shrink-0" />
              <span className="break-all">
                {lang === 'es'
                  ? `Equipo de atención: ${leadConfig.businessEmail}`
                  : `Team dispatch: ${leadConfig.businessEmail}`}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${t.brand.rawPhone}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#F5B800] hover:bg-[#FFD54F] text-[#0D2340] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#F5B800]/25 min-h-[46px]"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>{lang === 'es' ? `Llamar ${t.brand.phone}` : `Call ${t.brand.phone}`}</span>
              </a>

              <a
                href={whatsappConfirmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md min-h-[46px]"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>{lang === 'es' ? 'Confirmar por WhatsApp' : 'Confirm via WhatsApp'}</span>
              </a>

              <a
                href={`sms:${t.brand.rawPhone}`}
                className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-[#071426] hover:bg-[#0D2340] border border-[#4A4F54]/60 hover:border-[#F5B800]/60 text-[#ECE7DF] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all min-h-[46px]"
              >
                <Send className="w-4 h-4 text-[#F5B800] shrink-0" />
                <span>{lang === 'es' ? 'Enviar SMS' : 'Send SMS'}</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onReturnHome}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#F5B800] hover:text-[#FFD54F] underline transition-colors cursor-pointer py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{lang === 'es' ? 'Volver a la Página Principal' : 'Return to Home Page'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
