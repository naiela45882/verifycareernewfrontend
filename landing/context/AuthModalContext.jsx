import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
  const [mode, setMode] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState("/dashboard");

  const openSignIn = useCallback((redirect = "/dashboard") => {
    setRedirectUrl(redirect);
    setMode("sign-in");
  }, []);

  const openSignUp = useCallback((redirect = "/dashboard") => {
    setRedirectUrl(redirect);
    setMode("sign-up");
  }, []);

  const close = useCallback(() => {
    setMode(null);
  }, []);

  const value = useMemo(
    () => ({ mode, redirectUrl, openSignIn, openSignUp, close }),
    [mode, redirectUrl, openSignIn, openSignUp, close]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return ctx;
}
