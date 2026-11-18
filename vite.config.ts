import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function localVercelApiPlugin(): Plugin {
  return {
    name: 'local-vercel-api-send-lead',
    configureServer(server) {
      server.middlewares.use('/api/send-lead', async (req, res) => {
        const chunks: Uint8Array[] = [];
        req.on('data', (chunk: Uint8Array) => chunks.push(chunk));
        req.on('end', async () => {
          try {
            const rawBody = Buffer.concat(chunks).toString('utf8');
            const parsedBody = rawBody ? JSON.parse(rawBody) : {};
            const mod = await server.ssrLoadModule('/api/send-lead.ts');
            const handler = mod.default;

            let statusCode = 200;
            const resShim = {
              setHeader(name: string, value: string) {
                res.setHeader(name, value);
              },
              status(code: number) {
                statusCode = code;
                res.statusCode = code;
                return resShim;
              },
              json(data: unknown) {
                res.statusCode = statusCode;
                if (!res.getHeader('Content-Type')) {
                  res.setHeader('Content-Type', 'application/json; charset=utf-8');
                }
                res.end(JSON.stringify(data));
              },
              end() {
                res.statusCode = statusCode;
                res.end();
              },
            };

            await handler(
              {
                method: req.method,
                body: parsedBody,
                headers: req.headers,
              },
              resShim
            );
          } catch (err) {
            console.error('Local /api/send-lead error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ ok: false, error: 'Error local en /api/send-lead' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), localVercelApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
