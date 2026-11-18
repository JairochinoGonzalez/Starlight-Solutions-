// Configuración centralizada para conectar tu dominio propio y correo de recepción de leads.
// Puedes editar estos valores o configurar las variables de entorno VITE_LEAD_WEBHOOK_URL / RESEND_API_KEY.

export const leadConfig = {
  // Endpoint principal del servidor Express incluido (/api/leads).
  // Si en el futuro publicas el sitio en hosting estático con Formspree/Web3Forms,
  // puedes colocar aquí tu URL externa o definir VITE_LEAD_WEBHOOK_URL en tu entorno.
  endpointUrl: import.meta.env.VITE_LEAD_WEBHOOK_URL || '/api/leads',

  // Correo corporativo del dominio propio (visible en confirmaciones y metadata de destino)
  businessEmail: import.meta.env.VITE_BUSINESS_EMAIL || 'admin@starlightsolutionsnv.com',

  // Dominio principal configurado
  customDomain: import.meta.env.VITE_CUSTOM_DOMAIN || 'starlightsolutionsnv.com',
};
