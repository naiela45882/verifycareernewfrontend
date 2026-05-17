import { Building2, Mail, Phone, User } from "lucide-react";

function Field({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-luxury-border bg-luxury-muted/50 text-luxury-body">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
          {label}
        </p>
        <p className="mt-0.5 text-[13px] font-medium text-luxury-ink">{value}</p>
      </div>
    </div>
  );
}

export default function RecruiterExtractCard({ recruiter = {} }) {
  const hasData = recruiter.name || recruiter.email || recruiter.phone || recruiter.org;

  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
      <header className="mb-4">
        <h3 className="text-[15px] font-semibold text-luxury-ink">Extracted recruiter</h3>
        <p className="mt-0.5 text-[13px] text-luxury-body">
          Parsed from document content for follow-up checks.
        </p>
      </header>

      {!hasData ? (
        <p className="text-[13px] text-luxury-caption">No recruiter details could be extracted.</p>
      ) : (
        <div className="space-y-4">
          <Field icon={User} label="Name" value={recruiter.name} />
          <Field icon={Building2} label="Organization" value={recruiter.org} />
          <Field icon={Mail} label="Email" value={recruiter.email} />
          <Field icon={Phone} label="Phone" value={recruiter.phone} />
        </div>
      )}
    </section>
  );
}
