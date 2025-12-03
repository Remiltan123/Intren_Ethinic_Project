// src/pages/CppPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCompanyQuestions } from "../services/companyQuestions";
import "../styles/cpp.css";

// 🔥 Sample districts + companies (same structure as Python)
const COMPANIES_BY_DISTRICT = {
  Colombo: [
    { id: "wso2", name: "WSO2", address: "Colombo 03" },
    { id: "virtusa", name: "Virtusa", address: "Colombo 09" },
    { id: "syscolabs", name: "Sysco LABS", address: "Colombo 03" },
    { id: "ninetyninex", name: "99X", address: "Colombo 02" },
  ],
  Jaffna: [
    { id: "loncey", name: "Loncey Tech", address: "Jaffna" },
    { id: "3axislabs", name: "3axislabs", address: "Jaffna" },
  ],
  Galle: [
    { id: "sanmark", name: "Sanmark Solutions", address: "Galle" },
    { id: "webnifix", name: "Webnifix", address: "Galle" },
  ],
  Kandy: [
    { id: "glenzsoft", name: "Glenzsoft", address: "Kandy" },
    { id: "splendorport", name: "SplendorPort", address: "Kandy" },
  ],
};

const DISTRICTS = Object.keys(COMPANIES_BY_DISTRICT);

