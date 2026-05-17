import { Link } from "react-router-dom";
import { Building2, ChevronRight } from "lucide-react";
import VerifiedBadge from "./VerifiedBadge";
import RatingStars from "./RatingStars";

export default function CompanyCard({ company }) {
  return (
    <Link
      to={`/trust/company/${company.slug || company.id}`}
      className="group flex items-center justify-between gap-4 rounded-xl border border-luxury-border bg-luxury-surface p-5 transition-all hover:-translate-y-0.5 hover:border-luxury-accent/35 hover:shadow-soft"
    >
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-luxury-accent/25 bg-luxury-accent/10 text-luxury-accent">
          <Building2 className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-luxury-ink">{company.name}</h3>
          {company.website && (
            <p className="mt-0.5 truncate text-[12px] text-luxury-caption">{company.website}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <VerifiedBadge status={company.verificationStatus} />
            {company.averageRating != null && (
              <RatingStars value={Math.round(company.averageRating)} readOnly size="sm" />
            )}
            <span className="text-[11px] text-luxury-caption">
              {company.ratingCount} reviews
            </span>
          </div>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-luxury-caption group-hover:text-luxury-accent" />
    </Link>
  );
}
