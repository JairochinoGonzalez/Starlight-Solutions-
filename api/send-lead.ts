interface VercelRequestLike {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
}

interface VercelResponseLike {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => VercelResponseLike;
  json: (data: unknown) => void;
  end: () => void;
}

const SERVICE_LABELS: Record<string, string> = {
  roof_repair: 'Reparación de Goteras y Tejas de Asfalto',
  roof_replacement: 'Reemplazo Completo de Techo (Shingles Negros)',
  insurance_claim: 'Reclamo de Seguro por Tormenta (Techo Nuevo)',
  windows_installation: 'Instalación de Ventanas de Aluminio Blanco Low-E',
  hvac_system: 'Sistema de Aire Acondicionado HVAC',
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: VercelRequestLike, res: VercelResponseLike) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Método no permitido. Usa POST.' });
    return;
  }

  try {
    let payload: Record<string, unknown> = {};

    if (typeof req.body === 'string') {
      try {
        payload = JSON.parse(req.body) as Record<string, unknown>;
      } catch {
        res.status(400).json({ ok: false, error: 'Cuerpo JSON inválido.' });
        return;
      }
    } else if (req.body && typeof req.body === 'object') {
      payload = req.body as Record<string, unknown>;
    }

    const fullName = typeof payload.fullName === 'string' ? payload.fullName.trim() : '';
    const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
    const propertyAddress =
      typeof payload.propertyAddress === 'string' ? payload.propertyAddress.trim() : '';
    const email = typeof payload.email === 'string' ? payload.email.trim() : '';
    const serviceKey = typeof payload.service === 'string' ? payload.service.trim() : '';
    const serviceLabel =
      (typeof payload.serviceLabel === 'string' && payload.serviceLabel.trim()) ||
      SERVICE_LABELS[serviceKey] ||
      serviceKey ||
      'Inspección de Techo / Propiedad';
    const notes = typeof payload.notes === 'string' ? payload.notes.trim() : '';
    const language = typeof payload.language === 'string' ? payload.language : 'es';
    const privacyConsent = Boolean(payload.privacyConsent);

    if (!fullName) {
      res.status(400).json({ ok: false, error: 'El nombre completo es obligatorio.' });
      return;
    }

    const cleanDigits = phone.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      res.status(400).json({ ok: false, error: 'Ingresa un número telefónico válido de 10 dígitos.' });
      return;
    }

    if (!propertyAddress) {
      res.status(400).json({ ok: false, error: 'La dirección de la propiedad en Nevada es obligatoria.' });
      return;
    }

    if (!email || !email.includes('@')) {
      res.status(400).json({ ok: false, error: 'Ingresa un correo electrónico válido.' });
      return;
    }

    if (!privacyConsent) {
      res.status(400).json({ ok: false, error: 'Debes aceptar la Política de Privacidad para continuar.' });
      return;
    }

    const ticketId = `SL-NV-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdAt = new Date().toISOString();
    const deliveryChannels: string[] = [];

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const recipientEmail =
      process.env.LEAD_RECIPIENT_EMAIL?.trim() || 'admin@starlightsolutionsnv.com';
    const fromEmail =
      process.env.LEAD_FROM_EMAIL?.trim() || 'Starlight Solutions <onboarding@resend.dev>';
    const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();

    let resendErrorMessage: string | null = null;

    if (resendApiKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail],
          reply_to: email,
          subject: `[Lead ${ticketId}] ${serviceLabel} - ${fullName}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px; background-color: #0B1120; color: #ECE7DF; border: 1px solid #F5B800; border-radius: 16px;">
              <div style="border-bottom: 1px solid rgba(245,184,0,0.3); padding-bottom: 16px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #F5B800; font-weight: bold;">STARLIGHT SOLUTIONS LLC · LAS VEGAS, NV</p>
                <h2 style="margin: 8px 0 0 0; font-size: 22px; color: #FFFFFF;">Nueva Solicitud de Inspección / Cotización</h2>
              </div>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
                <tr>
                  <td style="padding: 8px 0; color: #F5B800; font-weight: bold; width: 160px;">Folio / Ticket:</td>
                  <td style="padding: 8px 0; color: #FFFFFF; font-family: monospace;">${escapeHtml(ticketId)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #F5B800; font-weight: bold;">Nombre:</td>
                  <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(fullName)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #F5B800; font-weight: bold;">Teléfono:</td>
                  <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(phone)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #F5B800; font-weight: bold;">Dirección:</td>
                  <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(propertyAddress)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #F5B800; font-weight: bold;">Correo Cliente:</td>
                  <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(email)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #F5B800; font-weight: bold;">Servicio:</td>
                  <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(serviceLabel)}</td>
                </tr>
                ${
                  notes
                    ? `<tr>
                        <td style="padding: 8px 0; color: #F5B800; font-weight: bold; vertical-align: top;">Detalles / Notas:</td>
                        <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(notes)}</td>
                      </tr>`
                    : ''
                }
              </table>
              <p style="margin-top: 24px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.12); font-size: 12px; color: #94A3B8;">
                Enviado desde starlightsolutionsnv.com (${escapeHtml(language.toUpperCase())}) el ${escapeHtml(createdAt)}
              </p>
            </div>
          `,
        }),
      });

      if (emailResponse.ok) {
        deliveryChannels.push('resend');
      } else {
        const errBody = await emailResponse.text().catch(() => '');
        console.error('Resend API error:', emailResponse.status, errBody);
        resendErrorMessage = `Error en servicio de correo (${emailResponse.status}). Verifica tu RESEND_API_KEY o dominio remitente.`;
      }
    }

    if (webhookUrl) {
      try {
        const hookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ticketId,
            fullName,
            phone,
            propertyAddress,
            email,
            service: serviceLabel,
            notes,
            language,
            createdAt,
            source: 'starlightsolutionsnv.com',
          }),
        });
        if (hookResponse.ok) {
          deliveryChannels.push('webhook');
        }
      } catch (hookErr) {
        console.error('Webhook forwarding error:', hookErr);
      }
    }

    if (resendErrorMessage && deliveryChannels.length === 0) {
      res.status(500).json({ ok: false, error: resendErrorMessage });
      return;
    }

    if (process.env.VERCEL && !resendApiKey && !webhookUrl) {
      res.status(500).json({
        ok: false,
        error:
          'Falta configurar RESEND_API_KEY en las variables de entorno de Vercel para enviar el correo.',
      });
      return;
    }

    res.status(200).json({
      ok: true,
      ticketId,
      createdAt,
      deliveryChannels,
    });
  } catch (err) {
    console.error('Unhandled error in /api/send-lead:', err);
    res.status(500).json({
      ok: false,
      error: 'Ocurrió un error interno al procesar tu solicitud. Intenta de nuevo o llámanos directo.',
    });
  }
}
