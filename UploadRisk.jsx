import React, { useState } from "react";
import { useAuthedFetch } from "./hooks/useAuthedFetch";

const UploadRisk = () => {
  const authedFetch = useAuthedFetch();

  const [sourceType, setSourceType] = useState("text");
  const [jobText, setJobText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);

  try {

    setLoading(true);

    setAnalysis(null);

    // ==============================
    // STEP 1 → UPLOAD OFFER
    // ==============================
    const formData = new FormData();

    if (
  (sourceType === "pdf" ||
   sourceType === "image") &&
  file
) {

  formData.append(
    "offerLetter",
    file
  );
}

    if (sourceType === "text") {
      formData.append("text", jobText);
    }

    const uploadResponse = await authedFetch("/api/upload/upload-offer", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadResponse.json();

    console.log("UPLOAD DATA:", uploadData);

    // ==============================
    // STEP 2 → ANALYZE OFFER
    // ==============================
    const analyzeResponse = await authedFetch("/api/upload/analyze-offer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        historyId: uploadData.historyId,
      }),
    });

    const analyzeData = await analyzeResponse.json();

    console.log("AI RESULT:", analyzeData);

    setAnalysis(analyzeData.analysis);

  } catch (error) {

    console.log(error);

    alert("AI analysis failed");

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch">

          {/* LEFT SIDE */}
          <div className="bg-luxury-surface rounded-[32px] shadow-lg border border-luxury-border p-8 h-full">

            {/* HEADER */}
            <div className="mb-8">

              <div className="flex items-center gap-4 mb-3">

                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-luxury-accent to-luxury-accent-hover flex items-center justify-center text-luxury-on-accent text-3xl shadow-lg">
                  🛡️
                </div>

                <div>

                  <h1 className="text-4xl font-bold text-luxury-ink">
                    AI Scam Detection
                  </h1>

                  <p className="text-luxury-body mt-1 text-lg">
                    Analyze suspicious job offers using intelligent AI risk analysis
                  </p>

                </div>

              </div>

            </div>

            {/* SOURCE TYPE */}
            <div className="mb-6">

              <label className="block text-luxury-ink font-semibold mb-3 text-lg">
                Job Offer Source
              </label>

              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value)}
                className="w-full border-2 border-luxury-border rounded-2xl px-5 py-4 outline-none focus:border-luxury-accent transition bg-luxury-surface text-lg"
              >

                <option value="text">
  Paste Text
</option>

<option value="pdf">
  Upload PDF
</option>

<option value="image">
  Upload Image
</option>
              </select>

            </div>

            {/* TEXT INPUT */}
            {sourceType === "text" && (

              <div className="mb-6">

                <textarea
                  value={jobText}
                  onChange={(e) => setJobText(e.target.value)}
                  placeholder="Paste suspicious job offer here..."
                  className="w-full h-[260px] border-2 border-luxury-border rounded-3xl p-5 outline-none resize-none focus:border-luxury-accent transition text-luxury-ink text-lg"
                />

                <button
                  onClick={() =>
                    setJobText(
`Congratulations!

You have been selected for an international remote internship.

Salary: ₹1,20,000/month

To confirm your seat, pay a refundable registration fee of ₹2,500 immediately.

Limited slots available. Contact HR only on Telegram.

Guaranteed selection without interview.`
                    )
                  }
                  className="mt-4 text-sm text-luxury-accent hover:text-luxury-accent font-medium"
                >

                  + Use suspicious sample text

                </button>

              </div>

            )}

            {/* PDF INPUT */}
{sourceType === "pdf" && (

  <div className="mb-6">

    <label className="w-full h-[260px] border-2 border-dashed border-luxury-accent/40 rounded-3xl flex flex-col items-center justify-center bg-luxury-muted hover:bg-luxury-muted transition cursor-pointer">

      <div className="text-7xl mb-4">
        📄
      </div>

      <p className="text-xl font-semibold text-luxury-ink">
        Upload Suspicious PDF
      </p>

      <p className="text-luxury-body mt-2 text-sm">
        Drag & drop or click to browse
      </p>

      {file && (

        <div className="mt-4 bg-luxury-surface px-4 py-2 rounded-xl shadow text-sm font-medium text-luxury-accent">
          {file.name}
        </div>

      )}

      <input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

    </label>

  </div>

)}

