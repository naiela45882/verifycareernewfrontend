import { FileUp, PenLine, Pencil } from "lucide-react";
import { builderCard, builderBtnPrimary, builderBtnSecondary } from "./builderTheme";

export default function FlowEntryChooser({
  onImport,
  onScratch,
  onContinue,
  existingName,
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-luxury-caption">
        Choose how to begin
      </p>
      <h2 className="mb-8 text-center text-lg font-semibold text-luxury-ink">
        How would you like to build your resume?
      </h2>

      {onContinue && (
        <button
          type="button"
          onClick={onContinue}
          className={`${builderCard} mb-4 flex w-full items-center gap-4 border-2 border-luxury-accent/30 p-5 text-left transition-all hover:border-luxury-accent/60 hover:shadow-md`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-luxury-accent/15 text-luxury-accent">
            <Pencil className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-luxury-ink">Continue editing</h3>
            <p className="mt-0.5 truncate text-sm text-luxury-body">
              {existingName
                ? `Pick up where you left off — ${existingName}`
                : "Open your saved resume in the editor"}
            </p>
          </div>
          <span className={builderBtnSecondary}>Open editor</span>
        </button>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={onImport}
          className={`${builderCard} group flex h-full flex-col items-start gap-4 border-2 p-6 text-left transition-all hover:border-luxury-accent/50 hover:shadow-md`}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-luxury-accent/12 text-luxury-accent">
            <FileUp className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-luxury-ink">Import resume</h3>
            <p className="mt-1 text-sm text-luxury-body">
              PDF, DOCX, image, or plain text — we extract and structure your content.
            </p>
          </div>
          <ul className="mt-auto space-y-1.5 text-xs text-luxury-caption">
            <li className="flex gap-2">
              <span className="text-luxury-accent">→</span>
              <span>Upload → review → template → preview</span>
            </li>
            <li className="flex gap-2">
              <span className="text-luxury-accent">→</span>
              <span>Improve an existing resume</span>
            </li>
          </ul>
          <span className={`${builderBtnPrimary} mt-2`}>Import resume</span>
        </button>

        <button
          type="button"
          onClick={onScratch}
          className={`${builderCard} flex h-full flex-col items-start gap-4 border-2 p-6 text-left transition-all hover:border-violet-500/40 hover:shadow-md`}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/12 text-violet-600 dark:text-violet-400">
            <PenLine className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-luxury-ink">Build from scratch</h3>
            <p className="mt-1 text-sm text-luxury-body">
              Choose a template first, then fill sections with a live preview.
            </p>
          </div>
          <ul className="mt-auto space-y-1.5 text-xs text-luxury-caption">
            <li className="flex gap-2">
              <span className="text-violet-600 dark:text-violet-400">→</span>
              <span>Template → fill sections → save</span>
            </li>
            <li className="flex gap-2">
              <span className="text-violet-600 dark:text-violet-400">→</span>
              <span>Start from an empty structure</span>
            </li>
          </ul>
          <span className="mt-2 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700">
            Build from scratch
          </span>
        </button>
      </div>
    </div>
  );
}
