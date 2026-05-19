import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { cn } from "../../lib/cn";
import { useCompanyTrust } from "../../hooks/useTrust";
import {
  COMPANY_DEMO_OPTIONS,
  getCompanyDemoResults,
  getCompanyDemoSearchQuery,
  isCompanyDemoMode,
} from "../../lib/companyLookupDemoScenarios";

function TrustLabelBadge({ label }) {
  const variant =
    label === "Trusted" || label === "Generally trusted"
      ? "border-luxury-accent/30 bg-luxury-accent/10 text-luxury-accent"
      : label === "High scam risk"
        ? "border-luxury-coral/30 bg-luxury-coral/10 text-luxury-coral"
        : "border-luxury-sun/30 bg-luxury-sun/10 text-luxury-ink";

  return (
    <span
      className={cn(
        "shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium",
        variant
      )}
    >
      {label}
    </span>
  );
}

export default function CompanyLookupPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [demoMode, setDemoMode] = useState("live");
  const { search } = useCompanyTrust();

  const applyDemoMode = (mode) => {
    setDemoMode(mode);
    if (isCompanyDemoMode(mode)) {
      setQuery(getCompanyDemoSearchQuery(mode));
      setResults(getCompanyDemoResults(mode));
    } else {
      setResults([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (isCompanyDemoMode(demoMode)) {
      setResults(getCompanyDemoResults(demoMode));
      return;
    }

    if (query.trim().length < 2) return;
    setSearching(true);
    try {
      const list = await search(query.trim());
      setResults(list);
    } finally {
      setSearching(false);
    }
  };

  const handleQueryChange = (value) => {
    setQuery(value);
    if (isCompanyDemoMode(demoMode)) {
      setDemoMode("live");
      setResults([]);
    }
  };

  const showingDemo = isCompanyDemoMode(demoMode) && results.length > 0;

  return (
    <div className="mx-auto max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
          Company Trust Lookup
        </h1>
        <p className="mt-1 text-[13px] text-luxury-body">
          Search companies by name or domain. Profiles are read-only until claimed and verified.
        </p>
      </header>

      <div className="rounded-xl border border-luxury-border bg-luxury-surface p-4 shadow-soft sm:p-5">
        <label htmlFor="company-demo-mode" className="block">
          <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
            Try a demo scenario
          </span>
          <select
            id="company-demo-mode"
            value={demoMode}
            onChange={(e) => applyDemoMode(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2.5 text-[13px] text-luxury-ink focus:border-luxury-accent/40 focus:outline-none focus:ring-2 focus:ring-luxury-accent/15"
          >
            {COMPANY_DEMO_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        {showingDemo && (
          <p className="mt-2 text-[12px] text-luxury-body">
            Demo results below — open a company for details. Run{" "}
            <code className="rounded bg-luxury-muted px-1 text-[11px]">npm run seed-dev</code> in
            backend for full profiles in the database.
          </p>
        )}
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-luxury-caption" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Company name or domain"
            className="w-full rounded-lg border border-luxury-border bg-luxury-surface py-2.5 pl-10 pr-4 text-[13px] text-luxury-ink"
          />
        </div>
        <button
          type="submit"
          disabled={searching || (!isCompanyDemoMode(demoMode) && query.trim().length < 2)}
          className="rounded-lg bg-luxury-accent px-5 py-2.5 text-[13px] font-medium text-luxury-on-accent disabled:opacity-50"
        >
          {searching ? "Searching…" : isCompanyDemoMode(demoMode) ? "Show demo" : "Search"}
        </button>
      </form>

      <section className="space-y-3">
        {results.length === 0 && query.length >= 2 && !searching && !isCompanyDemoMode(demoMode) && (
          <p className="rounded-xl border border-dashed border-luxury-border p-8 text-center text-[13px] text-luxury-caption">
            No companies found. They may appear after being mentioned in scans or reports.
          </p>
        )}
        {results.map((c) => (
          <Link
            key={c.id}
            to={`/trust/company/${c.slug || c.id}`}
            className="block rounded-xl border border-luxury-border bg-luxury-surface p-4 transition-shadow hover:shadow-soft"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[14px] font-semibold text-luxury-ink">{c.name}</h2>
                {c.domain && (
                  <p className="mt-0.5 text-[12px] text-luxury-caption">{c.domain}</p>
                )}
                {c.description && (
                  <p className="mt-2 line-clamp-2 text-[12px] text-luxury-body">{c.description}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {c.trustLabel && <TrustLabelBadge label={c.trustLabel} />}
                <span className="rounded-full bg-luxury-muted px-2.5 py-1 text-[11px] font-medium text-luxury-ink">
                  Trust {c.trustScore ?? 50}/100
                </span>
              </div>
            </div>
            <p className="mt-2 text-[11px] capitalize text-luxury-caption">
              {c.claimStatus || "unclaimed"}
              {c.isDemo ? " · demo" : ""}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
