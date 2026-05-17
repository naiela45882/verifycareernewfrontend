import React, { useEffect, useState } from "react";
import { API_URL } from "./lib/api";

const CommunityForum = () => {

  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState("Internship Scam");

  const [experience, setExperience] =
    useState("");

  const [anonymous, setAnonymous] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [successPopup, setSuccessPopup] =
    useState(false);

  const [errorPopup, setErrorPopup] =
    useState(false);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/community/all`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(
            data.map((p) => ({
              ...p,
              time: p.createdAt
                ? new Date(p.createdAt).toLocaleDateString()
                : "Recently",
              user: p.anonymous ? "Anonymous User" : p.user || "Community member",
            }))
          );
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async () => {

    if (!title || !experience) {
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(`${API_URL}/api/community/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          content: experience,
          anonymous,
        }),
      });
      const created = await response.json();

      setPosts((prev) => [
        {
          ...created,
          time: "Just now",
          user: anonymous ? "Anonymous User" : "You",
        },
        ...prev,
      ]);

      setSuccessPopup(true);

      setTimeout(() => {
        setSuccessPopup(false);
      }, 2500);

      setTitle("");
      setExperience("");

    } catch (error) {

      console.log(error);

      setErrorPopup(true);

      setTimeout(() => {
        setErrorPopup(false);
      }, 2500);

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
    <div className="mx-auto max-w-7xl">

          {/* PAGE HEADER */}
          <div className="mb-10">

            <div className="flex items-center gap-4 mb-4">

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-luxury-accent to-luxury-accent-hover flex items-center justify-center text-luxury-on-accent text-3xl shadow-lg">

                👥

              </div>

              <div>

                <h1 className="text-5xl font-bold text-luxury-ink">

                  Community Forum

                </h1>

                <p className="text-luxury-body text-lg mt-1">

                  Share scam experiences and help others stay protected

                </p>

              </div>

            </div>

          </div>

          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start">

            {/* LEFT PANEL */}
            <div className="bg-luxury-surface rounded-[28px] shadow-soft border border-luxury-border p-6 sticky top-24">

              {/* HEADER */}
              <div className="mb-6">

                <div className="flex items-center gap-3 mb-3">

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-luxury-coral to-luxury-accent flex items-center justify-center text-luxury-on-accent text-xl shadow-soft">

                    ✍

                  </div>

                  <div>

                    <h2 className="text-2xl font-bold text-luxury-ink">

                      Share Experience

                    </h2>

                    <p className="text-luxury-body text-sm">

                      Help the community stay safe

                    </p>

                  </div>

                </div>

              </div>

              {/* TITLE */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-luxury-ink mb-2">

                  Post Title

                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter a short title..."
                  className="w-full border-2 border-luxury-border rounded-2xl px-4 py-3 outline-none focus:border-luxury-accent transition"
                />

              </div>

              {/* CATEGORY */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-luxury-ink mb-2">

                  Scam Category

                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full border-2 border-luxury-border rounded-2xl px-4 py-3 outline-none focus:border-luxury-accent transition bg-luxury-surface"
                >

                  <option>
                    Internship Scam
                  </option>

                  <option>
                    Job Offer Scam
                  </option>

                  <option>
                    Identity Theft
                  </option>

                  <option>
                    Fake HR Scam
                  </option>

                  <option>
                    Telegram Scam
                  </option>

                </select>

              </div>

              {/* DESCRIPTION */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-luxury-ink mb-2">

                  Your Experience

                </label>

                <textarea
                  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value)
                  }
                  placeholder="Describe what happened..."
                  className="w-full h-[180px] border-2 border-luxury-border rounded-3xl p-4 outline-none resize-none focus:border-luxury-accent transition"
                />

              </div>

              {/* TOGGLE */}
              <div className="flex items-center justify-between bg-luxury-muted border border-luxury-border rounded-2xl px-4 py-3 mb-6">

                <div>

                  <h3 className="font-semibold text-luxury-ink">

                    Post Anonymously

                  </h3>

                  <p className="text-sm text-luxury-body">

                    Hide your identity from others

                  </p>

                </div>

                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) =>
                    setAnonymous(e.target.checked)
                  }
                  className="w-5 h-5 accent-luxury-accent"
                />

              </div>

              {/* WARNING */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6">

                <p className="text-sm text-orange-700 leading-relaxed">

                  ⚠ Please avoid sharing personal details like phone numbers, Aadhaar, bank details, or passwords.

                </p>

              </div>

              {/* BUTTON */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3.5 rounded-2xl text-luxury-on-accent text-lg font-semibold shadow-lg transition ${
                  loading
                    ? "bg-luxury-caption cursor-not-allowed"
                    : "bg-gradient-to-r from-luxury-accent to-luxury-accent-hover hover:scale-[1.02]"
                }`}
              >

                {loading ? (

                  <div className="flex items-center justify-center gap-3">

                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                    Posting...

                  </div>

                ) : (

                  "Submit Report"

                )}

              </button>

            </div>

            {/* RIGHT PANEL */}
            <div>

              {/* TRENDING */}
              <div className="bg-luxury-surface rounded-[28px] shadow-soft border border-luxury-border p-6 mb-8">

                <div className="flex items-center justify-between mb-5">

                  <h2 className="text-2xl font-bold text-luxury-ink">

                    Trending Scam Types

                  </h2>

                  <span className="text-sm text-luxury-accent font-semibold">

                    Live Community Alerts

                  </span>

                </div>

                <div className="flex flex-wrap gap-3">

                  <div className="px-4 py-2 rounded-full bg-luxury-muted text-luxury-coral font-medium">

                    Telegram HR Scam

                  </div>

                  <div className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-medium">

                    Registration Fee Fraud

                  </div>

                  <div className="px-4 py-2 rounded-full bg-luxury-muted text-luxury-accent font-medium">

                    Fake Internship

                  </div>

                  <div className="px-4 py-2 rounded-full bg-luxury-muted text-luxury-accent font-medium">

                    Crypto Salary Scam

                  </div>

                </div>

              </div>

              {/* POSTS */}
              <div className="space-y-6">

                {posts.map((post, index) => (

                  <div
                    key={index}
                    className="bg-luxury-surface rounded-[28px] shadow-soft border border-luxury-border p-6 hover:shadow-xl transition duration-300"
                  >

                    {/* TOP */}
                    <div className="flex items-start justify-between mb-5">

                      <div>

                        <div className="flex flex-wrap gap-3 mb-3">

                          <div className="px-3 py-1 rounded-full bg-luxury-muted text-luxury-accent text-sm font-medium">

                            {post.category}

                          </div>

                          <div className="px-3 py-1 rounded-full bg-luxury-muted text-luxury-coral text-sm font-medium">

                            {post.severity || "Medium Risk"}

                          </div>

                        </div>

                        <h2 className="text-2xl font-bold text-luxury-ink mb-2">

                          {post.title}

                        </h2>

                        <p className="text-luxury-body text-sm">

                          Posted by{" "}

                          <span className="font-semibold text-luxury-ink">

                            {post.user || "Anonymous User"}

                          </span>

                          {" • "}

                          {post.time || "Recently"}

                        </p>

                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-luxury-coral to-luxury-accent flex items-center justify-center text-luxury-on-accent text-2xl shadow-soft">

                        🚨

                      </div>

                    </div>

                    {/* CONTENT */}
                    <div className="bg-luxury-muted rounded-2xl p-5 border border-luxury-border mb-5">

                      <p className="text-luxury-ink leading-relaxed">

                        {post.content}

                      </p>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center justify-between">

                      <button className="px-5 py-2.5 rounded-xl bg-luxury-muted hover:bg-luxury-border text-luxury-accent font-medium transition">

                        👍 Helpful ({post.helpful || 0})

                      </button>

                      <button className="px-5 py-2.5 rounded-xl bg-luxury-coral hover:bg-luxury-coral text-luxury-on-accent font-medium transition">

                        Report Post

                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

    </div>

      {/* SUCCESS POPUP */}
      {successPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-luxury-surface rounded-[32px] p-8 w-[340px] shadow-2xl text-center">

            <div className="w-20 h-20 rounded-full bg-luxury-muted flex items-center justify-center mx-auto mb-5">

              <span className="text-4xl">
                ✅
              </span>

            </div>

            <h2 className="text-3xl font-bold text-luxury-ink mb-2">

              Report Submitted

            </h2>

            <p className="text-luxury-body leading-relaxed">

              Your scam report has been shared with the community.

            </p>

          </div>

        </div>
      )}

      {/* ERROR POPUP */}
      {errorPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-luxury-surface rounded-[32px] p-8 w-[340px] shadow-2xl text-center">

            <div className="w-20 h-20 rounded-full bg-luxury-muted flex items-center justify-center mx-auto mb-5">

              <span className="text-4xl">
                ❌
              </span>

            </div>

            <h2 className="text-3xl font-bold text-luxury-ink mb-2">

              Submission Failed

            </h2>

            <p className="text-luxury-body leading-relaxed">

              Please try again later.

            </p>

          </div>

        </div>
      )}

    </>
  );
};

export default CommunityForum; 