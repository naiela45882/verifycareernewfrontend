import ClassicPreview from "./classic/ClassicPreview";
import ModernPreview from "./modern/ModernPreview";
import ClassicPdf from "./classic/ClassicPdf";
import ModernPdf from "./modern/ModernPdf";

export const TEMPLATES = [
  {
    id: "classic",
    name: "Classic",
    description: "Centered header, traditional sections",
    Preview: ClassicPreview,
    PdfDocument: ClassicPdf,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Dark header band, two-column layout",
    Preview: ModernPreview,
    PdfDocument: ModernPdf,
  },
];

export function getTemplate(id) {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
}
