// src/pages/PythonPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCompanyQuestions } from "../services/companyQuestions";
import "../styles/python.css";

// Same districts & companies (ids match Admin.jsx)
const COMPANIES_BY_DISTRICT = {
  Colombo: [
    {
      id: "wso2",
      name: "WSO2",
      address: "20, Palm Grove, Colombo 03",
    },
    {
      id: "virtusa",
      name: "Virtusa",
      address: "752, Dr Danister De Silva Mawatha, Colombo 09",
    },
    {
      id: "syscolabs",
      name: "Sysco LABS",
      address: "55A, Dharmapala Mawatha, Colombo 03",
    },
    {
      id: "ifs",
      name: "IFS",
      address: "Orion Towers 1, Colombo 09",
    },
    {
      id: "ninetyninex",
      name: "99X",
      address: "Nawam Mawatha, Colombo 02",
    },
    {
      id: "hsenid",
      name: "hSenid",
      address: "No. 32, Castle Street, Colombo 08",
    },
  ],
  Jaffna: [
    {
      id: "loncey",
      name: "Loncey Tech (Pvt) Ltd",
      address: "259 Temple Rd, Jaffna 40000",
    },
    {
      id: "speedit",
      name: "Speed IT Net",
      address: "Jaffna",
    },
    {
      id: "appslanka",
      name: "Apps Lanka Software Solutions",
      address: "No.40 Palaly Road, Jaffna",
    },
    {
      id: "3axislabs",
      name: "3axislabs",
      address: "Jaffna",
    },
    {
      id: "technovate",
      name: "Technovate",
      address: "Jaffna",
    },
  ],
  Kandy: [
    {
      id: "glenzsoft",
      name: "Glenzsoft",
      address:
        "255/21, Dr C D L Fernando Mawatha, Kandy",
    },
    {
      id: "splendorport",
      name: "SplendorPort",
      address: "Kandy",
    },
    {
      id: "kitsweb",
      name: "Kits Web Creations",
      address: "Kandy",
    },
    {
      id: "ontech",
      name: "Ontech IT Solutions",
      address: "Kandy",
    },
  ],
  Galle: [
    {
      id: "sanmark",
      name: "Sanmark Solutions",
      address: "Galle",
    },
    {
      id: "jetapp",
      name: "Jetapp",
      address: "Galle",
    },
    {
      id: "galleit",
      name: "Galle IT Solutions",
      address: "34 Talbot Town, Galle",
    },
    {
      id: "webnifix",
      name: "Webnifix",
      address: "Galle",
    },
  ],
};

const DISTRICTS = Object.keys(COMPANIES_BY_DISTRICT);

