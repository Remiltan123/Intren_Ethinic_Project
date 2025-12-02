// src/components/AuthModal.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/modal.css";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

export default function AuthModal({ mode, onClose }) {
  const { signupUser, loginUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  // reset when mode changes or modal closes
  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
    setLoading(false);
  }, [mode]);

  function handleClose() {
    setError("");
    setLoading(false);
    if (onClose) onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignup) {
        // SIGNUP
        const res = await signupUser({ name, email, password });

        if (!res || !res.ok) {
          const msg =
            (res && res.message) || "Sign up failed. Please check your details.";
          setError(msg);
          toast.error(msg);
          setLoading(false);
          return;
        }

        toast.success("Account created successfully. Welcome!");
      } else {
        // LOGIN
        const res = await loginUser({ email, password });

        if (!res || !res.ok) {
          const msg =
            (res && res.message) ||
            "Login failed. Please check your email and password.";
          setError(msg);
          toast.error(msg);
          setLoading(false);
          return;
        }

        toast.success("Logged in successfully.");
      }

      setLoading(false);
      handleClose();

      // Navigate to after-login page
      // change '/dashboard' to whatever route you want for the after-login page
      navigate("/dashboard");
    } catch (err) {
      console.error("AuthModal submit error:", err);
      const msg = "Something went wrong. Please try again.";
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* CLOSE BUTTON */}
        <div className="modal-close" onClick={handleClose}>
          ✕
        </div>

        {/* TITLE */}
        <h2 className="modal-title">
          {isSignup ? "Create your CodeCeylon account" : "Login to CodeCeylon"}
        </h2>

        {/* FORM – same UI, just one form for both */}
        <form className="modal-form" onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn-primary full" type="submit" disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <ClipLoader size={18} color="#000" />
                <span className="btn-loading-text">Please wait…</span>
              </span>
            ) : isSignup ? (
              "Create account"
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* SMALL ERROR TEXT UNDER BUTTON (same old UI) */}
        {error && (
          <p
            style={{
              marginTop: 8,
              fontSize: "0.85rem",
              color: "#f97373", // soft red
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