export default function CppPage({ openSignup }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [started, setStarted] = useState(false);

  const [activeDistrict, setActiveDistrict] = useState("Colombo");
  const [activeCompanyId, setActiveCompanyId] = useState(
    COMPANIES_BY_DISTRICT["Colombo"][0].id
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
      companiesInDistrict[0],
    [companiesInDistrict, activeCompanyId]
  );

  // Reset on login/logout
  useEffect(() => {
    setStarted(false);
    setQuestions([]);
    setLoading(false);
  }, [user]);

  // Auto-load questions
  useEffect(() => {
    if (!user || !started || !selectedCompany) return;

    async function loadNow() {
      setLoading(true);
      try {
        const data = await getCompanyQuestions(
          "cpp",
          activeDistrict,
          selectedCompany.id
        );
        setQuestions(data);
      } catch (err) {
        console.error("Failed to load C++ questions:", err);
      } finally {
        setLoading(false);
      }
    }

    loadNow();
  }, [user, started, activeDistrict, selectedCompany]);

  function handleChangeDistrict(district) {
    setActiveDistrict(district);
    const first = COMPANIES_BY_DISTRICT[district][0];
    setActiveCompanyId(first.id);
  }

  function handleNo() {
    navigate("/dashboard");
  }

  return (
    <div className="cpp-page">
      {/* HERO */}
      <section className="cpp-hero">
        <div className="cpp-hero-overlay" />

        <div className="cpp-hero-content">
          <h1>Master low-level thinking with C / C++</h1>

          <p>
            Learn how C and C++ give you control over memory, performance and
            system resources. These are heavily tested in core CS interviews.
          </p>

          <div className="cpp-badge-row">
            <span className="cpp-badge">Pointers &amp; memory</span>
            <span className="cpp-badge">OOP in C++</span>
            <span className="cpp-badge">Performance &amp; systems</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="cpp-main">
        {/* BASICS */}
        <section className="cpp-section">
          <h2>C / C++ basics in a nutshell</h2>
          <p className="cpp-section-intro">
            C focuses on low-level control, C++ adds OOP features. Used in
            firmware, backend engines and high-performance systems.
          </p>

          <div className="cpp-grid">
            <div className="cpp-card">
              <h3>How C / C++ run</h3>
              <ul>
                <li>Compiled with gcc / g++</li>
                <li>Fast execution</li>
                <li>Manual memory (new/delete, malloc/free)</li>
              </ul>
            </div>

            <div className="cpp-card">
              <h3>Key concepts</h3>
              <ul>
                <li>Pointers & references</li>
                <li>Classes, OOP, constructors</li>
                <li>Header files & linking</li>
              </ul>
            </div>

            <div className="cpp-card">
              <h3>Where it's used</h3>
              <ul>
                <li>Embedded systems</li>
                <li>Game engines</li>
                <li>High-performance apps</li>
              </ul>
            </div>

            <div className="cpp-card">
              <h3>Interview topics</h3>
              <ul>
                <li>Memory leaks</li>
                <li>RAII</li>
                <li>STL (vector, map)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CODE EXAMPLE */}
        <section className="cpp-section">
          <h2>See a tiny C++ program</h2>
          <p className="cpp-section-intro">
            Simple OOP example mixing STL + constructor logic.
          </p>

          <div className="cpp-code-layout">
            <div className="cpp-code-card">
              <div className="cpp-code-header">
                <span className="cpp-dot red" />
                <span className="cpp-dot yellow" />
                <span className="cpp-dot green" />
                <span className="cpp-file-name">AverageMarks.cpp</span>
              </div>

              <pre className="cpp-code-block">
{`#include <iostream>
#include <vector>

class Marks {
public:
    explicit Marks(const std::vector<int>& values)
        : values(values) {}

    double average() const {
        int sum = 0;
        for (int v : values) sum += v;
        return (double)sum / values.size();
    }

private:
    std::vector<int> values;
};

int main() {
    std::vector<int> scores {78, 82, 91, 67, 88};
    Marks m(scores);
    std::cout << "Average: " << m.average() << std::endl;
}`}
              </pre>
            </div>

            <div className="cpp-code-explain">
              <h3>What this code shows</h3>
              <ol>
                <li>OOP with constructor</li>
                <li>Encapsulation</li>
                <li>STL vector</li>
                <li>Type casting</li>
              </ol>
              <p className="cpp-tip">
                Highlight memory management & destructors in interviews.
              </p>
            </div>
          </div>
        </section>

        {/* ROLES SECTION */}
        <section className="cpp-section">
          <h2>Roles that use C / C++</h2>
          <p className="cpp-section-intro">
            These roles require strong C/C++ fundamentals.
          </p>

          <div className="cpp-role-grid">
            <div className="cpp-role-card">
              <h3>Embedded Developer</h3>
              <ul>
                <li>Microcontrollers</li>
                <li>Real-time systems</li>
                <li>Low memory environments</li>
              </ul>
            </div>

            <div className="cpp-role-card">
              <h3>Systems Engineer</h3>
              <ul>
                <li>Networking tools</li>
                <li>Database engines</li>
                <li>Performance tuning</li>
              </ul>
            </div>

            <div className="cpp-role-card">
              <h3>Game Developer</h3>
              <ul>
                <li>Graphics engines</li>
                <li>Physics simulations</li>
                <li>Rendering pipelines</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA + QUESTIONS */}
        <section className="cpp-cta-section">
          <div className="cpp-cta-box">
            {/* SIGN UP CTA */}
            {!user && (
              <>
                <h3>Ready to practice C / C++ interview questions?</h3>
                <p>
                  Create a free CodeCeylon account for company-wise C++ questions.
                </p>
                <button className="cpp-cta-btn" onClick={() => openSignup("signup")}>
                  Learn more & sign up
                </button>
              </>
            )}

            {/* YES / NO */}
            {user && !started && (
              <>
                <h3>Practice C / C++ interview questions?</h3>
                <p>We will show real company questions. Continue?</p>

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

            {/* QUESTIONS FLOW */}
            {user && started && (
              <div className="python-questions-flow">
                <h3>Practice C / C++ interview questions</h3>

                {/* District */}
                <label className="field-label">
                  District
                  <select
                    className="district-select"
                    value={activeDistrict}
                    onChange={(e) => handleChangeDistrict(e.target.value)}
                  >
                    {DISTRICTS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </label>

                {/* Company pills */}
                <p className="field-label">Company</p>
                <div className="company-pill-row">
                  {companiesInDistrict.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={
                        c.id === selectedCompany.id
                          ? "company-pill company-pill--active"
                          : "company-pill"
                      }
                      onClick={() => setActiveCompanyId(c.id)}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>

                {/* Questions */}
                <div className="questions-section">
                  <h4>{selectedCompany.name} – C++ Questions</h4>
                  <p className="company-meta">{selectedCompany.address}</p>

                  {loading && <p>Loading questions…</p>}

                  {!loading && questions.length === 0 && (
                    <p>No questions added yet for this company.</p>
                  )}

                  {!loading &&
                    questions.map((q) => (
                      <article key={q.id} className="question-card">
                        <p className="q-label"><strong>Q:</strong> {q.question}</p>
                        <p className="a-label"><strong>A:</strong> {q.answer}</p>
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
