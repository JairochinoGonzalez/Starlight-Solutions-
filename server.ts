import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

interface LeadRecord {
  ticketId: string;
  fullName: string;
  phone: string;
  propertyAddress: string;
  email: string;
  service: string;
  notes: string;
  language: string;
  createdAt: string;
}

// In-memory lead store for quick inspection during runtime
const recentLeads: LeadRecord[] = [];

const SERVICE_LABELS: Record<string, string> = {
  roof_repair: 'Roof Leak & Shingle Repair',
  roof_replacement: 'Full Architectural Shingle Replacement',
  insurance_claim: 'Storm Roof Insurance Claim',
  windows_installation: 'White Aluminum Low-E Windows',
  hvac_system: 'Residential HVAC / A/C System',
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'starlight-solutions-leads' });
});

app.post('/api/leads', async (req, res) => {
  try {
    const {
      fullName,
      phone,
      propertyAddress,
      email,
      service,
      privacyConsent,
      notes,
      language,
    } = req.body || {};

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({ ok: false, error: 'Full name is required.' });
    }
    const cleanDigits = String(phone || '').replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      return res.status(400).json({ ok: false, error: 'Valid 10-digit phone number is required.' });
    }
    if (!propertyAddress || typeof propertyAddress !== 'string' || !propertyAddress.trim()) {
      return res.status(400).json({ ok: false, error: 'Nevada property address is required.' });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ ok: false, error: 'Valid email address is required.' });
    }
    if (!privacyConsent) {
      return res.status(400).json({ ok: false, error: 'Privacy and TCPA consent is required.' });
    }

    const ticketId = `SL-NV-${Math.floor(100000 + Math.random() * 900000)}`;
    const serviceKey = typeof service === 'string' ? service : '';
    const serviceLabel = SERVICE_LABELS[serviceKey] || serviceKey || 'Roof Inspection';
    const createdAt = new Date().toISOString();

    const leadRecord: LeadRecord = {
      ticketId,
      fullName: fullName.trim(),
      phone: String(phone).trim(),
      propertyAddress: propertyAddress.trim(),
      email: email.trim(),
      service: serviceLabel,
      notes: notes ? String(notes).trim() : '',
      language: typeof language === 'string' ? language : 'es',
      createdAt,
    };

    recentLeads.unshift(leadRecord);
    if (recentLeads.length > 100) recentLeads.pop();

    const deliveryChannels: string[] = [];

    // 1. Optional Resend Email Delivery to Custom Domain Email
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.LEAD_RECIPIENT_EMAIL || 'admin@starlightsolutionsnv.com';
    const fromEmail = process.env.LEAD_FROM_EMAIL || 'Starlight Solutions <onboarding@resend.dev>';

    if (resendApiKey && recipientEmail) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [recipientEmail],
            reply_to: leadRecord.email,
            subject: `[Lead ${ticketId}] ${leadRecord.service} - ${leadRecord.fullName}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; padding: 24px; background: #0D2340; color: #ECE7DF; border-radius: 12px;">
                <h2 style="color: #F5B800; margin-top: 0;">Nueva Solicitud - Starlight Solutions LLC</h2>
                <p><strong>Ticket:</strong> ${ticketId}</p>
                <p><strong>Nombre:</strong> ${leadRecord.fullName}</p>
                <p><strong>Teléfono:</strong> ${leadRecord.phone}</p>
                <p><strong>Dirección:</strong> ${leadRecord.propertyAddress}</p>
                <p><strong>Correo:</strong> ${leadRecord.email}</p>
                <p><strong>Servicio:</strong> ${leadRecord.service}</p>
                ${leadRecord.notes ? `<p><strong>Notas:</strong> ${leadRecord.notes}</p>` : ''}
                <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">Enviado el ${createdAt}</p>
              </div>
            `,
          }),
        });

        if (emailResponse.ok) {
          deliveryChannels.push('email');
        }
      } catch (mailErr) {
        console.error('Resend forwarding warning:', mailErr);
      }
    }

    // 2. Optional External Webhook (Zapier / Make / n8n / Formspree / CRM)
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const hookRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadRecord),
        });
        if (hookRes.ok) {
          deliveryChannels.push('webhook');
        }
      } catch (hookErr) {
        console.error('Webhook forwarding warning:', hookErr);
      }
    }

    return res.status(201).json({
      ok: true,
      ticketId,
      createdAt,
      deliveryChannels,
    });
  } catch (err) {
    console.error('Error processing lead:', err);
    return res.status(500).json({ ok: false, error: 'Internal server error processing lead.' });
  }
});

// Fallback if a native HTML form POST hits root or /gracias directly
app.post(['/', '/gracias', '/thank-you'], (_req, res) => {
  res.redirect(303, '/gracias');
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Starlight Solutions server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
