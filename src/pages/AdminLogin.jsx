import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const { user, loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already admin, show simple admin area
  useEffect(() => {
    if (user && user.role === "admin") {
      // Already logged in as admin
    }
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    const result = loginAdmin({ email, password });

    if (!result.ok) {
      alert("Admin access denied. Only authorised admin can login.");
      return;
    }

    alert("Admin login success.");
    // later: navigate to /admin/dashboard
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Login</h1>
      <p>This area is restricted. Only admin can login. No sign up here.</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: 320, marginTop: 16 }}>
        <label>Admin Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@brainfuel.it"
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{ width: "100%", marginBottom: 16, padding: 8 }}
        />

        <button type="submit" className="btn-primary big" style={{ width: "100%" }}>
          Login as admin
        </button>
      </form>
    </div>
  );
}
