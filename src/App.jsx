// src/App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JavaPage from "./pages/JavaPage";
import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import ContactUs from "./pages/ContactUs.jsx";
import AdminPage from "./pages/AdminLogin";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // IMPORTANT


export default function App() {
  const [modalMode, setModalMode] = useState(null); 
  // mode = "login" | "signup" | "admin" | null

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar ku openModal function pass pannrom */}
        <Navbar openModal={setModalMode} />

        {/* Toastify container - global popup system */}
        <ToastContainer
          position="top-center"
          theme="dark"
          autoClose={2000}
          pauseOnHover={false}
        />

        {/* All Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/java" element={<JavaPage />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Add your other subject pages later */}
          {/* 
          <Route path="/python" element={<PythonPage />} />
          <Route path="/javascript" element={<JavascriptPage />} />
          */}

          <Route path="/admin" element={<AdminPage />} />
        </Routes>

        {/* Auth Login/Signup/Admin modal */}
        {modalMode && (
          <AuthModal mode={modalMode} onClose={() => setModalMode(null)} />
        )}
      </BrowserRouter>
    </AuthProvider>
  );
}
