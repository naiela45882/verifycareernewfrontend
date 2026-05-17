import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useResume } from "./hooks/useResume";

const ResumeAnalyzer = () => {
  const {
    resume: storedResume,
    hasResume,
    loading: resumeLoading,
    uploadResume,
    analyzeResume,
  } = useResume();

  const [resume, setResume] = useState(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [jdSource, setJdSource] =
    useState("text");

  // =========================
  // ANALYZE RESUME
  // =========================
  const handleAnalyze = async () => {
    if (!resume && !hasResume) {
      alert("Upload a resume");
      return;
    }

    if (jdSource === "text" && !jobDescription) {
      alert("Please paste job description");
      return;
    }

    try {
      setLoading(true);
      const data = await analyzeResume(jobDescription, resume || null);
      setResult({
        atsScore: data.atsScore,
        matchScore: data.matchScore,
        matchedSkills: data.matchedSkills,
        missingSkills: data.missingSkills,
        atsBreakdown: data.atsBreakdown,
        weaknesses: data.weaknesses,
        suggestions: data.suggestions,
        aiAnalysis: data.aiAnalysis,
      });
    } catch (error) {
      console.error(error);
      alert("Resume analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const handleStoredUpload = async (file) => {
    if (!file) return;
    setResume(file);
    try {
      await uploadResume(file);
    } catch {
      alert("Upload failed");
    }
  };

  // =========================
  // SKILL BADGE
  // =========================
  const SkillBadge = ({
    skill,
    color,
  }) => (

    <span
      className={`px-4 py-2 rounded-full text-sm font-medium inline-block ${color}`}
    >
      {skill}
    </span>

  );

  return (

    <>
      {/* LOADING OVERLAY */}
      {loading && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">

          <div className="bg-luxury-surface p-10 rounded-[32px] shadow-2xl text-center w-[400px]">

            <div className="w-16 h-16 border-4 border-luxury-accent border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

            <h3 className="text-3xl font-bold text-luxury-ink">
              Analyzing Resume
            </h3>

            <p className="text-luxury-body mt-3 text-lg">
              Gemini AI is processing your resume...
            </p>

          </div>

        </div>

      )}

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-luxury-ink mb-3">
            Resume Analyzer
          </h1>

          <p className="text-luxury-body text-lg">
            AI-powered resume and ATS compatibility checker
          </p>

        </div>

        {hasResume && !resumeLoading && (
          <p className="mb-6 rounded-lg border border-luxury-accent/25 bg-luxury-accent/5 px-4 py-3 text-[13px] text-luxury-body">
            Using stored resume:{" "}
            <span className="font-medium text-luxury-ink">
              {storedResume?.fileName || "resume.pdf"}
            </span>
            . Upload a new file below to replace it, or{" "}
            <Link to="/dashboard" className="text-luxury-accent hover:underline">
              manage on dashboard
            </Link>
            .
          </p>
        )}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT PANEL */}
          <div className="bg-luxury-surface p-8 rounded-[32px] shadow-lg border border-luxury-border">

            <h2 className="text-4xl font-bold text-luxury-ink mb-8">
              Upload Resume
            </h2>

            {/* RESUME */}
            <div className="mb-8">

              <label className="block text-lg font-semibold text-luxury-ink mb-3">
                Resume PDF
              </label>

              <label className="flex items-center justify-center w-full border-2 border-dashed border-luxury-accent/40 bg-luxury-muted hover:bg-luxury-muted transition rounded-3xl p-8 cursor-pointer">

                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={(e) =>
                    handleStoredUpload(e.target.files[0])
                  }
                />

                <div className="text-center">

                  <p className="text-luxury-accent font-semibold text-2xl">
                    {resume
                      ? resume.name
                      : hasResume
                        ? storedResume?.fileName || "Stored resume ready"
                        : "Click to upload resume"}
                  </p>

                  <p className="text-luxury-body mt-2">
                    PDF format only
                  </p>

                </div>

              </label>

            </div>

            {/* JD SOURCE */}
            <div className="mb-6">

              <label className="block text-lg font-semibold text-luxury-ink mb-3">
                Job Description Source
              </label>

              <select
                value={jdSource}
                onChange={(e) =>
                  setJdSource(
                    e.target.value
                  )
                }
                className="w-full border border-luxury-border rounded-2xl p-4 outline-none"
              >

                <option value="text">
                  Paste Text
                </option>

                <option value="pdf">
                  Upload PDF
                </option>

              </select>

            </div>

            {/* TEXT MODE */}
            {jdSource === "text" && (

              <div className="mb-8">

                <label className="block text-lg font-semibold text-luxury-ink mb-3">
                  Paste Job Description
                </label>

                <textarea
                  placeholder="Paste job description here..."
                  className="w-full border border-luxury-border rounded-3xl p-5 h-64 text-luxury-ink focus:border-luxury-accent focus:ring-2 focus:ring-luxury-accent/20 outline-none"
                  value={jobDescription}
                  onChange={(e) =>
                    setJobDescription(
                      e.target.value
                    )
                  }
                />

              </div>

            )}

            {/* PDF MODE */}
            {jdSource === "pdf" && (

              <div className="mb-8">

                <label className="flex items-center justify-center w-full border-2 border-dashed border-luxury-accent/40 bg-luxury-muted hover:bg-luxury-muted transition rounded-3xl p-8 cursor-pointer">

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                  />

                  <div className="text-center">

                    <p className="text-luxury-accent font-semibold text-xl">
                      Upload JD PDF
                    </p>

                    <p className="text-luxury-body mt-2">
                      PDF only
                    </p>

                  </div>

                </label>

              </div>

            )}

            {/* BUTTON */}
            <button
              onClick={
                handleAnalyze
              }
              disabled={loading}
              className={`w-full py-5 rounded-3xl font-semibold text-lg shadow-soft flex items-center justify-center gap-3 transition-all duration-300

              ${loading
                ? "bg-luxury-caption cursor-not-allowed"
                : "bg-gradient-to-r from-luxury-accent to-luxury-accent-hover hover:scale-[1.02] text-luxury-on-accent"
              }`}
            >

              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                  Analyzing with Gemini AI...
                </>
              ) : (
                "Analyze Resume"
              )}

            </button>

          </div>

          {/* RIGHT PANEL */}
          <div className="bg-luxury-surface p-8 rounded-[32px] shadow-lg border border-luxury-border">

            <h2 className="text-4xl font-bold mb-8 text-luxury-ink">
              Analysis Result
            </h2>

            {!result ? (

              <div className="h-[600px] flex flex-col items-center justify-center text-center">

                <div className="text-8xl mb-6">
                  📄
                </div>

                <h3 className="text-3xl font-bold text-luxury-ink mb-3">
                  No Resume Analysis Yet
                </h3>

                <p className="text-luxury-body text-lg max-w-sm">
                  Upload a resume and job description to begin AI analysis
                </p>

              </div>

            ) : (

              <div className="space-y-8">

                {/* SCORES */}
                <div className="grid grid-cols-2 gap-5">

                  <div className="bg-gradient-to-r from-luxury-muted to-luxury-muted p-6 rounded-3xl">

                    <p className="text-luxury-body mb-2">
                      ATS Score
                    </p>

                    <h3 className="text-5xl font-bold text-luxury-accent">
                      {result.atsScore}%
                    </h3>

                  </div>

                  <div className="bg-gradient-to-r from-luxury-muted to-luxury-muted p-6 rounded-3xl">

                    <p className="text-luxury-body mb-2">
                      Match Score
                    </p>

                    <h3 className="text-5xl font-bold text-luxury-accent">
                      {result.matchScore}%
                    </h3>

                  </div>

                </div>

                {/* ATS BREAKDOWN */}
                <div className="bg-orange-50 rounded-3xl p-6">

                  <h3 className="text-2xl font-bold text-orange-500 mb-4">
                    ATS Breakdown
                  </h3>

                  <ul className="space-y-2 text-luxury-ink">

                    {result.atsBreakdown?.map(
                      (
                        item,
                        index
                      ) => (
                        <li key={index}>
                          • {item}
                        </li>
                      )
                    )}

                  </ul>

                </div>

                {/* MATCHED */}
                <div>

                  <h3 className="text-2xl font-bold text-luxury-accent mb-4">
                    Matched Skills
                  </h3>

                  <div className="flex flex-wrap gap-3">

                    {result.matchedSkills?.map(
                      (
                        skill,
                        index
                      ) => (
                        <SkillBadge
                          key={index}
                          skill={skill}
                          color="bg-luxury-muted text-luxury-accent"
                        />
                      )
                    )}

                  </div>

                </div>

                {/* MISSING */}
                <div>

                  <h3 className="text-2xl font-bold text-luxury-coral mb-4">
                    Missing Skills
                  </h3>

                  <div className="flex flex-wrap gap-3">

                    {result.missingSkills?.map(
                      (
                        skill,
                        index
                      ) => (
                        <SkillBadge
                          key={index}
                          skill={skill}
                          color="bg-luxury-muted text-luxury-coral"
                        />
                      )
                    )}

                  </div>

                </div>

                {/* WEAKNESSES */}
                <div className="bg-luxury-muted rounded-3xl p-6">

                  <h3 className="text-2xl font-bold text-luxury-accent mb-4">
                    Resume Weaknesses
                  </h3>

                  <ul className="space-y-3 text-luxury-ink">

                    {result.weaknesses
                      ?.slice(0, 4)
                      .map(
                        (
                          item,
                          index
                        ) => (
                          <li key={index}>
                            • {item}
                          </li>
                        )
                      )}

                  </ul>

                </div>

                {/* AI ANALYSIS */}
                <div className="space-y-5">

                  <h3 className="text-3xl font-bold text-luxury-accent">
                    AI Career Analysis
                  </h3>

                  {/* SUMMARY */}
                  <div className="bg-luxury-muted rounded-3xl p-6">

                    <h4 className="font-bold text-luxury-accent mb-3 text-xl">
                      Professional Summary
                    </h4>

                    <p className="text-luxury-ink leading-8">
                      {
                        result.aiAnalysis?.professionalSummary
                          ?.replace(/\*\*/g, "")
                          ?.split(". ")
                          .slice(0, 3)
                          .join(". ")
                      }
                    </p>

                  </div>

                  {/* STRENGTHS */}
                  <div className="bg-luxury-muted rounded-3xl p-6">

                    <h4 className="font-bold text-luxury-accent mb-4 text-xl">
                      Strengths
                    </h4>

                    <div className="flex flex-wrap gap-3">

                      {result.aiAnalysis?.strengths
                        ?.slice(0, 4)
                        .map(
                          (
                            item,
                            index
                          ) => (

                            <div
                              key={index}
                              className="bg-luxury-surface px-4 py-3 rounded-full text-sm text-luxury-accent border border-luxury-accent/30"
                            >
                              {item.replace(/\*\*/g, "")}
                            </div>

                          )
                        )}

                    </div>

                  </div>

                  {/* IMPROVEMENTS */}
                  <div className="bg-luxury-muted rounded-3xl p-6">

                    <h4 className="font-bold text-luxury-coral mb-4 text-xl">
                      Improvements
                    </h4>

                    <div className="space-y-3">

                      {result.aiAnalysis?.improvements
                        ?.slice(0, 3)
                        .map(
                          (
                            item,
                            index
                          ) => (

                            <div
                              key={index}
                              className="bg-luxury-surface p-4 rounded-2xl border border-luxury-coral/30 text-luxury-ink"
                            >
                              • {item.replace(/\*\*/g, "")}
                            </div>

                          )
                        )}

                    </div>

                  </div>

                  {/* FINAL */}
                  <div className="bg-luxury-muted rounded-3xl p-6">

                    <h4 className="font-bold text-luxury-sun mb-3 text-xl">
                      Final AI Advice
                    </h4>

                    <p className="text-luxury-ink leading-8">
                      {
                        result.aiAnalysis?.finalAdvice
                          ?.replace(/\*\*/g, "")
                          ?.split(". ")
                          .slice(0, 3)
                          .join(". ")
                      }
                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </>
  );
};

export default ResumeAnalyzer;