import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminAccessModal({ onClose, onGoToAdmin }) {
  const { loginAdmin, createAdmin } = useAuth();

  // LOGIN FORM
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("info");
  const [canGoToAdmin, setCanGoToAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  // ADD ADMIN FORM
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // ---------- ADMIN LOGIN ----------
  async function handleLogin(e) {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    setCanGoToAdmin(false);
    setShowAddAdmin(false); // hide add-admin section until verified

    const res = await loginAdmin({ email, password });

    if (!res.ok) {
      setStatusType("error");
      setStatus(res.message || "Login failed.");
      setCanGoToAdmin(false);
    } else {
      setStatusType("ok");
      setStatus("Admin access verified.");

      // Enable Go To Admin
      setCanGoToAdmin(true);

      // Allow add-admin section only for admins
      setShowAddAdmin(true);
    }

    setLoading(false);
  }

  // ---------- CREATE NEW ADMIN ----------
  async function handleAddAdmin(e) {
    e.preventDefault();

    setStatusType("info");
    setStatus("Creating admin...");

    const res = await createAdmin({
      name: newName,
      email: newEmail,
      password: newPassword,
    });

    if (!res.ok) {
      setStatusType("error");
      setStatus(res.message || "Error creating admin.");
      return;
    }

    setStatusType("ok");
    setStatus("New admin created successfully!");

    // reset fields
    setNewName("");
    setNewEmail("");
    setNewPassword("");
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        {/* CLOSE */}
        <div className="modal-close" onClick={onClose}>✕</div>

        {/* TITLE */}
        <h2 className="modal-title">Admin Access</h2>

        {/* LOGIN SECTION */}
        <h3 style={{ marginBottom: 10 }}>Login to Admin</h3>

        <form className="modal-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn-primary full" type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        {/* STATUS MESSAGE */}
        {status && (
          <p className="modal-status" data-type={statusType}>
            {status}
          </p>
        )}

        {/* GO TO ADMIN */}
        <button
          className="btn-outline full"
          disabled={!canGoToAdmin}
          onClick={() => {
            if (!canGoToAdmin) return;
            onGoToAdmin();
            onClose();
          }}
          style={{ marginTop: 10 }}
        >
          Go to Admin
        </button>

        {/* DIVIDER */}
        {canGoToAdmin && (
          <hr className="modal-divider" />
        )}

        {/* ADD NEW ADMIN SECTION — ONLY VISIBLE AFTER LOGIN */}
        {canGoToAdmin && (
          <>
            <h3 style={{ marginBottom: 10 }}>Manage Admins</h3>

            {/* Add admin form (always visible after login) */}
            <form className="modal-form" onSubmit={handleAddAdmin}>
              <input
                type="text"
                placeholder="Admin name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="New admin email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="New admin password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <button className="btn-primary full">
                Grant Admin
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
