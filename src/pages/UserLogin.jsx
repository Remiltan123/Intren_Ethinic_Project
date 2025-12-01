import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserLogin() {
  const { loginUser, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [infoShown, setInfoShown] = useState(false);

  // If already logged in, avoid showing login page
  useEffect(() => {
    if (user && user.role === "user") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!infoShown) {
     toast.error (
        "If this is your first time, please Sign up first.\nOtherwise, use your email to login."
      );
      setInfoShown(true);
    }
  }, [infoShown]);

  function handleSubmit(e) {
    e.preventDefault();
    const result = loginUser({ email });

    if (!result.ok) {
      if (result.reason === "no-account") {
        toast.error("No account found. Please Sign up first, machan.");
      } else {
        toast.error("Email does not match saved account. Try again.");
      }
      return;
    }

    toast.success("Login successful! Welcome back.");
    navigate("/");
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>User Login</h1>
      <p>Already signed up? Login with your email.</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: 320, marginTop: 16 }}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ width: "100%", marginBottom: 16, padding: 8 }}
        />

        <button type="submit" className="btn-primary big" style={{ width: "100%" }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: 12, fontSize: "0.85rem" }}>
        First time here?{" "}
        <Link to="/signup" style={{ textDecoration: "underline" }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}
