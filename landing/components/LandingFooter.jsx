import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from "../animations";
import AuthTrigger from "./AuthTrigger";
import { FOOTER_LINKS } from "../landingContent";

const columns = [
  { title: "Trust Intelligence", links: FOOTER_LINKS.trust },
  { title: "Resume Hub", links: FOOTER_LINKS.resume },
  { title: "Community", links: FOOTER_LINKS.community },
];

export default function LandingFooter() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="border-t border-[var(--stone)] px-6 py-10 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-lg font-semibold text-[var(--ink)]">
              Verify<span className="text-[var(--vc-teal)]">Careers</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--ink-soft)]">
              Resume tools, trust intelligence, and community signals — one account for your
              entire job search.
            </p>
            <AuthTrigger
              mode="sign-in"
              className="mt-4 inline-flex text-sm font-semibold text-[var(--vc-teal)] transition-opacity hover:opacity-80"
            >
              Sign in →
            </AuthTrigger>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="lp-label mb-4">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mb-8 h-px bg-gradient-to-r from-transparent via-[var(--stone)] to-transparent"
          aria-hidden
        />
        <div className="flex flex-col justify-between gap-4 text-xs text-[var(--ink-soft)] sm:flex-row">
          <p>© {new Date().getFullYear()} VerifyCareers. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <a href="#platform" className="transition-colors hover:text-[var(--ink)]">
              Platform
            </a>
            <a href="#features" className="transition-colors hover:text-[var(--ink)]">
              Features
            </a>
            <a href="#pipeline" className="transition-colors hover:text-[var(--ink)]">
              How it works
            </a>
            <a href="#faq" className="transition-colors hover:text-[var(--ink)]">
              About
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
