/** Step pipelines for full-screen backend loading overlays */
export const LOADING_PIPELINES = {
  import: [
    { label: "Reading your document", progress: 18 },
    { label: "Extracting text & layout", progress: 40 },
    { label: "Structuring experience & skills", progress: 62 },
    { label: "Mapping sections for editing", progress: 84 },
  ],
  score: [
    { label: "Scanning ATS compatibility", progress: 22 },
    { label: "Matching keywords & skills", progress: 48 },
    { label: "Checking formatting & readability", progress: 72 },
    { label: "Computing your score", progress: 91 },
  ],
  save: [
    { label: "Saving your resume", progress: 35 },
    { label: "Syncing to your account", progress: 68 },
    { label: "Securing your draft", progress: 88 },
  ],
  process: [
    { label: "Saving your resume", progress: 28 },
    { label: "Running ATS analysis", progress: 58 },
    { label: "Building your score report", progress: 86 },
  ],
  analyze: [
    { label: "Parsing resume structure", progress: 20 },
    { label: "Evaluating ATS fit", progress: 45 },
    { label: "Finding skill gaps", progress: 70 },
    { label: "Drafting recommendations", progress: 90 },
  ],
  tailor: [
    { label: "Reading the job description", progress: 22 },
    { label: "Matching your experience", progress: 48 },
    { label: "Rewriting impact bullets", progress: 74 },
    { label: "Polishing tailored copy", progress: 91 },
  ],
  generic: [
    { label: "Processing", progress: 40 },
    { label: "Almost there", progress: 85 },
  ],
};

export const LOADING_TITLES = {
  import: "Importing your resume",
  score: "Calculating ATS score",
  save: "Saving your resume",
  process: "Finalizing your resume",
  analyze: "Analyzing your resume",
  tailor: "Tailoring to the role",
  generic: "Working on it",
};

export const LOADING_SUBTITLES = {
  import: "Our engine is extracting and structuring your content.",
  score: "AI and rules-based checks are evaluating recruiter readiness.",
  save: "Your structured resume is being stored securely.",
  process: "Saving your work and running ATS scoring.",
  analyze: "Deep feedback on fit, skills, and formatting.",
  tailor: "Aligning your resume language to this posting.",
  generic: "This usually takes a few seconds.",
};
