// src/App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JavaPage from "./pages/JavaPage";        // unga Java page
import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import ContactUs from "./pages/ContactUs.jsx";      // contact page (small c, big U)
import AdminPage from "./pages/AdminLogin";


export default function App() {
  // modal-ku mode: "login" | "signup" | "admin" | null
  const [modalMode, setModalMode] = useState(null);

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar ku openModal function pass pannrom */}
        <Navbar openModal={setModalMode} />

        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Java page */}
          <Route path="/java" element={<JavaPage />} />

          {/* Contact page */}
          <Route path="/contact" element={<ContactUs />} />

          {/* later/python/js/other subject pages inga add pannalaam */}
          {/*
          <Route path="/python" element={<PythonPage />} />
          <Route path="/javascript" element={<JavascriptPage />} />
          etc...
          */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

        {/* Center box for login / signup / admin */}
        <AuthModal mode={modalMode} onClose={() => setModalMode(null)} />
      </BrowserRouter>
    </AuthProvider>
  );
}
