export default function ResumePageHeader({ title, description, action }) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink">
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-2xl text-[13px] text-luxury-body">{description}</p>
        )}
      </div>
      {action}
    </header>
  );
}
