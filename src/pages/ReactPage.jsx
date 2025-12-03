// src/pages/ReactPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCompanyQuestions } from "../services/companyQuestions";
import "../styles/react.css";

// Same districts / companies pattern (sample data)
const COMPANIES_BY_DISTRICT = {
  Colombo: [
    { id: "wso2", name: "WSO2", address: "20, Palm Grove, Colombo 03" },
    { id: "virtusa", name: "Virtusa", address: "752, Dr Danister De Silva Mawatha, Colombo 09" },
    { id: "syscolabs", name: "Sysco LABS", address: "55A, Dharmapala Mawatha, Colombo 03" },
    { id: "ninetyninex", name: "99X", address: "Nawam Mawatha, Colombo 02" },
  ],
  Jaffna: [
    { id: "loncey", name: "Loncey Tech (Pvt) Ltd", address: "Jaffna" },
    { id: "3axislabs", name: "3axislabs", address: "Jaffna" },
  ],
  Kandy: [
    { id: "glenzsoft", name: "Glenzsoft", address: "Kandy" },
    { id: "splendorport", name: "SplendorPort", address: "Kandy" },
  ],
  Galle: [
    { id: "sanmark", name: "Sanmark Solutions", address: "Galle" },
    { id: "webnifix", name: "Webnifix", address: "Galle" },
  ],
};

const DISTRICTS = Object.keys(COMPANIES_BY_DISTRICT);

