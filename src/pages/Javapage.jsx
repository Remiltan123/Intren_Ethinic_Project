// src/pages/JavaPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCompanyQuestions } from "../services/companyQuestions";
import "../styles/java.css";

// User side-ku thevaiyana districts + companies (same ids as admin.jsx)
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
      address: "255/21, Dr C D L Fernando Mawatha, Kandy",
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

export default function JavaPage({ openSignup }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // yes/no flow
  const [started, setStarted] = useState(false);

  // district & company selection
  const [activeDistrict, setActiveDistrict] = useState("Colombo");
  const [activeCompanyId, setActiveCompanyId] = useState(
    COMPANIES_BY_DISTRICT["Colombo"][0]?.id || ""
  );

  // questions
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

  // user login/logout aagumbodhu reset
  useEffect(() => {
    setStarted(false);
    setQuestions([]);
    setLoading(false);
  }, [user]);

  // YES pressed + selection maariyappo questions fetch
  useEffect(() => {
    if (!user || !started || !selectedCompany) return;

    async function load() {
      setLoading(true);
      try {
        const data = await getCompanyQuestions(
          "java", // stack id – admin side la use panradhe id
          activeDistrict,
          selectedCompany.id
        );
        setQuestions(data);
      } catch (err) {
        console.error("Failed to load Java questions", err);
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
    const firstCompany =
      COMPANIES_BY_DISTRICT[d]?.[0] || null;
    setActiveCompanyId(firstCompany ? firstCompany.id : "");
  }

  return (
    <div className="java-page">
      {/* HERO SECTION */}
      <section className="java-hero">
        <div className="java-hero-overlay" />

        <div className="java-hero-content">
          <h1>Start your Java journey here.</h1>
          <p>
            Learn how Java programs are written, compiled and run. Understand core
            concepts like classes, objects and methods with simple examples used in
            Sri Lankan companies.
          </p>

          <div className="java-hero-buttons">{/* (keep empty for now) */}</div>
        </div>
      </section>

      {/* CONTENT WRAPPER */}
      <main className="java-main">
        {/* BASIC CONCEPTS */}
        <section className="java-section">
          <h2>Java basics in a nutshell</h2>
          <p className="java-section-intro">
            Java is an object-oriented, class-based programming language widely
            used in enterprise systems, Android apps and backend APIs.
          </p>

          <div className="java-grid">
            <div className="java-card">
              <h3>How Java runs</h3>
              <ul>
                <li>Write code in <code>.java</code> files.</li>
                <li>Compile using <code>javac</code> → bytecode <code>.class</code> files.</li>
                <li>JVM (Java Virtual Machine) runs the bytecode on any OS.</li>
              </ul>
            </div>

            <div className="java-card">
              <h3>Basic structure</h3>
              <p>Every Java program has:</p>
              <ul>
                <li>A <code>class</code> (file name = class name)</li>
                <li>A <code>main</code> method as the entry point</li>
                <li>Statements inside curly braces <code>{`{ }`}</code></li>
              </ul>
            </div>

            <div className="java-card">
              <h3>Where it&apos;s used</h3>
              <p>Common use cases:</p>
              <ul>
                <li>Banking & finance systems</li>
                <li>Enterprise web apps (Spring Boot)</li>
                <li>Android mobile apps</li>
                <li>Microservices & APIs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* INPUT / OUTPUT EXAMPLE */}
        <section className="java-section">
          <h2>Simple input & output example</h2>
          <p className="java-section-intro">
            This example reads a student&apos;s name and age, then prints a short
            message. This is enough to understand how Java handles console I/O.
          </p>

          <div className="java-code-layout">
            <div className="java-code-card">
              <div className="java-code-header">
                <span className="java-dot red" />
                <span className="java-dot yellow" />
                <span className="java-dot green" />
                <span className="java-file-name">StudentInput.java</span>
              </div>
              <pre className="java-code-block">
{`import java.util.Scanner;

public class StudentInput {
    public static void main(String[] args) {

        // Create Scanner object to read input
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = sc.nextLine();        // read text

        System.out.print("Enter your age: ");
        int age = sc.nextInt();             // read number

        System.out.println("Hi " + name + ", you are " + age + " years old.");

        sc.close(); // close scanner
    }
}`}
              </pre>
            </div>

            <div className="java-code-explain">
              <h3>What is happening here?</h3>
              <ol>
                <li>
                  <code>Scanner</code> is used to read input from the keyboard.
                </li>
                <li>
                  <code>nextLine()</code> reads full text, <code>nextInt()</code> reads an integer.
                </li>
                <li>
                  <code>System.out.println()</code> prints output on a new line.
                </li>
                <li>
                  Always close the scanner using <code>sc.close()</code> when done.
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* COMPANIES USING JAVA */}
        <section className="java-section">
          <h2>Where does Java help you in Sri Lanka?</h2>
          <p className="java-section-intro">
            Many Sri Lankan IT companies use Java for backend development and
            enterprise solutions.
          </p>

          <div className="java-grid">
            <div className="java-company-card">
              <h3>Banking & finance</h3>
              <p>
                Core banking systems and payment gateways often use Java with
                Spring Boot and microservices architecture.
              </p>
            </div>
            <div className="java-company-card">
              <h3>Product companies</h3>
              <p>
                Companies like WSO2, Virtusa and Sysco LABS heavily rely on Java
                for middleware, integration platforms and cloud services.
              </p>
            </div>
            <div className="java-company-card">
              <h3>Android apps</h3>
              <p>
                Android apps are built using Java / Kotlin. Knowing Java makes it
                easier to learn Android development.
              </p>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION + QUESTIONS */}
        <section className="java-section java-cta-section">
          <div className="java-cta-box">
            {/* 1️⃣ LOGIN ILLA – original Learn more & sign up */}
            {!user && (
              <>
                <h2>Ready to practice Java interview questions?</h2>
                <p>
                  Create a free CodeCeylon account and access company-wise Java
                  interview questions, district filters and admin-curated content.
                </p>
                <button
                  className="btn-primary java-cta-btn"
                  onClick={() => openSignup && openSignup("signup")}
                >
                  Learn more &amp; sign up
                </button>
              </>
            )}

            {/* 2️⃣ LOGIN IRUKKU, AANA YES PRESS PANLA – Yes / No */}
            {user && !started && (
              <>
                <h2>Ready to practice Java interview questions?</h2>
                <p>
                  We&apos;ll show you real interview questions from Sri Lankan
                  companies. Continue?
                </p>
                <div className="btn-row">
                  <button
                    className="btn-primary java-cta-btn"
                    onClick={() => setStarted(true)}
                  >
                    Yes
                  </button>
                  <button
                    className="btn-outline java-cta-btn"
                    onClick={handleNo}
                  >
                    No
                  </button>
                </div>
              </>
            )}

            {/* 3️⃣ LOGIN IRUKKU + YES – district, company, questions */}
            {user && started && (
              <div className="java-questions-flow">
                <h2>Practice Java interview questions</h2>
                <p>Select your district and company to view questions.</p>

                {/* Step 1 – district */}
                <div className="java-filter-row">
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

                {/* Step 2 – company */}
                <div className="java-filter-row">
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
                      <p>No companies configured for this district.</p>
                    )}
                  </div>
                </div>

                {/* Step 3 – questions list */}
                <div className="questions-section">
                  <h3>
                    {selectedCompany
                      ? `${selectedCompany.name} – Java questions`
                      : "Java questions"}
                  </h3>
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
