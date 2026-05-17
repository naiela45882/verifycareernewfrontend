import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthModal } from "../context/AuthModalContext";

export function useAuthFromQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openSignIn, openSignUp } = useAuthModal();

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (!auth) return;

    if (auth === "sign-in") {
      openSignIn();
    } else if (auth === "sign-up") {
      openSignUp();
    }

    const next = new URLSearchParams(searchParams);
    next.delete("auth");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams, openSignIn, openSignUp]);
}
