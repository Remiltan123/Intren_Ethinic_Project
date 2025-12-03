

// src/pages/JavaPage.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/java.css";

export default function JavaPage({ openSignup }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleLearnMore() {
    if (user) {
      // already logged in → go to dashboard
      navigate("/dashboard");
    } else {
      // not logged in → open signup modal on Home, then show dashboard after signup
      if (openSignup) {
        openSignup("signup"); // tells App to open signup modal
      }
      navigate("/"); // go home where modal appears
    }
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

          <div className="java-hero-buttons">
          </div>
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

        {/* CALL TO ACTION */}
        <section className="java-section java-cta-section">
          <div className="java-cta-box">
            <h2>Ready to practice Java interview questions?</h2>
            <p>
              Create a free CodeCeylon account and access company-wise Java
              interview questions, district filters and admin-curated content.
            </p>
            <button className="btn-primary java-cta-btn" onClick={handleLearnMore}>
              Learn more &amp; sign up
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
