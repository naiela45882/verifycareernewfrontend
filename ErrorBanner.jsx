import React from 'react';
export default function ErrorBanner({ message }) {
return (
<div className="bg-luxury-muted border border-luxury-coral/40 text-luxury-coral px-4 py-3 rounded">
<strong className="font-medium">Error:</strong>
<span className="ml-2">{message}</span>
</div>
);
}