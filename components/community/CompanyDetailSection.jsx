import VerifiedBadge from "./VerifiedBadge";
import RatingStars from "./RatingStars";
import FlagCompanyButton from "./FlagCompanyButton";

export default function CompanyDetailSection({ company, rating, onRate, onFlag }) {
  if (!company) return null;

  return (
    <section className="space-y-6">
      <article className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft lg:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
              {company.name}
            </h1>
            {company.website && (
              <a
                href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-[13px] text-luxury-accent hover:underline"
              >
                {company.website}
              </a>
            )}
          </div>
          <VerifiedBadge status={company.verificationStatus} />
        </div>

        {company.description && (
          <p className="mt-6 text-[14px] leading-relaxed text-luxury-body">{company.description}</p>
        )}

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
              Community rating
            </dt>
            <dd className="mt-2 flex items-center gap-2">
              <RatingStars value={Math.round(company.averageRating || 0)} readOnly />
              <span className="text-[13px] text-luxury-body">
                {company.averageRating ?? "—"} ({company.ratingCount} reviews)
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
              Last reviewed
            </dt>
            <dd className="mt-2 text-[13px] text-luxury-ink">
              {company.lastReviewedAt
                ? new Date(company.lastReviewedAt).toLocaleDateString()
                : "Not yet reviewed"}
            </dd>
          </div>
        </dl>

        {company.flagReason && company.verificationStatus === "flagged" && (
          <p className="mt-4 rounded-lg border border-luxury-coral/20 bg-luxury-coral/5 px-4 py-3 text-[13px] text-luxury-coral">
            Flag reason: {company.flagReason}
          </p>
        )}
      </article>

      <article className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
        <h3 className="text-[15px] font-semibold text-luxury-ink">Rate this employer</h3>
        <div className="mt-4">
          <RatingStars value={rating} onChange={onRate} />
        </div>
        <div className="mt-6">
          <FlagCompanyButton onFlag={onFlag} disabled={company.verificationStatus === "flagged"} />
        </div>
      </article>

      {company.reviews?.length > 0 && (
        <article className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
          <h3 className="mb-4 text-[15px] font-semibold text-luxury-ink">Community reviews</h3>
          <ul className="space-y-3">
            {company.reviews.map((r) => (
              <li key={r.id} className="rounded-lg border border-luxury-border/60 px-4 py-3">
                <RatingStars value={r.rating} readOnly size="sm" />
                {r.review && <p className="mt-2 text-[13px] text-luxury-body">{r.review}</p>}
                <p className="mt-1 text-[11px] text-luxury-caption">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </article>
      )}
    </section>
  );
}
