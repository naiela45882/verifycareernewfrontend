import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const SESSION_KEY = "vc-login-started-at";

export function useLoginTimer() {
  const { isSignedIn } = useAuth();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isSignedIn) {
      setSeconds(0);
      return;
    }

    let startedAt = Number(sessionStorage.getItem(SESSION_KEY));
    if (!startedAt) {
      startedAt = Date.now();
      sessionStorage.setItem(SESSION_KEY, String(startedAt));
    }

    const tick = () => {
      setSeconds(Math.floor((Date.now() - startedAt) / 1000));
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isSignedIn]);

  return seconds;
}
