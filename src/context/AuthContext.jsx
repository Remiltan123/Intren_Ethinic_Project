// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase";

const AuthContext = createContext();

const ADMIN_EMAIL = "dhanoshiganratnarajah2001@gmail.com";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // { email, name, role }
  const [loading, setLoading] = useState(true);

  // Listen to firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Check if this user is in admins collection
      let role = "user";
      try {
        const q = query(
          collection(db, "admins"),
          where("email", "==", fbUser.email)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          role = "admin";
        }
      } catch (err) {
        console.error("Error checking admin role:", err);
      }

      setUser({
        email: fbUser.email,
        name: fbUser.displayName || "",
        role,
      });
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // ---------- USER SIGNUP ----------
  async function signupUser({ name, email, password }) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // save display name in Firebase user
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }

      setUser({
        email: cred.user.email,
        name: name || "",
        role: "user",
      });

      return { ok: true };
    } catch (err) {
      console.error("signupUser error:", err);
      return {
        ok: false,
        code: err.code,
        message: err.message,
      };
    }
  }

  // ---------- NORMAL USER LOGIN ----------
  async function loginUser({ email, password }) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      // check if this email is admin
      let role = "user";
      const q = query(
        collection(db, "admins"),
        where("email", "==", cred.user.email)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        role = "admin";
      }

      setUser({
        email: cred.user.email,
        name: cred.user.displayName || "",
        role,
      });

      return { ok: true };
    } catch (err) {
      console.error("loginUser error:", err);
      return {
        ok: false,
        code: err.code,
        message: err.message,
      };
    }
  }

  // ---------- ADMIN LOGIN ----------
  async function loginAdmin({ email, password }) {
    try {
      // First, sign in with Firebase Auth
      const cred = await signInWithEmailAndPassword(auth, email, password);

      // Extra safety: email must match main admin email
      if (email !== ADMIN_EMAIL) {
        // not our main admin → sign out again
        await signOut(auth);
        return {
          ok: false,
          message: "Not authorised as admin.",
        };
      }

      // Check Firestore admins collection
      const q = query(
        collection(db, "admins"),
        where("email", "==", email)
      );
      const snap = await getDocs(q);

      if (snap.empty) {
        await signOut(auth);
        return {
          ok: false,
          message: "Not authorised as admin.",
        };
      }

      // success → mark as admin in state
      setUser({
        email: cred.user.email,
        name: cred.user.displayName || "Admin",
        role: "admin",
      });

      return { ok: true };
    } catch (err) {
      console.error("loginAdmin error:", err);
      return {
        ok: false,
        code: err.code,
        message: err.message,
      };
    }
  }

  // ---------- LOGOUT ----------
  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  const value = {
    user,
    signupUser,
    loginUser,
    loginAdmin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
