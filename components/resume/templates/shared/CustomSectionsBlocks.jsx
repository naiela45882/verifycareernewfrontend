/** Renders user-defined custom resume sections in preview/PDF templates. */
export function CustomSectionsBlocks({
  sections,
  headingClassName = "resume-preview-heading text-xs font-bold uppercase tracking-wider",
  listClassName = "mt-1 list-disc pl-4",
}) {
  if (!sections?.length) return null;

  return sections.map((sec) => {
    const bullets = (sec.bullets || []).filter(Boolean);
    const title = (sec.title || "").trim();
    if (!title && !bullets.length) return null;

    return (
      <section key={sec.id} className="mt-4">
        <h2 className={headingClassName}>{title || "Additional"}</h2>
        {bullets.length > 0 ? (
          <ul className={listClassName}>
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        ) : null}
      </section>
    );
  });
}
