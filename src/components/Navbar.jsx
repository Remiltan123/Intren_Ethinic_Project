import { NavLink, Link } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ openModal }) {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      {/* LEFT: LOGO */}
      <div className="logo">
        <Link to="/" className="logo-link">
          <span className="logo-mark">CC</span>
          <span className="logo-text">CodeCeylon</span>
        </Link>
      </div>

      {/* RIGHT: NAV + AUTH */}
      <div className="nav-main">
        <nav className="nav-links">
          <NavLink to="/java" className="nav-btn">
            Java
          </NavLink>
          <NavLink to="/python" className="nav-btn">
            Python
          </NavLink>
          <NavLink to="/javascript" className="nav-btn">
            JavaScript
          </NavLink>
          <NavLink to="/html" className="nav-btn">
            HTML
          </NavLink>
          <NavLink to="/css" className="nav-btn">
            CSS
          </NavLink>
          <NavLink to="/cpp" className="nav-btn">
            C++
          </NavLink>

          {/* 🔽 Contact section scroll link */}
          
        </nav>

        <div className="auth-buttons">
          {/* ❌ Not logged in → show green buttons */}
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
                onClick={() => openModal("admin")}
              >
                Admin
              </button>
            </>
          )}

          {/* ✅ Logged in → show Hi + Logout only */}
          {user && (
            <>
              <span className="user-label">
                {user.role === "admin"
                  ? "Admin"
                  : `Hi, ${user.name || "User"}`}
              </span>
              <button className="btn-outline" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
//codeceylon.help@gmail.com, service_zjhcunj,template_ol4xgtj,vTDh9D6uYL4B7e98W
