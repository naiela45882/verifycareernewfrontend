import React, { useEffect, useState } from "react";
import { useAuthedFetch } from "../hooks/useAuthedFetch";

const Dashboard = () => {
  const authedFetch = useAuthedFetch();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH HISTORY
  // =========================
  const fetchHistory = async () => {
    try {
      const res = await authedFetch("/api/upload/history");

      const data = await res.json();

      console.log("HISTORY:", data);

      if (data.success) {
        setHistory(data.history);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-luxury-bg p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-luxury-ink">
          Dashboard
        </h1>

        <p className="text-luxury-body mt-2">
          View your previous scam analysis reports
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-lg">Loading...</p>
      ) : history.length === 0 ? (

        // EMPTY STATE
        <div className="bg-luxury-surface rounded-xl shadow p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">
            No scans yet
          </h2>

          <p className="text-luxury-body">
            Upload and analyze your first job offer
          </p>
        </div>

      ) : (

        // HISTORY CARDS
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {history.map((item) => (

            <div
              key={item._id}
              className="bg-luxury-surface rounded-2xl shadow-soft p-6 hover:shadow-xl transition"
            >

              {/* SCORE */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Scam Risk
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-luxury-on-accent text-sm ${
                    item.response?.scamScore >= 70
                      ? "bg-luxury-coral"
                      : item.response?.scamScore >= 40
                      ? "bg-luxury-sun"
                      : "bg-luxury-accent"
                  }`}
                >
                  {item.response?.scamScore || 0}%
                </span>
              </div>

              {/* SUMMARY */}
              <p className="text-luxury-ink mb-4">
                {item.response?.summary || "No summary available"}
              </p>

              {/* RED FLAGS */}
              {item.response?.redFlags?.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-luxury-coral mb-1">
                    Red Flags:
                  </h3>

                  <ul className="list-disc ml-5 text-sm text-luxury-ink">
                    {item.response.redFlags.map((flag, index) => (
                      <li key={index}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* DATE */}
              <div className="text-sm text-luxury-caption mt-4">
                {new Date(item.createdAt).toLocaleString()}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;