// src/services/companyQuestions.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// stack   -> "java", "python", "js", "react" ...
// district -> "Colombo", "Jaffna" ...
// companyId -> "virtusa", "speedit" ...
export async function getCompanyQuestions(stack, district, companyId) {
  if (!stack || !district || !companyId) {
    return [];
  }

  const colRef = collection(
    db,
    "companyQuestions",
    stack,
    district,
    companyId,
    "questions"
  );

  const snap = await getDocs(colRef);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
