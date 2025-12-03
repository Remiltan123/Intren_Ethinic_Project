// src/pages/JavaScriptPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCompanyQuestions } from "../services/companyQuestions";
import "../styles/javascript.css";

// SAME DISTRICT + COMPANY MAPPING (matching admin.jsx)
const COMPANIES_BY_DISTRICT = {
  Colombo: [
    { id: "wso2", name: "WSO2", address: "20, Palm Grove, Colombo 03" },
    { id: "virtusa", name: "Virtusa", address: "752, Dr Danister De Silva Mawatha, Colombo 09" },
    { id: "syscolabs", name: "Sysco LABS", address: "55A, Dharmapala Mawatha, Colombo 03" },
    { id: "ifs", name: "IFS", address: "Orion Towers 1, Colombo 09" },
    { id: "ninetyninex", name: "99X", address: "Nawam Mawatha, Colombo 02" },
    { id: "hsenid", name: "hSenid", address: "No. 32, Castle Street, Colombo 08" },
  ],
  Jaffna: [
    { id: "loncey", name: "Loncey Tech (Pvt) Ltd", address: "259 Temple Rd, Jaffna 40000" },
    { id: "speedit", name: "Speed IT Net", address: "Jaffna" },
    { id: "appslanka", name: "Apps Lanka Software Solutions", address: "No.40 Palaly Road, Jaffna" },
    { id: "3axislabs", name: "3axislabs", address: "Jaffna" },
    { id: "technovate", name: "Technovate", address: "Jaffna" },
  ],
  Kandy: [
    { id: "glenzsoft", name: "Glenzsoft", address: "255/21, Dr C D L Fernando Mawatha, Kandy" },
    { id: "splendorport", name: "SplendorPort", address: "Kandy" },
    { id: "kitsweb", name: "Kits Web Creations", address: "Kandy" },
    { id: "ontech", name: "Ontech IT Solutions", address: "Kandy" },
  ],
  Galle: [
    { id: "sanmark", name: "Sanmark Solutions", address: "Galle" },
    { id: "jetapp", name: "Jetapp", address: "Galle" },
    { id: "galleit", name: "Galle IT Solutions", address: "34 Talbot Town, Galle" },
    { id: "webnifix", name: "Webnifix", address: "Galle" },
  ],
};

const DISTRICTS = Object.keys(COMPANIES_BY_DISTRICT);

