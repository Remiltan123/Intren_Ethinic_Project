// src/components/AuthModal.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/modal.css";

const ADMIN_EMAIL = "dhanoshiganratnarajah2001@gmail.com";

export default function AuthModal({ mode, onClose }) {
  const { signupUser, loginUser, loginAdmin } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // modal close aana podhu reset
  useEffect(() => {
    if (!mode) {
      setName("");
      setEmail("");
      setPassword("");
      setAdminEmail("");
      setAdminPass("");
      setError("");
      setLoading(false);
    }
  }, [mode]);

  if (!mode) return null;

  const isSignup = mode === "signup";
  const isLogin = mode === "login";
  const isAdmin = mode === "admin";

  // USER SIGNUP
  async function handleSignup(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Name, email and password required machan.");
      return;
    }
    setLoading(true);
    const res = await signupUser({ name, email, password });
    setLoading(false);

    if (!res.ok) {
      setError(res.message || "Signup failed.");
      return;
    }

    setError("");
    alert("Sign up success! You are now logged in.");
    onClose();
  }

  // USER LOGIN
  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password required.");
      return;
    }

    setLoading(true);
    const res = await loginUser({ email, password });
    setLoading(false);

    if (!res.ok) {
      // 🔥 Special handling for Firebase error codes
      if (res.code === "auth/user-not-found") {
        setError("No account found for this email. Please sign up first.");
        alert("First time aa? Please Sign Up first, machan ✨");
      } else if (res.code === "auth/wrong-password") {
        setError("Password mismatch. Please check your password.");
      } else if (res.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError(res.message || "Login failed.");
      }
      return;
    }

    // success
    setError("");
    alert("Login successful! Welcome back.");
    onClose();
  }

  // ADMIN LOGIN
  async function handleAdminLogin(e) {
    e.preventDefault();

    if (!adminEmail || !adminPass) {
      setError("Admin email and password required.");
      return;
    }

    // ✅ Only this email allowed for admin modal
    if (adminEmail !== ADMIN_EMAIL) {
      setError("Only the main admin email can login here.");
      return;
    }

    setLoading(true);
    const res = await loginAdmin({ email: adminEmail, password: adminPass });
    setLoading(false);

    if (!res.ok) {
      setError(res.message || "Admin access denied.");
      return;
    }

    setError("");
    alert("Admin login success.");
    onClose();
    // 🔥 after admin login → go to admin page
    navigate("/admin");
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()} // inside click => don't close
      >
        {/* CLOSE BUTTON */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* TITLE */}
        <h2 className="modal-title">
          {isSignup && "Create your account"}
          {isLogin && "Login to your account"}
          {isAdmin && "Admin login"}
        </h2>

        {/* ERROR */}
        {error && <div className="modal-error">{error}</div>}

        {/* SIGNUP FORM */}
        {isSignup && (
          <form onSubmit={handleSignup} className="modal-form">
            <input
              type="text"
              placeholder="Name (Dhanoo)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email (you@example.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="btn-primary full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        )}

        {/* LOGIN FORM */}
        {isLogin && (
          <form onSubmit={handleLogin} className="modal-form">
            <input
              type="email"
              placeholder="Email (you@example.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="btn-primary full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* ADMIN FORM */}
        {isAdmin && (
          <form onSubmit={handleAdminLogin} className="modal-form">
            <input
              type="email"
              placeholder="Admin email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Admin password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
            />

            <button
              type="submit"
              className="btn-primary full"
              disabled={loading}
            >
              {loading ? "Checking..." : "Login as admin"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
