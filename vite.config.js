import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";

import { VitePWA } from "vite-plugin-pwa";

function assertProductionApiUrl(mode, env) {
  if (mode !== "production") return;

  const apiUrl = (env.VITE_API_URL || "").trim();
  const isLocal =
    !apiUrl ||
    apiUrl.includes("localhost") ||
    apiUrl.includes("127.0.0.1");

  if (isLocal) {
    throw new Error(
      [
        "Production build requires a public VITE_API_URL.",
        "Set it in Vercel → Project → Settings → Environment Variables (Production):",
        "  VITE_API_URL=https://verifycareer-backend.onrender.com",
        "Remove any Production override pointing at http://localhost:5001.",
        "Also set VITE_CLERK_PUBLISHABLE_KEY to your pk_live_... key (not pk_test_...).",
      ].join("\n")
    );
  }
}

function faviconFallback() {
  return {
    name: "favicon-fallback",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/favicon.ico") {
          res.statusCode = 302;
          res.setHeader("Location", "/favicon.svg");
          res.end();
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  assertProductionApiUrl(mode, env);

  return {
    plugins: [
      faviconFallback(),
      react(),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        },
        includeAssets: ["favicon.svg"],
        manifest: {
          name: "VerifyCareers AI",
          short_name: "VerifyCareers",
          description:
            "AI-powered career scam detection and resume intelligence platform",
          theme_color: "#2563eb",
          background_color: "#ffffff",
          display: "standalone",
          scope: "/",
          start_url: "/",
          icons: [
            {
              src: "/favicon.svg",
              sizes: "any",
              type: "image/svg+xml",
              purpose: "any",
            },
            {
              src: "/favicon.svg",
              sizes: "any",
              type: "image/svg+xml",
              purpose: "maskable",
            },
          ],
        },
      }),
    ],
  };
});