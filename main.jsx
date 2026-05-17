import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./theme/ThemeContext";

import { Toaster } from "react-hot-toast";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in frontend .env");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
    <ThemeProvider>
      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--vc-surface)",
            color: "var(--vc-ink)",
            border: "1px solid var(--vc-border)",
            borderRadius: "14px",
            padding: "14px",
            fontSize: "15px",
            boxShadow: "0 10px 30px var(--vc-shadow)",
          },
          success: {
            style: {
              borderColor: "var(--vc-teal)",
            },
          },
          error: {
            style: {
              borderColor: "var(--vc-coral)",
            },
          },
        }}
      />
    </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
