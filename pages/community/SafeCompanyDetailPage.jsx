import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSafeCompany } from "../../hooks/useForum";
import CompanyDetailSection from "../../components/community/CompanyDetailSection";

export default function SafeCompanyDetailPage() {
  const { id } = useParams();
  const { company, loading, rate, flag } = useSafeCompany(id);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (company?.userRating) setRating(company.userRating);
  }, [company?.userRating]);

  if (loading) {
    return <div className="mx-auto max-w-3xl h-48 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />;
  }

  if (!company) {
    return (
      <p className="text-center text-[13px] text-luxury-coral">
        Company not found. <Link to="/trust/company" className="text-luxury-accent">Back</Link>
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to="/trust/company" className="text-[12px] text-luxury-accent hover:underline">
        ← Company lookup
      </Link>

      <CompanyDetailSection
        company={company}
        rating={rating}
        onRate={async (stars) => {
          setRating(stars);
          try {
            await rate(stars, "");
            toast.success("Rating saved");
          } catch (err) {
            toast.error(err.message || "Rating failed");
          }
        }}
        onFlag={async (reason) => {
          try {
            await flag(reason);
            toast.success("Concern reported");
          } catch (err) {
            toast.error(err.message || "Could not flag");
          }
        }}
      />
    </div>
  );
}
