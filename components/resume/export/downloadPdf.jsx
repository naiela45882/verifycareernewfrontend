import { pdf } from "@react-pdf/renderer";
import { getTemplate } from "../templates/registry";

export async function downloadResumePdf({ structured, templateId, fileName }) {
  const template = getTemplate(templateId);
  const PdfDoc = template.PdfDocument;
  const blob = await pdf(<PdfDoc data={structured} />).toBlob();
  const name =
    fileName ||
    `${structured?.contact?.name?.replace(/\s+/g, "-") || "resume"}-${templateId}.pdf`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name.endsWith(".pdf") ? name : `${name}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
