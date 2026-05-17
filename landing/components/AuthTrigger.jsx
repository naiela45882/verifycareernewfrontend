import { useAuthModal } from "../context/AuthModalContext";

export default function AuthTrigger({
  mode = "sign-up",
  redirect,
  className,
  children,
  onClick,
}) {
  const { openSignIn, openSignUp } = useAuthModal();

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (mode === "sign-up") {
      openSignUp(redirect);
    } else {
      openSignIn(redirect);
    }
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