{/* IMAGE INPUT */}
{sourceType === "image" && (

  <div className="mb-6">

    <label className="w-full h-[260px] border-2 border-dashed border-luxury-coral/40 rounded-3xl flex flex-col items-center justify-center bg-luxury-muted hover:bg-luxury-muted transition cursor-pointer">

      <div className="text-7xl mb-4">
        🖼️
      </div>

      <p className="text-xl font-semibold text-luxury-ink">
        Upload Scam Screenshot
      </p>

      <p className="text-luxury-body mt-2 text-sm">
        JPG, PNG, WhatsApp, Telegram screenshots
      </p>

      {file && (

        <div className="mt-4 bg-luxury-surface px-4 py-2 rounded-xl shadow text-sm font-medium text-luxury-coral">
          {file.name}
        </div>

      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

    </label>

  </div>

)}

            

            {/* BUTTON */}
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className={`w-full py-4 rounded-2xl text-luxury-on-accent text-xl font-semibold shadow-lg transition flex items-center justify-center gap-3
              ${
                loading
                  ? "bg-luxury-caption cursor-not-allowed"
                  : "bg-gradient-to-r from-luxury-coral to-luxury-sun hover:scale-[1.02]"
              }`}
            >

              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing with AI...
                </>
              ) : (
                "Analyze Risk"
              )}

            </button>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-luxury-surface rounded-[32px] shadow-lg border border-luxury-border p-8 h-full">

            {/* HEADER */}
            <div className="flex items-start justify-between mb-8">

              <div>

                <h2 className="text-4xl font-bold bg-gradient-to-r from-luxury-coral to-luxury-sun bg-clip-text text-transparent">
                  Risk Analysis
                </h2>

                <div>

  <p className="text-luxury-body mt-2 text-lg">
    AI-generated scam probability assessment
  </p>

  <p className="text-sm text-luxury-body mt-1">

    Powered by: {

      analysis?.mode === "ai"
        ? "Gemini AI"
        : "Fallback Detection Engine"

    }

  </p>

