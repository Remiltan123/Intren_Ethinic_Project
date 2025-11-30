import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserSignup() {
  const { signupUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email) {
      alert("Please enter name and email, machan.");
      return;
    }
    signupUser({ name, email });

    // 🔥 important: FIRST TIME → direct home page
    alert("Sign up success! You are now logged in.");
    navigate("/"); // auto go home
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>User Sign up</h1>
      <p>First time here? Create your account.</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: 320, marginTop: 16 }}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dhanoo"
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ width: "100%", marginBottom: 16, padding: 8 }}
        />

        <button type="submit" className="btn-primary big" style={{ width: "100%" }}>
          Sign up
        </button>
      </form>

      <p style={{ marginTop: 12, fontSize: "0.85rem" }}>
        Already signed up?{" "}
        <Link to="/login" style={{ textDecoration: "underline" }}>
          Login instead
        </Link>
      </p>
    </div>
  );
}
