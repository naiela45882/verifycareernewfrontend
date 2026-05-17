import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useCompanyTrust } from "../../hooks/useTrust";

export default function CompanyLookupPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const { search } = useCompanyTrust();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim().length < 2) return;
    setSearching(true);
    try {
      const list = await search(query.trim());
      setResults(list);
    } finally {
      setSearching(false);
    }
  };

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

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-luxury-caption" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Company name or domain"
            className="w-full rounded-lg border border-luxury-border bg-luxury-surface py-2.5 pl-10 pr-4 text-[13px] text-luxury-ink"
          />
        </div>
        <button
          type="submit"
          disabled={searching || query.trim().length < 2}
          className="rounded-lg bg-luxury-accent px-5 py-2.5 text-[13px] font-medium text-luxury-on-accent disabled:opacity-50"
        >
          {searching ? "Searching…" : "Search"}
        </button>
      </form>

      <section className="space-y-3">
        {results.length === 0 && query.length >= 2 && !searching && (
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
              </div>
              <span className="rounded-full bg-luxury-muted px-2.5 py-1 text-[11px] font-medium text-luxury-ink">
                Trust rating {c.trustScore ?? 50}/100
              </span>
            </div>
            <p className="mt-2 text-[11px] capitalize text-luxury-caption">
              {c.claimStatus || "unclaimed"}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
