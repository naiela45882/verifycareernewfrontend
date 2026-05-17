import React from "react";

export default function SalaryCheck() {
  return (
    <section id="salary-check" className="max-w-6xl mx-auto mt-20 px-6">
      <h2 className="text-3xl font-semibold mb-4 text-luxury-ink">Salary Reality Check</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Position (e.g., Data Analyst)"
          className="p-4 border border-luxury-border rounded-lg"
        />
        <input
          type="number"
          placeholder="Offered Salary (INR)"
          className="p-4 border border-luxury-border rounded-lg"
        />
      </div>

      <button className="mt-5 px-6 py-2 bg-luxury-accent text-white rounded-lg hover:bg-luxury-accent-hover">
        Check Salary
      </button>

      <div className="mt-6 p-4 bg-luxury-muted shadow-sm rounded-xl">
        <h3 className="text-xl font-semibold mb-2 text-luxury-ink">Result</h3>
        <p className="text-luxury-body italic">Salary comparison will appear here...</p>
      </div>
    </section>
  );
}
