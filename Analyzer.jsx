import { useState } from 'react';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBanner from '../components/ErrorBanner';


export default function Analyzer({ onResult }) {
const [text, setText] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');


async function handleAnalyze() {
setError('');
if (!text.trim()) return setError('Please enter text or upload a file to analyze.');


setLoading(true);
try {
// Replace this block with your API call
await new Promise((r) => setTimeout(r, 700));
const fakeResponse = {
score: Math.floor(Math.random() * 100),
notes: ['Suspicious sender domain', 'Requests money upfront'],
};
onResult && onResult(fakeResponse);
} catch (e) {
setError('Failed to analyze.');
} finally {
setLoading(false);
}
}


return (
<main className="max-w-3xl mx-auto p-6">
<h2 className="text-2xl font-semibold mb-4">Analyzer</h2>
{error && <ErrorBanner message={error} />}


<textarea
value={text}
onChange={(e) => setText(e.target.value)}
rows={10}
className="w-full p-3 border rounded mt-4"
placeholder="Paste job offer text here or upload a PDF"
/>


<div className="mt-4 flex items-center gap-3">
<button
onClick={handleAnalyze}
disabled={loading}
className="px-4 py-2 bg-luxury-accent text-white rounded disabled:opacity-60"
>
Analyze
</button>
{loading && <LoadingSpinner />}
</div>
</main>
);
}