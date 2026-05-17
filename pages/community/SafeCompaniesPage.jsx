import { useState } from "react";
import toast from "react-hot-toast";
import { useSafeCompanies } from "../../hooks/useForum";
import CompanyCard from "../../components/community/CompanyCard";
import CreateSafeCompanyForm from "../../components/community/CreateSafeCompanyForm";

export default function SafeCompaniesPage() {
  const { companies, loading, createCompany } = useSafeCompanies("approved");
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (payload) => {
    setSubmitting(true);
    try {
      await createCompany(payload);
      toast.success("Company submitted for community review");
    } catch (err) {
      toast.error(err.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
          Safe Companies Directory
        </h1>
        <p className="mt-1 text-[13px] text-luxury-body">
          Community-verified employers with ratings and review history.
        </p>
      </header>

      <CreateSafeCompanyForm onSubmit={handleCreate} loading={submitting} />

      <section className="space-y-3">
        {loading && <div className="h-24 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />}
        {!loading && companies.length === 0 && (
          <p className="rounded-xl border border-dashed border-luxury-border p-8 text-center text-[13px] text-luxury-caption">
            No approved companies yet. Nominate a trusted employer.
          </p>
        )}
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </section>
    </div>
  );
}
