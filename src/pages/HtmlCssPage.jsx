// src/pages/HtmlCssPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCompanyQuestions } from "../services/companyQuestions";
import "../styles/htmlcss.css";

const COMPANIES_BY_DISTRICT = {
  Colombo: [
    { id: "creativehub", name: "Creative Hub", address: "Colombo 03" },
    { id: "pixelcrafters", name: "Pixel Crafters", address: "Colombo 02" },
    { id: "uiworks", name: "UI Works", address: "Colombo 07" }
  ],
  Jaffna: [
    { id: "designlanka", name: "Design Lanka", address: "Jaffna" },
    { id: "northweb", name: "North Web Studio", address: "Jaffna" }
  ],
  Kandy: [
    { id: "kandyweb", name: "Kandy Web Lab", address: "Kandy" },
    { id: "highlandui", name: "Highland UI Studio", address: "Kandy" }
  ],
  Galle: [
    { id: "southernui", name: "Southern UI", address: "Galle" },
    { id: "blueoceanweb", name: "Blue Ocean Web", address: "Galle" }
  ]
};

const DISTRICTS = Object.keys(COMPANIES_BY_DISTRICT);

export default function HtmlCssPage({ openSignup }) {
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

  // reset on login/logout
  useEffect(() => {
    setStarted(false);
    setQuestions([]);
    setLoading(false);
  }, [user]);

  // fetch questions when YES pressed + filters change
  useEffect(() => {
    if (!user || !started || !selectedCompany) return;

    async function load() {
      setLoading(true);
      try {
        const data = await getCompanyQuestions(
          "htmlcss",
          activeDistrict,
          selectedCompany.id
        );
        setQuestions(data);
      } catch (err) {
        console.error("Failed loading HTML/CSS questions:", err);
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

  return (
    <div className="html-page">
      {/* HERO */}
      <section className="html-hero">
        <div className="html-hero-overlay" />

        <div className="html-hero-content">
          <h1>Build clean layouts with HTML & CSS.</h1>

          <p>
            Understand how pages are structured with HTML and styled with CSS.
            Learn concepts interviewers expect for frontend roles.
          </p>

          <div className="html-badge-row">
            <span className="html-badge">Semantic HTML</span>
            <span className="html-badge">Flexbox & Grid</span>
            <span className="html-badge">Responsive design</span>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="html-main">
        {/* BASICS */}
        <section className="html-section">
          <h2>HTML & CSS basics in a nutshell</h2>
          <p className="html-section-intro">
            HTML gives the structure, CSS gives the style. Most interviews test
            semantic markup and layout techniques.
          </p>

          <div className="html-grid">
            <div className="html-card">
              <h3>HTML structure</h3>
              <ul>
                <li>Use semantic tags: header, main, footer.</li>
                <li>Clean, readable markup.</li>
                <li>Proper heading structure.</li>
              </ul>
            </div>

            <div className="html-card">
              <h3>CSS basics</h3>
              <ul>
                <li>Selectors, classes, IDs.</li>
                <li>Box model fundamentals.</li>
                <li>Display types: block, inline, flex.</li>
              </ul>
            </div>

            <div className="html-card">
              <h3>Layouts</h3>
              <ul>
                <li>Flexbox—centering & alignment.</li>
                <li>CSS Grid—full page layouts.</li>
                <li>Reusable structures.</li>
              </ul>
            </div>

            <div className="html-card">
              <h3>Responsive design</h3>
              <ul>
                <li>Use rem, %, vw, fr units.</li>
                <li>Mobile-first design.</li>
                <li>Fluid grids.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CODE EXAMPLE */}
        <section className="html-section">
          <h2>See a tiny HTML & CSS layout</h2>

          <p className="html-section-intro">
            This example shows a simple, responsive card layout.
          </p>

          <div className="html-code-layout">
            <div className="html-code-card">
              <div className="html-code-header">
                <span className="html-dot red" />
                <span className="html-dot yellow" />
                <span className="html-dot green" />
                <span className="html-file-name">card-layout.html</span>
              </div>

              <pre className="html-code-block">
{`<section class="card-grid">
  <article class="card">
    <h2>Frontend role</h2>
    <p>Work with HTML, CSS & JS.</p>
  </article>

  <article class="card">
    <h2>Responsive ready</h2>
    <p>Layout adapts automatically.</p>
  </article>
</section>`}
              </pre>
            </div>

            <div className="html-code-card">
              <div className="html-code-header">
                <span className="html-dot red" />
                <span className="html-dot yellow" />
                <span className="html-dot green" />
                <span className="html-file-name">card-layout.css</span>
              </div>

              <pre className="html-code-block">
{`.card-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.card {
  padding: 1rem;
  border-radius: 0.75rem;
  background: #020617;
  border: 1px solid #1e293b;
}`}
              </pre>
            </div>
          </div>

          <div className="html-code-explain">
            <h3>What this layout shows</h3>
            <ol>
              <li>Semantic HTML with section + article.</li>
              <li>CSS Grid using auto-fit + minmax.</li>
              <li>Dark UI card design.</li>
            </ol>
          </div>
        </section>

        {/* CTA + QUESTIONS */}
        <section className="html-cta-section">
          <div className="html-cta-box">

            {/* 1 — LOGIN ILLA */}
            {!user && (
              <>
                <h3>Ready to practice HTML & CSS interview questions?</h3>
                <p>Create a free account to continue.</p>
                <button
                  className="html-cta-btn"
                  onClick={() => openSignup("signup")}
                >
                  Learn more & sign up
                </button>
              </>
            )}

            {/* 2 — LOGIN IRUKKU but YES click pannala */}
            {user && !started && (
              <>
                <h3>Ready to practice HTML & CSS interview questions?</h3>
                <p>We’ll show real company interview questions. Continue?</p>

                <div className="btn-row">
                  <button
                    className="python-btn-primary"
                    onClick={() => setStarted(true)}
                  >
                    Yes
                  </button>

                  <button
                    className="python-btn-dark"
                    onClick={() => navigate("/dashboard")}
                  >
                    No
                  </button>
                </div>
              </>
            )}

            {/* 3 — LOGIN IRUKKU + YES pressed */}
            {user && started && (
              <div className="python-questions-flow">
                <h3>Practice HTML & CSS interview questions</h3>

                {/* District */}
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

                {/* Company */}
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

                {/* Questions */}
                <div className="questions-section">
                  <h4>
                    {selectedCompany
                      ? `${selectedCompany.name} – HTML/CSS questions`
                      : "HTML/CSS Questions"}
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