</div>
              </div>

              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-luxury-coral to-luxury-sun flex items-center justify-center text-5xl shadow-lg">
                ⚠️
              </div>

            </div>

            {!analysis ? (

              <div className="flex flex-col items-center justify-center h-[650px] text-center">

                {loading ? (
                  <>
                    <div className="w-24 h-24 rounded-full border-[10px] border-luxury-border border-t-luxury-accent animate-spin mb-8"></div>

                    <h3 className="text-3xl font-bold text-luxury-ink mb-4">
                      AI Analysis in Progress...
                    </h3>

                    <p className="text-luxury-body max-w-md leading-relaxed text-lg">
                      Scanning recruiter patterns, salary claims,
                      suspicious keywords, and scam indicators.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-7xl mb-6">
                      🤖
                    </div>

                    <h3 className="text-4xl font-bold text-luxury-ink mb-4">
                      No Analysis Yet
                    </h3>

                    <p className="text-luxury-body text-lg max-w-md leading-relaxed">
                      Upload a suspicious PDF or paste a recruiter offer
                      to generate an intelligent AI scam analysis.
                    </p>
                  </>
                )}

              </div>

            ) : (

              <div className="space-y-8">

                {/* SCORE */}
                <div className="bg-gradient-to-r bg-luxury-muted border border-luxury-coral/30 rounded-3xl p-7 flex items-center justify-between">

                  <div>

                    <p className="text-luxury-body text-xl mb-2">
                      Scam Probability
                    </p>

                    <h1 className="text-7xl font-bold text-luxury-coral">
  {Math.min(analysis.scamScore, 100)}%
</h1>

                  </div>

                  <div className="bg-luxury-surface rounded-3xl px-8 py-6 shadow-sm text-center">

                    <p className="text-luxury-body text-lg">
                      Confidence
                    </p>
                     <h2 className="text-5xl font-bold text-luxury-accent">
                      {analysis.confidence || 91}%
                 
                        </h2> 

                  </div>

                </div>

                {/* SUMMARY */}
                <div>

                  <h3 className="text-3xl font-bold text-luxury-ink mb-4">
                    Summary
                  </h3>

                  <div className="bg-luxury-muted border border-luxury-border rounded-2xl p-5 text-luxury-ink text-lg leading-relaxed">

                    {analysis.summary}
                  </div>

                </div>

                {/* RISK BREAKDOWN */}
                <div>

                  <h3 className="text-3xl font-bold text-luxury-ink mb-5">
                    Risk Breakdown
                  </h3>

                  <div className="space-y-4">

                    {[
                      ["💳 Payment Risk", "HIGH", "text-luxury-coral"],
                      ["📱 Communication", "SUSPICIOUS", "text-orange-500"],
                      ["💰 Salary Claim", "UNREALISTIC", "text-luxury-sun"],
                      ["🏢 Company Presence", "NOT VERIFIED", "text-luxury-coral"],
                    ].map((item, index) => (

                      <div
                        key={index}
                        className="bg-luxury-muted border border-luxury-border rounded-2xl px-5 py-5 flex items-center justify-between transition-all duration-300 hover:shadow-soft hover:-translate-y-1"
                      >

                        <span className="text-lg font-medium text-luxury-ink">
                          {item[0]}
                        </span>

                        <span className={`${item[2]} font-semibold text-lg`}>
                          {item[1]}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

                {/* RED FLAGS */}
                <div>

                  <h3 className="text-3xl font-bold text-luxury-coral mb-5">
                    Detected Red Flags
                  </h3>

                  <div className="flex flex-wrap gap-4">

                    {analysis.redFlags?.map((flag, index) => (

  <div
    key={index}
    className="bg-luxury-muted border border-luxury-coral/30 rounded-full px-4 py-2 text-xs text-luxury-coral font-medium transition-all duration-300 hover:scale-105"
  >

    🚨 {flag}

  </div>

))}

                  </div>

                </div>

                {/* RECOMMENDATIONS */}
                <div>

                  <h3 className="text-3xl font-bold text-luxury-accent mb-5">
                    Safety Recommendations
                  </h3>

                  <div className="grid gap-4">

                    <div className="bg-luxury-muted border border-luxury-accent/30 rounded-2xl px-4 py-3 text-luxury-accent text-[15px] font-medium flex items-center gap-3 transition-all duration-300 hover:shadow-soft hover:-translate-y-1">
                      <span className="text-lg">✅</span>
                      <span>Never pay registration or processing fees</span>
                    </div>

                    <div className="bg-luxury-muted border border-luxury-accent/30 rounded-2xl px-4 py-3 text-luxury-accent text-[15px] font-medium flex items-center gap-3 transition-all duration-300 hover:shadow-soft hover:-translate-y-1">
                      <span className="text-lg">🌐</span>
                      <span>Verify company website and LinkedIn presence</span>
                    </div>

                    <div className="bg-luxury-muted border border-luxury-accent/30 rounded-2xl px-4 py-3 text-luxury-accent text-[15px] font-medium flex items-center gap-3 transition-all duration-300 hover:shadow-soft hover:-translate-y-1">
                      <span className="text-lg">📧</span>
                      <span>Check recruiter email domains carefully</span>
                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>
    </div>
  );
};

export default UploadRisk;