export default function JavaScriptPage({ openSignup }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // YES/NO flow
  const [started, setStarted] = useState(false);

  // District & Company
  const [activeDistrict, setActiveDistrict] = useState("Colombo");
  const [activeCompanyId, setActiveCompanyId] = useState(COMPANIES_BY_DISTRICT["Colombo"][0]?.id);

  // Questions
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const companiesInDistrict = useMemo(
    () => COMPANIES_BY_DISTRICT[activeDistrict] || [],
    [activeDistrict]
  );

  const selectedCompany = useMemo(() => {
    return (
      companiesInDistrict.find((c) => c.id === activeCompanyId) ||
      companiesInDistrict[0] ||
      null
    );
  }, [companiesInDistrict, activeCompanyId]);

  // Reset when login state changes
  useEffect(() => {
    setStarted(false);
    setQuestions([]);
    setLoading(false);
  }, [user]);

  // Fetch JS questions from Firestore
  useEffect(() => {
    if (!user || !started || !selectedCompany) return;

    async function load() {
      setLoading(true);
      try {
        const data = await getCompanyQuestions("js", activeDistrict, selectedCompany.id);
        setQuestions(data);
      } catch (err) {
        console.error("Failed to load JS questions", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user, started, activeDistrict, selectedCompany]);

  function handleNo() {
    navigate("/dashboard");
  }

  function handleChangeDistrict(d) {
    setActiveDistrict(d);
    const firstCompany = COMPANIES_BY_DISTRICT[d]?.[0];
    setActiveCompanyId(firstCompany ? firstCompany.id : "");
  }

  return (
    <div className="javascript-page">
      {/* HERO */}
      <section className="javascript-hero">
        <div className="javascript-hero-overlay" />
        <div className="javascript-hero-content">
          <h1>Master JavaScript for modern web apps</h1>
          <p>
            Learn how JavaScript powers frontend UIs, handles async operations,
            and runs backend services with Node.js.
          </p>

          <div className="javascript-badge-row">
            <span className="javascript-badge">Language of the browser</span>
            <span className="javascript-badge">Async &amp; Promises</span>
            <span className="javascript-badge">Full-stack friendly</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="javascript-main">
        {/* BASICS */}
        <section className="javascript-section">
          <h2>JavaScript basics in a nutshell</h2>
          <p className="javascript-section-intro">
            JavaScript runs everywhere — browsers, servers, mobile apps — making it one of the most important languages today.
          </p>

          <div className="javascript-grid">
            <div className="javascript-card">
              <h3>How JS runs</h3>
              <ul>
                <li>Runs in browser engines (V8, SpiderMonkey)</li>
                <li>Event loop & asynchronous execution</li>
                <li>Manipulates DOM & browser APIs</li>
              </ul>
            </div>

            <div className="javascript-card">
              <h3>Core concepts</h3>
              <ul>
                <li>Variables & scope</li>
                <li>Functions, closures & hoisting</li>
                <li>Arrow functions, callbacks</li>
              </ul>
            </div>

            <div className="javascript-card">
              <h3>Async behaviour</h3>
              <ul>
                <li>Promises & async/await</li>
                <li>Event loop & microtasks</li>
                <li>fetch() for REST API calls</li>
              </ul>
            </div>

            <div className="javascript-card">
              <h3>Where it's used</h3>
              <ul>
                <li>Frontend frameworks (React, Vue, Angular)</li>
                <li>Backend APIs with Node.js</li>
                <li>Cross-platform mobile apps</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CODE EXAMPLE */}
        <section className="javascript-section">
          <h2>A tiny JavaScript example</h2>
          <p className="javascript-section-intro">
            This code fetches user data from an API and updates the page — common interview topic.
          </p>

          <div className="javascript-code-layout">
            <div className="javascript-code-card">
              <div className="javascript-code-header">
                <span className="javascript-dot red" />
                <span className="javascript-dot yellow" />
                <span className="javascript-dot green" />
                <span className="javascript-file-name">fetch-users.js</span>
              </div>

              <pre className="javascript-code-block">
{`async function loadUsers() {
  try {
    const res = await fetch("https://api.example.com/users");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
}

loadUsers();`}
              </pre>
            </div>

            <div className="javascript-code-explain">
              <h3>What this shows</h3>
              <ol>
                <li>Async API calls</li>
                <li>Awaiting promises</li>
                <li>Error handling</li>
                <li>How browsers run async JS</li>
              </ol>
            </div>
          </div>
        </section>

        {/* JAVASCRIPT CTA + QUESTIONS FLOW */}
        <section className="javascript-section javascript-cta-section">
          <div className="javascript-cta-box">
            {/* USER NOT LOGGED IN */}
            {!user && (
              <>
                <h3>Ready to practice JavaScript interview questions?</h3>
                <p>Sign up to unlock district-wise and company-based JS questions.</p>
                <button className="javascript-cta-btn" onClick={() => openSignup("signup")}>
                  Learn more &amp; sign up
                </button>
              </>
            )}

            {/* LOGGED IN BUT NOT STARTED */}
            {user && !started && (
              <>
                <h3>Ready to practice JavaScript interview questions?</h3>
                <p>We’ll show you real questions from Sri Lankan companies. Continue?</p>

                <div className="btn-row">
                  <div className="btn-row">
  <button
    className="javascript-btn-primary"
    onClick={() => setStarted(true)}
  >
    Yes
  </button>

  <button
    className="javascript-btn-dark"
    onClick={handleNo}
  >
    No
  </button>
</div>

                </div>
              </>
            )}

            {/* LOGGED IN + STARTED */}
            {user && started && (
              <div className="javascript-questions-flow">
                <h3>Practice JavaScript interview questions</h3>
                <p>Select district & company</p>

                {/* DISTRICT SELECT */}
                <div className="javascript-filter-row">
                  <label className="field-label">
                    District
                    <select
                      className="district-select"
                      value={activeDistrict}
                      onChange={(e) => handleChangeDistrict(e.target.value)}
                    >
                      {DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* COMPANY SELECT */}
                <div className="javascript-filter-row">
                  <p className="field-label">Company</p>
                  <div className="company-pill-row">
                    {companiesInDistrict.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className={
                          c.id === selectedCompany?.id
                            ? "company-pill company-pill--active"
                            : "company-pill"
                        }
                        onClick={() => setActiveCompanyId(c.id)}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* QUESTIONS LIST */}
                <div className="questions-section">
                  <h3>
                    {selectedCompany ? `${selectedCompany.name} – JavaScript questions` : "Questions"}
                  </h3>

                  {selectedCompany?.address && (
                    <p className="company-meta">{selectedCompany.address}</p>
                  )}

                  {loading && <p>Loading questions…</p>}

                  {!loading && questions.length === 0 && <p>No questions found.</p>}

                  {!loading &&
                    questions.map((item) => (
                      <article key={item.id} className="question-card">
                        <p className="q-label">
                          <strong>Q:</strong> {item.question}
                        </p>
                        <p className="a-label">
                          <strong>A:</strong> {item.answer}
                        </p>
                      </article>
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
