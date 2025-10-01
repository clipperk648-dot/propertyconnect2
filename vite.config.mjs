import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";
import fs from "node:fs";

function netlifyFunctionsMiddleware() {
  return {
    name: "netlify-functions-middleware",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split("?")[0] : "";
        const map = {
          "/api/auth/register": "./netlify/functions/auth-register.js",
          "/api/auth/login": "./netlify/functions/auth-login.js",
          "/api/auth/profile": "./netlify/functions/auth-profile.js",
        };
        const fnPath = map[url];
        if (!fnPath) return next();

        const collectBody = () => new Promise((resolve) => {
          const chunks = [];
          req.on("data", (c) => chunks.push(c));
          req.on("end", () => resolve(Buffer.concat(chunks).toString()));
          req.on("error", () => resolve(""));
        });

        (async () => {
          try {
            const body = await collectBody();
            delete require.cache[require.resolve(fnPath)];
            const mod = require(fnPath);
            const result = await mod.handler({
              httpMethod: req.method || "GET",
              headers: req.headers || {},
              body,
            });
            res.statusCode = result.statusCode || 200;
            const headers = result.headers || {};
            Object.keys(headers).forEach((k) => {
              try { res.setHeader(k, headers[k]); } catch {}
            });
            res.end(result.body || "");
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Dev middleware error", message: String(err && err.message ? err.message : err) }));
          }
        })();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          charts: ["recharts", "d3"],
          ui: ["framer-motion", "lucide-react"],
        },
      },
    },
  },
  plugins: [tsconfigPaths(), react(), tagger(), netlifyFunctionsMiddleware()],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
  },
});
