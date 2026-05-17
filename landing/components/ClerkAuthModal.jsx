import { useEffect } from "react";
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAuthModal } from "../context/AuthModalContext";
import "./clerk-auth-modal.css";

export default function ClerkAuthModal() {
  const { mode, redirectUrl, close } = useAuthModal();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const isOpen = mode !== null;

  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isSignedIn || !isOpen) return;
    close();
    navigate(redirectUrl, { replace: true });
  }, [isSignedIn, isOpen, close, navigate, redirectUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="clerk-auth-modal" role="dialog" aria-modal="true">
          <motion.button
            type="button"
            className="clerk-auth-modal__backdrop"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />

          <motion.div
            className="clerk-auth-modal__panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="clerk-auth-modal__close"
              aria-label="Close"
              onClick={close}
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div
              className="clerk-auth-modal__card"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              role="presentation"
            >
              {mode === "sign-up" ? (
                <SignUp routing="virtual" forceRedirectUrl={redirectUrl} />
              ) : (
                <SignIn routing="virtual" forceRedirectUrl={redirectUrl} />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
