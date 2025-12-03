// src/App.jsx
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JavaPage from "./pages/JavaPage";
import ContactUs from "./pages/ContactUs.jsx";
import Admin from "./Admin/admin";
import Dashboard from "./pages/Dashboard";
import { LanguageProvider } from "./context/LanguageContext";

import AuthModal from "./components/AuthModal";
import { AuthProvider, useAuth } from "./context/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ===========================
   Inner Routes component
   =========================== */
function AppRoutes() {
  const { user } = useAuth();              // { email, name, role } or null
  const [modalMode, setModalMode] = useState(null); // 'login' | 'signup' | null

  return (
    <>
      {/* Navbar + auth modal trigger */}
      <Navbar openModal={setModalMode} />

      {/* Toasts (only once) */}
      <ToastContainer
        position="top-center"
        theme="dark"
        autoClose={2000}
        pauseOnHover={false}
      />

      <Routes>
        {/* ROOT / 
            - no user -> Home
            - user.role === 'user'  -> /dashboard
            - user.role === 'admin' -> /admin
        */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Home />
            )
          }
        />

        {/* Public page */}
        <Route path="/java" element={<JavaPage />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* USER DASHBOARD 
            - normal user -> Dashboard
            - admin -> redirect to /admin
            - not logged -> Home
        */}
        <Route
          path="/dashboard"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Dashboard />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ADMIN PAGE
            - admin only
            - normal user -> /dashboard
            - not logged -> Home
        */}
        <Route
          path="/admin"
          element={
            user ? (
              user.role === "admin" ? (
                <Admin />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Login / Signup modal */}
      {modalMode && (
        <AuthModal mode={modalMode} onClose={() => setModalMode(null)} />
      )}
    </>
  );
}

/* ===========================
   Root component
   =========================== */
export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>      
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}
