import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import { VitePWA } from "vite-plugin-pwa";

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

export default defineConfig({

  plugins: [

    faviconFallback(),

    react(),

    VitePWA({

      registerType:
        "autoUpdate",

      workbox: {
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
      },

      includeAssets: [
        "favicon.svg",
      ],

      manifest: {

        name:
          "VerifyCareers AI",

        short_name:
          "VerifyCareers",

        description:
          "AI-powered career scam detection and resume intelligence platform",

        theme_color:
          "#2563eb",

        background_color:
          "#ffffff",

        display:
          "standalone",

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
});