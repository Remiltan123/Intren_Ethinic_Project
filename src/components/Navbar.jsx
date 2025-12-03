import { useState } from "react";
import {
  NavLink,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "../styles/navbar.css";
import AdminAccessModal from "../components/AdminAccessModal";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext"; // 🔥 NEW

// Common config for subject tabs
const LANG_TABS = [
  { key: "java", label: "Java", userPath: "/java" },
  { key: "python", label: "Python", userPath: "/python" },
  { key: "javascript", label: "JavaScript", userPath: "/javascript" },
  { key: "htmlcss", label: "HTML & CSS", userPath: "/html" },
  { key: "react", label: "React", userPath: "/css" },
  { key: "ccc", label: "C / C++", userPath: "/cpp" },
];

export default function Navbar({ openModal }) {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage(); // 🔥 admin filter
  const navigate = useNavigate();
  const location = useLocation();

  // Admin modal open state
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Are we on admin page as an admin?
  const isAdminPage =
    user?.role === "admin" && location.pathname.startsWith("/admin");

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

  // 🔥 Subject button click behaviour (admin vs user)
  function handleLangClick(tab) {
    if (isAdminPage) {
      // ADMIN SIDE: only change selected language, no route change
      setLanguage(tab.key);
    } else {
      // USER SIDE: normal routing
      navigate(tab.userPath);
    }
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
            {LANG_TABS.map((tab) => {
              let isActive = false;

              if (isAdminPage) {
                // Admin side: active = current selected language
                isActive = language === tab.key;
              } else {
                // User side: active based on URL path
                isActive = location.pathname === tab.userPath;
              }

              return (
                <button
                  key={tab.key}
                  type="button"
                  className={`nav-btn${isActive ? " active" : ""}`}
                  onClick={() => handleLangClick(tab)}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* AUTH BUTTONS */}
          <div className="auth-buttons">
            {/* NOT LOGGED IN */}
            {!user && (
              <>
                <NavLink to="/contact" className="nav-btn">
                  Contact
                </NavLink>

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

                <button className="btn-outline" onClick={handleLogout}>
                  Logout
                </button>

                <NavLink to="/contact" className="btn-outline">
                  Contact
                </NavLink>
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
