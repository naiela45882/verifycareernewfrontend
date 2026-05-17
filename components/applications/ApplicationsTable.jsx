import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function ApplicationsTable({ applications }) {
  if (!applications.length) {
    return (
      <p className="rounded-xl border border-dashed border-luxury-border p-8 text-center text-[13px] text-luxury-caption">
        No applications match your filters.
      </p>
    );
  }

  return (
    <section className="overflow-x-auto rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
      <table className="w-full min-w-[720px] text-left text-[13px]">
        <thead>
          <tr className="border-b border-luxury-border text-[11px] uppercase tracking-[0.08em] text-luxury-caption">
            <th className="pb-2 pr-4 font-medium">Role</th>
            <th className="pb-2 pr-4 font-medium">Company</th>
            <th className="pb-2 pr-4 font-medium">Status</th>
            <th className="pb-2 pr-4 font-medium">Applied</th>
            <th className="pb-2 font-medium">Resume</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="border-b border-luxury-border/50 hover:bg-luxury-muted/20">
              <td className="py-3 pr-4">
                <Link to={`/applications/${app.id}`} className="font-medium text-luxury-ink hover:text-luxury-accent">
                  {app.jobTitle}
                </Link>
              </td>
              <td className="py-3 pr-4 text-luxury-body">{app.companyName}</td>
              <td className="py-3 pr-4">
                <StatusBadge status={app.status} />
              </td>
              <td className="py-3 pr-4 text-luxury-body">
                {app.appliedDate
                  ? new Date(app.appliedDate).toLocaleDateString()
                  : "—"}
              </td>
              <td className="py-3 text-luxury-caption">
                {app.resumeVersionUsed || "Primary"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
