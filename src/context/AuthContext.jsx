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
  doc,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { email, name, role: 'user' | 'admin' }
  const [loading, setLoading] = useState(true);

  // 🔄 Listen for login/logout + reload (Firebase keeps session)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // ---- check ADMIN role from Firestore ----
      let role = "user";
      try {
        const q = query(
          collection(db, "admins"),
          where("email", "==", fbUser.email)
        );
        const snap = await getDocs(q);
        if (!snap.empty) role = "admin";
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

  // ============================================================
  // NORMAL USER SIGNUP
  // ============================================================
  async function signupUser({ name, email, password }) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      if (name) await updateProfile(cred.user, { displayName: name });

      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        email,
        name: name || "",
        role: "user",
        createdAt: Date.now(),
      });

      setUser({
        email,
        name,
        role: "user",
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  // ============================================================
  // NORMAL USER LOGIN
  // ============================================================
  async function loginUser({ email, password }) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      // check if this user is also admin
      let role = "user";
      const q = query(
        collection(db, "admins"),
        where("email", "==", cred.user.email)
      );
      const snap = await getDocs(q);
      if (!snap.empty) role = "admin";

      setUser({
        email: cred.user.email,
        name: cred.user.displayName || "",
        role,
      });

      return { ok: true, role };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  // ============================================================
  // CREATE ADMIN (from Admin modal)
  // ============================================================
  async function createAdmin({ name, email, password }) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }

      // add to admins collection
      await setDoc(doc(db, "admins", cred.user.uid), {
        uid: cred.user.uid,
        email,
        name: name || "",
        createdAt: Date.now(),
      });

      return { ok: true };
    } catch (err) {
      console.log("createAdmin error:", err);
      return { ok: false, message: err.message };
    }
  }

  // ============================================================
  // LOGIN AS ADMIN ONLY
  // ============================================================
  async function loginAdmin({ email, password }) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      // verify admin role
      const q = query(
        collection(db, "admins"),
        where("email", "==", email)
      );
      const snap = await getDocs(q);

      if (snap.empty) {
        await signOut(auth);
        return { ok: false, message: "Not authorised as admin." };
      }

      setUser({
        email: cred.user.email,
        name: cred.user.displayName || "Admin",
        role: "admin",
      });

      return { ok: true, role: "admin" };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  // ============================================================
  // LOGOUT (user or admin)
  // ============================================================
  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  const value = {
    user,
    loading,
    signupUser,
    loginUser,
    loginAdmin,
    createAdmin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* app render agaradhu auth state load agi mudinja apram thaan */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