export default function ReactPage({ openSignup }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [started, setStarted] = useState(false);

  const [activeDistrict, setActiveDistrict] = useState("Colombo");
  const [activeCompanyId, setActiveCompanyId] = useState(
    COMPANIES_BY_DISTRICT["Colombo"][0]?.id || ""
  );

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const companiesInDistrict = useMemo(
    () => COMPANIES_BY_DISTRICT[activeDistrict] || [],
    [activeDistrict]
  );

  const selectedCompany = useMemo(
    () =>
      companiesInDistrict.find((c) => c.id === activeCompanyId) ||
      companiesInDistrict[0] ||
      null,
    [companiesInDistrict, activeCompanyId]
  );

  // login/logout aagumbodhu reset
  useEffect(() => {
    setStarted(false);
    setQuestions([]);
    setLoading(false);
  }, [user]);

  // YES press pannumbodhum, district/company maariyappo questions fetch
  useEffect(() => {
    if (!user || !started || !selectedCompany) return;

    async function load() {
      setLoading(true);
      try {
        const data = await getCompanyQuestions(
          "react",          // 🔥 stack id = "react"
          activeDistrict,
          selectedCompany.id
        );
        setQuestions(data);
      } catch (err) {
        console.error("Failed to load React questions:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user, started, activeDistrict, selectedCompany]);

  function handleChangeDistrict(d) {
    setActiveDistrict(d);
    const firstCompany = COMPANIES_BY_DISTRICT[d]?.[0] || null;
    setActiveCompanyId(firstCompany ? firstCompany.id : "");
  }

  function handleNo() {
    navigate("/dashboard");
  }

  return (
    <div className="react-page">
      {/* HERO */}
      <section className="react-hero">
        <div className="react-hero-overlay" />

        <div className="react-hero-content">
          <h1>Build interactive UIs with React</h1>

          <p>
            Learn how React uses components, props and state to build modern web
            apps. Understand the core ideas interviewers expect for frontend roles.
          </p>

          <div className="react-badge-row">
            <span className="react-badge">Components</span>
            <span className="react-badge">Hooks &amp; state</span>
            <span className="react-badge">Props &amp; reuse</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="react-main">
        {/* BASICS */}
        <section className="react-section">
          <h2>React basics in a nutshell</h2>
          <p className="react-section-intro">
            React is a JavaScript library for building user interfaces. It helps
            you build reusable components and manage complex UI state.
          </p>

          <div className="react-grid">
            <div className="react-card">
              <h3>Component model</h3>
              <ul>
                <li>UI is split into small, reusable components.</li>
                <li>Each component returns JSX (HTML-like syntax).</li>
                <li>Modern React uses functional components.</li>
              </ul>
            </div>

            <div className="react-card">
              <h3>Props &amp; state</h3>
              <ul>
                <li><strong>Props</strong> – read-only inputs from parent.</li>
                <li><strong>State</strong> – local, changeable data.</li>
                <li>UI re-renders when state/props change.</li>
              </ul>
            </div>

            <div className="react-card">
              <h3>Hooks</h3>
              <ul>
                <li><code>useState</code> – manage local state.</li>
                <li><code>useEffect</code> – side effects & data fetching.</li>
                <li>Custom hooks – reuse logic between components.</li>
              </ul>
            </div>

            <div className="react-card">
              <h3>Routing &amp; data</h3>
              <ul>
                <li>React Router for navigation.</li>
                <li>Fetch APIs with <code>fetch</code> / Axios.</li>
                <li>Context / Redux for global state.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CODE EXAMPLE */}
        <section className="react-section">
          <h2>See a tiny React component</h2>
          <p className="react-section-intro">
            This small component shows a counter with a button. Very common
            in React interview questions.
          </p>

          <div className="react-code-layout">
            <div className="react-code-card">
              <div className="react-code-header">
                <span className="react-dot red" />
                <span className="react-dot yellow" />
                <span className="react-dot green" />
                <span className="react-file-name">Counter.jsx</span>
              </div>

              <pre className="react-code-block">
{`import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You clicked {count} times
    </button>
  );
}`}
              </pre>
            </div>

            <div className="react-code-explain">
              <h3>What this code shows</h3>
              <ol>
                <li>Functional component returning JSX.</li>
                <li><code>useState</code> managing local state.</li>
                <li><code>onClick</code> event handling.</li>
                <li>Re-render when <code>count</code> changes.</li>
              </ol>
              <p className="react-tip">
                In interviews, talk about how React updates only the parts of
                the UI that changed instead of reloading the whole page.
              </p>
            </div>
          </div>
        </section>

        {/* ROLES SECTION */}
        <section className="react-section">
          <h2>Roles that use React heavily</h2>
          <p className="react-section-intro">
            Many Sri Lankan product companies and startups use React for modern
            web apps. Strong React skills open doors to multiple roles.
          </p>

          <div className="react-role-grid">
            <div className="react-role-card">
              <h3>React Frontend Engineer</h3>
              <p>Builds complex UIs using React, hooks and APIs.</p>
              <ul>
                <li>Reusable components &amp; design systems.</li>
                <li>State management and routing.</li>
                <li>Performance optimisation.</li>
              </ul>
            </div>

            <div className="react-role-card">
              <h3>Full-stack (React + Node)</h3>
              <p>Works on both frontend React and backend APIs.</p>
              <ul>
                <li>Integrate REST/GraphQL with React.</li>
                <li>Authentication &amp; protected routes.</li>
                <li>Deployment &amp; CI/CD.</li>
              </ul>
            </div>

            <div className="react-role-card">
              <h3>React Native Developer</h3>
              <p>Uses React concepts to build mobile apps.</p>
              <ul>
                <li>Same JS/React knowledge, different components.</li>
                <li>Navigation & mobile UI patterns.</li>
                <li>App store builds & debugging.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA + QUESTIONS */}
        <section className="react-cta-section">
          <div className="react-cta-box">
            {/* 1️⃣ LOGIN ILLA – sign up CTA */}
            {!user && (
              <>
                <h3>Ready to practice React interview questions?</h3>
                <p>
                  Create a free CodeCeylon account and access company-wise React
                  interview questions curated by admins.
                </p>

                <button
                  className="react-cta-btn"
                  onClick={() => openSignup("signup")}
                >
                  Learn more &amp; sign up
                </button>
              </>
            )}

            {/* 2️⃣ LOGIN IRUKKU + YES/NO */}
            {user && !started && (
              <>
                <h3>Practice React interview questions now?</h3>
                <p>
                  We&apos;ll show you real React questions from Sri Lankan companies.
                  Continue?
                </p>

                <div className="btn-row">
                  <button
                    className="python-btn-primary"
                    onClick={() => setStarted(true)}
                  >
                    Yes
                  </button>

                  <button
                    className="python-btn-dark"
                    onClick={handleNo}
                  >
                    No
                  </button>
                </div>
              </>
            )}

            {/* 3️⃣ LOGIN IRUKKU + YES → filters + questions */}
            {user && started && (
              <div className="python-questions-flow">
                <h3>Practice React interview questions</h3>
                <p>Select district &amp; company to view questions.</p>

                {/* District select */}
                <div className="python-filter-row">
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

                {/* Company pills */}
                <div className="python-filter-row">
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

                {/* Questions list */}
                <div className="questions-section">
                  <h4>
                    {selectedCompany
                      ? `${selectedCompany.name} – React questions`
                      : "React questions"}
                  </h4>

                  {selectedCompany?.address && (
                    <p className="company-meta">{selectedCompany.address}</p>
                  )}

                  {loading && <p>Loading questions…</p>}

                  {!loading && questions.length === 0 && (
                    <p>No questions added yet for this company.</p>
                  )}

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