export default function PythonPage({ openSignup }) {
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

  // login / logout-aa change aana udane reset
  useEffect(() => {
    setStarted(false);
    setQuestions([]);
    setLoading(false);
  }, [user]);

  // YES pressed + selection change -> Firestore fetch
  useEffect(() => {
    if (!user || !started || !selectedCompany) return;

    async function load() {
      setLoading(true);
      try {
        const data = await getCompanyQuestions(
          "python",              // 🔥 stack id for Firestore
          activeDistrict,
          selectedCompany.id
        );
        setQuestions(data);
      } catch (err) {
        console.error("Failed to load Python questions", err);
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
    const first =
      COMPANIES_BY_DISTRICT[d]?.[0] || null;
    setActiveCompanyId(first ? first.id : "");
  }

  return (
    <div className="python-page">
      {/* HERO */}
      <section className="python-hero">
        <div className="python-hero-overlay" />

        <div className="python-hero-content">
          <h1>Start your Python journey here.</h1>

          <p>
            Learn how Python works, why companies use it, and
            understand backend, automation, data and AI
            fundamentals with simple, Sri Lanka–friendly
            examples.
          </p>

          <div className="python-badge-row">
            <span className="python-badge">
              Beginner-friendly syntax
            </span>
            <span className="python-badge">
              Used in ML &amp; AI
            </span>
            <span className="python-badge">
              Great for quick projects
            </span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="python-main">
        {/* BASICS GRID */}
        <section className="python-section">
          <h2>Python basics in a nutshell</h2>
          <p className="python-section-intro">
            Python is a high-level, dynamically typed language
            used for backend systems, automation scripts,
            AI/ML, data analysis and more.
          </p>

          <div className="python-grid">
            <div className="python-card">
              <h3>How Python runs</h3>
              <ul>
                <li>
                  Interpreted language – runs line by line.
                </li>
                <li>No manual compilation step.</li>
                <li>
                  Perfect for quick scripts &amp; experiments.
                </li>
              </ul>
            </div>

            <div className="python-card">
              <h3>Core concepts</h3>
              <ul>
                <li>Variables and dynamic types.</li>
                <li>Functions &amp; modules.</li>
                <li>
                  Lists, tuples, dictionaries &amp; sets.
                </li>
              </ul>
            </div>

            <div className="python-card">
              <h3>Where it&apos;s used</h3>
              <ul>
                <li>
                  Backend web apps (Django, Flask, FastAPI).
                </li>
                <li>
                  Automation &amp; scripting (DevOps, tools).
                </li>
                <li>
                  Data science, ML &amp; AI
                  (NumPy, Pandas, PyTorch).
                </li>
              </ul>
            </div>

            <div className="python-card">
              <h3>Why companies choose it</h3>
              <ul>
                <li>Easy to read &amp; maintain.</li>
                <li>Huge ecosystem of libraries.</li>
                <li>
                  Strong community &amp; documentation.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CODE EXAMPLE */}
        <section className="python-section">
          <h2>See a tiny Python program</h2>
          <p className="python-section-intro">
            This small script takes a list of marks and prints
            the average. Simple example, but interviewers love
            to ask logic like this.
          </p>

          <div className="python-code-layout">
            <div className="python-code-card">
              <div className="python-code-header">
                <span className="python-dot red" />
                <span className="python-dot yellow" />
                <span className="python-dot green" />
                <span className="python-file-name">
                  average_marks.py
                </span>
              </div>

              <pre className="python-code-block">
{`marks = [78, 82, 91, 67, 88]

def average(nums):
    total = sum(nums)
    return total / len(nums)

avg = average(marks)

print(f"Average mark: {avg:.2f}")`}
              </pre>
            </div>

            <div className="python-code-explain">
              <h3>What this code shows</h3>
              <ol>
                <li>
                  <strong>List</strong> –{" "}
                  <code>marks</code> holds all the values.
                </li>
                <li>
                  <strong>Function</strong> –{" "}
                  <code>average()</code> reusable logic.
                </li>
                <li>
                  <strong>Built-ins</strong> –{" "}
                  <code>sum()</code> and <code>len()</code> make
                  life easy.
                </li>
                <li>
                  <strong>f-string</strong> – clean way to
                  format output.
                </li>
              </ol>
              <p className="python-tip">
                In interviews, explain{" "}
                <em>why</em> you chose this approach, not just
                the final answer.
              </p>
            </div>
          </div>
        </section>

        {/* ROLES GRID */}
        <section className="python-section">
          <h2>Python roles you can aim for</h2>
          <p className="python-section-intro">
            With strong Python skills, you can jump into several
            career paths used by Sri Lankan and global
            companies.
          </p>

          <div className="python-role-grid">
            <div className="python-role-card">
              <h3>Backend Developer</h3>
              <p>
                Build REST APIs and services using Django,
                Flask or FastAPI.
              </p>
              <ul>
                <li>Authentication &amp; authorization.</li>
                <li>Connecting to databases.</li>
                <li>Deploying to cloud platforms.</li>
              </ul>
            </div>

            <div className="python-role-card">
              <h3>Data / ML Engineer</h3>
              <p>
                Work with data pipelines, machine learning
                models and analytics.
              </p>
              <ul>
                <li>Cleaning &amp; transforming data.</li>
                <li>Training ML models.</li>
                <li>Visualising insights.</li>
              </ul>
            </div>

            <div className="python-role-card">
              <h3>Automation Engineer</h3>
              <p>
                Use Python scripts to automate boring,
                repetitive tasks at scale.
              </p>
              <ul>
                <li>Writing CLI tools &amp; bots.</li>
                <li>Automating reports &amp; Excel work.</li>
                <li>QA test automation.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA + QUESTIONS (like Java) */}
        <section className="python-section python-cta-section">
          <div className="python-cta-box">
            {/* Not logged in → old CTA */}
            {!user && (
              <>
                <h3>
                  Ready to practice Python interview questions?
                </h3>
                <p>
                  Create a free CodeCeylon account and access
                  company-wise Python interview questions,
                  district filters and admin-curated content.
                </p>
                <button
                  className="python-cta-btn"
                  onClick={() =>
                    openSignup && openSignup("signup")
                  }
                >
                  Learn more &amp; sign up
                </button>
              </>
            )}

            {/* Logged in, but not started → Yes / No */}
            {user && !started && (
              <>
                <h3>
                  Ready to practice Python interview questions?
                </h3>
                <p>
                  We&apos;ll show you real interview questions
                  from Sri Lankan companies. Continue?
                </p>
                <div className="btn-row">
                 <button className="python-btn-primary" onClick={() => setStarted(true)}>
  Yes
</button>

<button className="python-btn-dark" onClick={handleNo}>
  No
</button>

                </div>
              </>
            )}

            {/* Logged in + Yes → district, company, questions */}
            {user && started && (
              <div className="python-questions-flow">
                <h3>Practice Python interview questions</h3>
                <p>
                  Select your district and company to view
                  questions.
                </p>

                {/* District */}
                <div className="python-filter-row">
                  <label className="field-label">
                    District
                    <select
                      className="district-select"
                      value={activeDistrict}
                      onChange={(e) =>
                        handleChangeDistrict(e.target.value)
                      }
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
                    {companiesInDistrict.length === 0 && (
                      <p>
                        No companies configured for this
                        district.
                      </p>
                    )}
                  </div>
                </div>

                {/* Questions list */}
                <div className="questions-section">
                  <h4>
                    {selectedCompany
                      ? `${selectedCompany.name} – Python questions`
                      : "Python questions"}
                  </h4>
                  {selectedCompany?.address && (
                    <p className="company-meta">
                      {selectedCompany.address}
                    </p>
                  )}

                  {loading && <p>Loading questions…</p>}

                  {!loading && questions.length === 0 && (
                    <p>
                      No questions added yet for this company.
                    </p>
                  )}

                  {!loading &&
                    questions.map((item) => (
                      <article
                        key={item.id}
                        className="question-card"
                      >
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
