import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCompanyTrust } from "../../hooks/useTrust";
import TrustIntelligencePanel from "../../components/trust/TrustIntelligencePanel";
import TrustRatingRadial from "../../components/charts/TrustRatingRadial";

export default function CompanyTrustDetailPage() {
  const { idOrSlug } = useParams();
  const { getCompany, claimCompany, rateCompany, loading } = useCompanyTrust();
  const [company, setCompany] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setFetching(true);
      try {
        const c = await getCompany(idOrSlug);
        if (!cancelled) {
          setCompany(c);
          setRating(c.userRating || 0);
        }
      } catch (err) {
        if (!cancelled) toast.error(err.message || "Not found");
      } finally {
        if (!cancelled) setFetching(false);
      }
    })();
    return () => { cancelled = true; };
  }, [idOrSlug, getCompany]);

  if (fetching) {
    return <div className="mx-auto max-w-3xl h-48 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />;
  }

  if (!company) {
    return (
      <p className="text-center text-[13px] text-luxury-coral">
        Company not found.{" "}
        <Link to="/trust/company" className="text-luxury-accent">Back to lookup</Link>
      </p>
    );
  }

  const trustIntelligence = company.trustIntelligence || (company.node ? { nodes: [company.node] } : null);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to="/trust/company" className="text-[12px] text-luxury-accent hover:underline">
        ← Company lookup
      </Link>

      <header className="rounded-xl border border-luxury-border bg-luxury-surface p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-luxury-ink">{company.name}</h1>
            {company.domain && <p className="mt-1 text-[13px] text-luxury-caption">{company.domain}</p>}
          </div>
          <span className="rounded-full bg-luxury-muted px-3 py-1 text-[12px] font-medium">
            Trust rating {company.trustScore}/100
          </span>
        </div>
        {company.description && (
          <p className="mt-3 text-[13px] text-luxury-body">{company.description}</p>
        )}
        <p className="mt-2 text-[11px] capitalize text-luxury-caption">
          Status: {company.claimStatus}
        </p>
        {company.claimStatus === "unclaimed" && (
          <button
            type="button"
            disabled={loading}
            onClick={async () => {
              try {
                const updated = await claimCompany(company.id);
                setCompany((prev) => ({ ...prev, ...updated }));
                toast.success("Claim submitted for domain verification");
              } catch (err) {
                toast.error(err.message || "Claim failed");
              }
            }}
            className="mt-4 rounded-lg bg-luxury-accent px-4 py-2 text-[12px] font-medium text-luxury-on-accent disabled:opacity-50"
          >
            Claim this company
          </button>
        )}
      </header>

      <TrustRatingRadial score={company.trustScore ?? 0} className="max-w-sm" />

      {trustIntelligence && <TrustIntelligencePanel trustIntelligence={trustIntelligence} />}

      <section className="rounded-xl border border-luxury-border p-4">
        <h2 className="text-[13px] font-semibold text-luxury-ink">Community confirmation</h2>
        <p className="mt-1 text-[12px] text-luxury-caption">Rate as a positive signal.</p>
        <div className="mt-3 flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={async () => {
                setRating(n);
                try {
                  const updated = await rateCompany(company.id, n);
                  setCompany((prev) => ({ ...prev, ...updated }));
                  toast.success("Confirmation recorded");
                } catch (err) {
                  toast.error(err.message || "Failed");
                }
              }}
              className={`h-8 w-8 rounded text-[14px] ${rating >= n ? "text-amber-500" : "text-luxury-border"}`}
            >
              ★
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
