import React from "react";

export default function EmailVerification() {
  return (
    <section id="email-check" className="max-w-6xl mx-auto mt-20 px-6">
      <h2 className="text-3xl font-semibold mb-4 text-luxury-ink">Email Domain Verification</h2>

      <input
        type="email"
        placeholder="Enter HR or recruiter email"
        className="w-full p-4 border border-luxury-border rounded-lg mb-4"
      />

      <button className="px-6 py-2 bg-luxury-accent text-white rounded-lg hover:bg-luxury-accent-hover">
        Verify Email
      </button>

      <div className="mt-6 bg-luxury-muted p-4 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">Verification Result</h3>
        <p className="text-luxury-ink italic">Email authenticity will appear here...</p>
      </div>
    </section>
  );
}
