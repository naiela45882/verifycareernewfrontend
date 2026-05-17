import React from "react";
import { useClerk } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import ThemeAndPwaControls from "./components/ThemeAndPwaControls";

const Navbar = () => {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  return (
    <nav className="w-full flex justify-between items-center px-6 sm:px-12 py-4 border-b border-luxury-border bg-luxury-nav backdrop-blur-md sticky top-0 z-50 transition-colors duration-500">
      <div className="font-display text-xl sm:text-2xl font-semibold tracking-luxury text-luxury-ink">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          Verify<span className="text-luxury-accent">Careers</span>
        </Link>
      </div>

      <ul className="hidden md:flex gap-6 lg:gap-8 items-center text-[15px] font-medium text-luxury-body">
        <li>
          <Link to="/analyze" className="hover:text-luxury-accent transition-colors duration-300">
            Analyze
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-luxury-accent transition-colors duration-300">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/resume" className="hover:text-luxury-accent transition-colors duration-300">
            Resume Analyzer
          </Link>
        </li>
        <li>
          <Link to="/community" className="hover:text-luxury-accent transition-colors duration-300">
            Community
          </Link>
        </li>
        <li>
          <ThemeAndPwaControls />
        </li>
        <li>
          <button
            type="button"
            onClick={handleLogout}
            className="text-luxury-coral hover:opacity-80 transition-opacity duration-300"
          >
            Logout
          </button>
        </li>
      </ul>

      <div className="flex md:hidden items-center gap-1">
        <ThemeAndPwaControls />
      </div>
    </nav>
  );
};

export default Navbar;
