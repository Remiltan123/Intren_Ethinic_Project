// src/App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JavaPage from "./pages/JavaPage";
import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import ContactUs from "./pages/ContactUs.jsx";
import Admin from "./Admin/admin";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [modalMode, setModalMode] = useState(null);

  

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar openModal={setModalMode} />

        {/* 👇 VERY IMPORTANT: ToastContainer MUST be rendered once */}
        <ToastContainer
          position="top-center"
          theme="dark"
          autoClose={2000}
          pauseOnHover={false}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/java" element={<JavaPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        {modalMode && (
          <AuthModal mode={modalMode} onClose={() => setModalMode(null)} />
        )}
      </BrowserRouter>
    </AuthProvider>
  );
}
