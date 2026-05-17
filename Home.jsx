import { Link } from 'react-router-dom';
import React from 'react';


export default function Home() {
return (
<main className="max-w-4xl mx-auto p-6">
<section className="text-center py-12">
<h1 className="text-4xl font-bold text-luxury-ink">VerifyCareers</h1>
<p className="mt-4 text-luxury-body">Upload job offers and get a quick risk assessment.</p>
<div className="mt-6 flex justify-center gap-4">
<Link to="/analyzer" className="px-4 py-2 bg-luxury-accent text-white rounded">Analyze a Document</Link>
<Link to="/gallery" className="px-4 py-2 border rounded">Examples & Gallery</Link>
</div>
</section>


<section className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="p-4 border rounded">
<h3 className="font-semibold">Quick Scan</h3>
<p className="text-sm text-luxury-body">Analyze snippets of text fast.</p>
</div>
<div className="p-4 border rounded">
<h3 className="font-semibold">Full PDF</h3>
<p className="text-sm text-luxury-body">Upload a PDF to analyze the whole document.</p>
</div>
<div className="p-4 border rounded">
<h3 className="font-semibold">History</h3>
<p className="text-sm text-luxury-body">View past analyses and reports.</p>
</div>
</section>
</main>
);
}