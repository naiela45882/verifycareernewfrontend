import { generatePDF } from '../utils/pdfGenerator';
import React from 'react';


export default function PDFReportButton({ data }) {
async function handleDownload() {
try {
const blob = await generatePDF(data);
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `verifycareers-report-${Date.now()}.pdf`;
document.body.appendChild(a);
a.click();
a.remove();
URL.revokeObjectURL(url);
} catch (e) {
console.error('PDF generation failed', e);
alert('Failed to generate PDF');
}
}


return (
<button
onClick={handleDownload}
className="inline-flex items-center gap-2 px-3 py-2 bg-luxury-accent text-white rounded hover:bg-luxury-accent-hover"
>
Download Report
</button>
);
}