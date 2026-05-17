import { useRef, useState } from "react";
import { FileUp, ClipboardPaste } from "lucide-react";
import {
  builderImportPanel,
  builderBtnSecondary,
  builderBtnPrimary,
  builderInput,
} from "./builderTheme";

export default function ImportPanel({ onPaste, onFile, disabled, busy = false }) {
  const fileRef = useRef(null);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState("");

  const handlePaste = async () => {
    if (!pasteText.trim()) return;
    await onPaste(pasteText);
    setPasteText("");
    setPasteOpen(false);
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onFile(file);
    e.target.value = "";
  };

  return (
    <div className={builderImportPanel}>
      <p className="mb-1 text-sm font-medium text-luxury-ink">Upload or paste your resume</p>
      <p className="mb-3 text-xs text-luxury-body">
        PDF, DOCX, image, or plain text. We extract and structure your content on the server.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={disabled || busy}
          onClick={() => setPasteOpen((o) => !o)}
          className={builderBtnSecondary}
        >
          <ClipboardPaste className="h-4 w-4" />
          Paste text
        </button>
        <button
          type="button"
          disabled={disabled || busy}
          onClick={() => fileRef.current?.click()}
          className={builderBtnSecondary}
        >
          <FileUp className="h-4 w-4" />
          Upload file
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.docx,.doc,.rtf,.txt,.jpg,.jpeg,.png,.webp,.bmp,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
      {pasteOpen && (
        <div className="mt-3 space-y-2">
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            rows={6}
            placeholder="Paste your resume text here..."
            className={`${builderInput} resize-y`}
          />
          <button
            type="button"
            disabled={busy || !pasteText.trim()}
            onClick={handlePaste}
            className={builderBtnPrimary}
          >
            Import
          </button>
        </div>
      )}
    </div>
  );
}
