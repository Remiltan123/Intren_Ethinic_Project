// src/pages/contactUs.jsx
import React, { useState, useRef, useMemo } from "react";
import "../styles/contactus.css";
import emailjs from "@emailjs/browser";

// 🔐 EmailJS config
const SERVICE_ID = "service_zjhcunj";
const TEMPLATE_ID = "template_rqnitmj";
const PUBLIC_KEY = "vTDh9D6uYL4B7e98W"; // Account -> API Keys -> Public key

const ContactUs = () => {
  const [showForm, setShowForm] = useState(true);
  const formRef = useRef(null);

  // freeze time for this message
  const nowStr = useMemo(() => new Date().toLocaleString(), []);

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        { publicKey: PUBLIC_KEY }
      );

      console.log("SUCCESS!", result.status, result.text);
      alert("Message sent! ✅ We’ll reply to your email soon.");
      e.target.reset();
      setShowForm(false);
    } catch (err) {
      console.error("FAILED…", err);
      alert("Sending failed ❌ Please try again in a moment.");
    }
  };

  return (
    <section className="contactus" id="contact">
      {/* LEFT SIDE: TEXT + TOGGLE */}
      <div className="contact-left">
        <p className="contact-tag">We’re here to help</p>
        <h2 className="contact-title">
          Contact <span>CodeCeylon</span>
        </h2>
        <p className="contact-subtitle">
          Got a question, idea, or issue with the site?
        </p>
        <p className="contact-body">
          Drop us a message and we’ll get back to you as soon as we can.
          Whether it’s about{" "}
          <span className="highlight">
            interview questions, bugs, or new features
          </span>
          , we’d love to hear from you.
        </p>

        <div className="contact-badges">
          <div className="badge">
            <span>⏱</span>
            <div>
              <p className="badge-title">Average response</p>
              <p className="badge-text">Within 24 hours</p>
            </div>
          </div>
          <div className="badge">
            <span>📬</span>
            <div>
              <p className="badge-title">Support email</p>
              <p className="badge-text">
                dhanoshiganratnarajah2001@gmail.com
              </p>
            </div>
          </div>
        </div>

        <button
          className="btn-contact-toggle"
          onClick={() => setShowForm((s) => !s)}
          aria-expanded={showForm}
          aria-controls="contact-form-area"
        >
          {showForm ? "Close form" : "Open contact form"}
        </button>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div
        id="contact-form-area"
        className={`contact-right ${showForm ? "show" : "hide"}`}
      >
        <div className="contact-card">
          <h3 className="contact-card-title">Send us a message</h3>
          <p className="contact-card-subtitle">
            Fill in the details below and we’ll respond to you via email.
          </p>

          <form ref={formRef} className="contact-form" onSubmit={sendEmail}>
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your full name"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell us how we can help..."
                required
              />
            </div>

            {/* hidden timestamp field for EmailJS */}
            <input type="hidden" name="time" value={nowStr} />

            <button type="submit" className="btn-contact-btn">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
