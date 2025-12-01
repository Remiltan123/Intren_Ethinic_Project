import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function AdminAccessModal({ onClose, onGoToAdmin }) {
  const { loginAdmin, createAdmin } = useAuth();

  // LOGIN FORM
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [canGoToAdmin, setCanGoToAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  // ADD ADMIN FORM
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // ---------- ADMIN LOGIN ----------
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setCanGoToAdmin(false);

    const res = await loginAdmin({ email, password });

    if (!res.ok) {
      console.error("Admin login error:", res.message);

      let friendly = "Incorrect email or password. Please try again.";

      if (res.message?.includes("too-many-requests")) {
        friendly = "Too many attempts. Please wait a moment and try again.";
      } else if (res.message?.includes("network-request-failed")) {
        friendly = "Network error. Please check your internet connection.";
      }

      toast.error(friendly);
      setLoading(false);
      return;
    }

    toast.success("Admin access verified.");
    setCanGoToAdmin(true);
    setLoading(false);
  }

  // ---------- CREATE NEW ADMIN ----------
  async function handleAddAdmin(e) {
    e.preventDefault();

    const res = await createAdmin({
      name: newName,
      email: newEmail,
      password: newPassword,
    });

    if (!res.ok) {
      console.error("createAdmin error:", res.message);
      toast.error(res.message || "Error creating admin account.");
      return;
    }

    toast.success("New admin account created successfully.");

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

        {/* GO TO ADMIN */}
        <button
          className="btn-outline full"
          disabled={!canGoToAdmin}
          onClick={() => {
            if (!canGoToAdmin) return;
            toast.info("Redirecting to admin dashboard...");
            onGoToAdmin();
            onClose();
          }}
          style={{
            marginTop: 10,
            opacity: canGoToAdmin ? 1 : 0.5,
            cursor: canGoToAdmin ? "pointer" : "not-allowed",
          }}
        >
          Go to Admin
        </button>

        {/* ADD ADMIN SECTION (only after admin verified) */}
        {canGoToAdmin && (
          <>
            <hr className="modal-divider" />

            <h3 style={{ marginBottom: 10 }}>Create New Admin</h3>

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
