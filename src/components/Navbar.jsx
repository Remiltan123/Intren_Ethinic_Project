import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import AdminAccessModal from "../components/AdminAccessModal";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ openModal }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Admin modal open state
  const [showAdminModal, setShowAdminModal] = useState(false);

  // logout
  async function handleLogout() {
    await logout();
    navigate("/");
  }

  // After admin login → go to admin page
  function handleGoToAdmin() {
    setShowAdminModal(false);
    navigate("/admin");
  }

  return (
    <>
      <header className="topbar">
        {/* LEFT: LOGO */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="logo-mark">CC</span>
            <span className="logo-text">CodeCeylon</span>
          </Link>
        </div>

        {/* RIGHT: NAV */}
        <div className="nav-main">
          <nav className="nav-links">

            {/* Always visible navigation links */}
            <NavLink to="/java" className="nav-btn">Java</NavLink>
            <NavLink to="/python" className="nav-btn">Python</NavLink>
            <NavLink to="/javascript" className="nav-btn">JavaScript</NavLink>
            <NavLink to="/html" className="nav-btn">HTML</NavLink>
            <NavLink to="/css" className="nav-btn">CSS</NavLink>
            <NavLink to="/cpp" className="nav-btn">C++</NavLink>

            {/* 🔥 Always show Contact (fixed) */}
            
          </nav>

          {/* AUTH BUTTONS */}
          <div className="auth-buttons">

            {/* NOT LOGGED IN */}
            {!user && (
              <>
              <NavLink to="/contact" className="nav-btn">Contact</NavLink>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => openModal("login")}
                >
                  Login
                </button>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => openModal("signup")}
                >
                  Sign up
                </button>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setShowAdminModal(true)}
                >
                  Admin
                </button>
              </>
            )}

            {/* LOGGED IN */}
            {user && (
              <>
                <span className="user-label">
                  {user.role === "admin"
                    ? "Admin"
                    : `Hi, ${user.name || "User"}`}
                </span>

                <button
                  className="btn-outline"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <NavLink to="/contact" className="btn-outline">Contact</NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ADMIN ACCESS MODAL */}
      {showAdminModal && (
        <AdminAccessModal
          onClose={() => setShowAdminModal(false)}
          onGoToAdmin={handleGoToAdmin}
        />
      )}
    </>
  );
}
