// src/pages/Dashboard.jsx
import React, { useState } from "react";
import "../styles/dashboard.css";
import bgImg from "../assets/dashboard-bg.jpeg";

// ✅ THEME
import { useTheme } from "../context/ThemeContext";
import "../pages/themeButton.css"; // same css used in Home

export default function Dashboard() {
  const { toggleTheme } = useTheme();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  async function handleSubmit(e) {
    e && e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");
    setShowAnswer(false);

    try {
      const res = await fetch("http://localhost:5000/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Server returned ${res.status}: ${txt}`);
      }

      const data = await res.json();
      setAnswer(data.answer || "No answer returned.");
      setShowAnswer(true);
    } catch (err) {
      console.error(err);
      setError("Server error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-page">
      {/* 🌙 THEME TOGGLE – SAME AS HOME (TOP LEFT) */}
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        <div className="icon-circle">
          <div className="inner-half" />
        </div>
      </button>

      <div className="dashboard-overlay" />

      <div className="dashboard-inner">
        {/* HEADING */}
        <div className="doubt-heading">
          <h1>If you have any Questions, ask me</h1>
        </div>

        {/* SEARCH */}
        <form
          className="dashboard-search-wrapper"
          onSubmit={handleSubmit}
          role="search"
        >
          <div className="search-input-wrap">
            <input
              type="search"
              className="dashboard-search-input white"
              placeholder="Search topics, questions, subjects..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            className="dashboard-search-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </form>

        {error && <div className="dashboard-error">{error}</div>}

        {/* QUICK HELP */}
        <div className="dashboard-extra">
          <div className="extra-card">
            <h3>Quick help</h3>
            <ul>
              <li>
                Ask questions like:{" "}
                <em>"Explain Java OOP with example"</em>
              </li>
              <li>
                Try short queries: <em>"arrays vs lists"</em>
              </li>
              <li>
                Use keywords: <em>"java loops past papers"</em>
              </li>
            </ul>
          </div>
        </div>

        {/* ANSWER */}
        <div className="dashboard-result-area">
          {showAnswer && (
            <div className="dashboard-answer-card">
              <button
                className="close-answer-btn"
                onClick={() => setShowAnswer(false)}
              >
                ×
              </button>
              <div
                className="dashboard-answer-text"
                dangerouslySetInnerHTML={{
                  __html: answer.replace(/\n/g, "<br/>"),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
