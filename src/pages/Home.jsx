import { Link } from "react-router-dom";
import "../styles/home.css";


export default function Home() {
  return (
    <div className="home-page">
      <div className="home-inner">
        {/* HERO */}
        <section className="hero">
          <div className="hero-text">
            

            <h1>BrainFuel IT 🚀</h1>

            <p>
              Practice in real-world interview questions by language, company and
              district. One simple place to get ready for Sri Lankan IT jobs.
            </p>

            <div className="hero-stats">
             
              <div className="stat">
                <span className="stat-number">20+</span>
                <span className="stat-label">Sri Lankan companies</span>
              </div>
              <div className="stat">
                <span className="stat-number">100+</span>
                <span className="stat-label">Interview questions</span>
              </div>
            </div>
          </div>
        </section>

        {/* SUBJECT CARDS */}
        <section className="subjects">
          <h2>Subjects you can explore</h2>

          <div className="subject-grid">
            <Link to="/java" className="subject-card java">
              <h3>Java</h3>
              <p>Core concepts + interview Q&amp;A.</p>
            </Link>

            <Link to="/python" className="subject-card python">
              <h3>Python</h3>
              <p>Basics and backend fundamentals.</p>
            </Link>

            <Link to="/javascript" className="subject-card js">
              <h3>JavaScript</h3>
              <p>Frontend and async interview topics.</p>
            </Link>

            <Link to="/html" className="subject-card html">
              <h3>HTML</h3>
              <p>Structure, forms and semantics.</p>
            </Link>

            <Link to="/css" className="subject-card css">
              <h3>CSS</h3>
              <p>Layouts, flexbox and responsive design.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
