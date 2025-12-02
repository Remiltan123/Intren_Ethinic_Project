// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css"; // make sure path is correct

export default function Dashboard() {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // For now, simple action — replace with navigation or search logic
    console.log("Search submitted:", query);
    // Example: navigate to /search?q=... (if you implement route)
    // navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-inner">
        {/* Top title (optional) */}
        <h1 className="dashboard-title">Welcome to your Dashboard</h1>
        <p className="dashboard-subtitle">
          Search for topics, interview questions, or subjects.
        </p>

        {/* SEARCH BAR (W3 style) */}
        <form className="w3-search-wrapper" onSubmit={handleSubmit} role="search">
          <input
            type="search"
            className="w3-search-input"
            placeholder="Search topics, questions, subjects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search topics"
          />
          <button className="w3-search-btn" type="submit" aria-label="Search">
            {/* Font Awesome icon (ensure fontawesome is loaded) */}
            <i className="fas fa-search" aria-hidden="true"></i>
          </button>
        </form>

        {/* Example content area below */}
        <div className="dashboard-content">

        </div>
      </div>
    </div>
  );
}
