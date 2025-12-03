// src/Admin/admin.jsx
import React, { useEffect, useRef, useState } from "react";
import "./admin.css";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useLanguage } from "../context/LanguageContext";

/**
 * Tech stacks (for labels & Firestore paths)
 */
const STACKS = [
  { id: "java", label: "Java" },
  { id: "cpp", label: "C / C++" },
  { id: "js", label: "JavaScript" },
  { id: "react", label: "React" },
  { id: "python", label: "Python" },
  { id: "html-css", label: "HTML & CSS" },
];

/**
 * District → companies
 */
const COMPANIES_BY_DISTRICT = {
  Colombo: [
    {
      id: "wso2",
      name: "WSO2",
      address: "20, Palm Grove, Colombo 03",
      stacks: ["java", "node", "js"],
    },
    {
      id: "virtusa",
      name: "Virtusa",
      address:
        "752, Dr Danister De Silva Mawatha, Colombo 09",
      stacks: ["java", "react", "node"],
    },
    {
      id: "syscolabs",
      name: "Sysco LABS",
      address: "55A, Dharmapala Mawatha, Colombo 03",
      stacks: ["java", "react", "node", "python"],
    },
    {
      id: "ifs",
      name: "IFS",
      address:
        "Orion Towers 1, Dr Danister De Silva Mawatha, Colombo 09",
      stacks: ["java", "cpp"],
    },
    {
      id: "ninetyninex",
      name: "99X",
      address: "Nawam Mawatha, Colombo 02",
      stacks: ["react", "node", "js"],
    },
    {
      id: "hsenid",
      name: "hSenid",
      address: "No. 32, Castle Street, Colombo 08",
      stacks: ["java", "js"],
    },
  ],
  Jaffna: [
    {
      id: "loncey",
      name: "Loncey Tech (Pvt) Ltd",
      address: "259 Temple Rd, Jaffna 40000",
      stacks: ["react", "node", "python"],
    },
    {
      id: "speedit",
      name: "Speed IT Net",
      address: "Jaffna",
      stacks: ["js", "react-native", "node"],
    },
    {
      id: "appslanka",
      name: "Apps Lanka Software Solutions",
      address: "No.40 Palaly Road, Jaffna",
      stacks: ["react-native", "js", "node"],
    },
    {
      id: "3axislabs",
      name: "3axislabs",
      address: "Jaffna",
      stacks: ["react", "node", "python"],
    },
    {
      id: "technovate",
      name: "Technovate",
      address: "Jaffna",
      stacks: ["js", "html-css"],
    },
  ],
  Kandy: [
    {
      id: "glenzsoft",
      name: "Glenzsoft",
      address:
        "255/21, Dr C D L Fernando Mawatha, Kandy",
      stacks: ["react", "node", "js"],
    },
    {
      id: "splendorport",
      name: "SplendorPort",
      address: "Kandy",
      stacks: ["react", "js", "html-css"],
    },
    {
      id: "kitsweb",
      name: "Kits Web Creations",
      address: "Kandy",
      stacks: ["js", "html-css"],
    },
    {
      id: "ontech",
      name: "Ontech IT Solutions",
      address: "Kandy",
      stacks: ["java", "js"],
    },
  ],
  Galle: [
    {
      id: "sanmark",
      name: "Sanmark Solutions",
      address: "Galle",
      stacks: ["react", "node", "php"],
    },
    {
      id: "jetapp",
      name: "Jetapp",
      address: "Galle",
      stacks: ["react-native", "node", "js"],
    },
    {
      id: "galleit",
      name: "Galle IT Solutions",
      address: "34 Talbot Town, Galle",
      stacks: ["js", "html-css"],
    },
    {
      id: "webnifix",
      name: "Webnifix",
      address: "Galle",
      stacks: ["js", "react", "html-css"],
    },
  ],
};

export default function Admin() {
  // 🔥 navbar-selected language from context
  const { language } = useLanguage();

  // 🔁 map LanguageContext keys → Firestore stack ids
  //   (match with STACKS & Firestore paths)
  const languageToStack = {
    java: "java",
    python: "python",
    javascript: "js",
    htmlcss: "html-css",
    react: "react",
    ccc: "cpp",
  };

  const activeStack = languageToStack[language] || "java";

  // selection state
  const [activeDistrict, setActiveDistrict] = useState("Colombo");
  const [activeCompanyId, setActiveCompanyId] = useState(
    COMPANIES_BY_DISTRICT["Colombo"][0]?.id || null
  );

  // Q&A list from Firestore
  const [qaList, setQaList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  // form state
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);

  // edit mode
  const [editingId, setEditingId] = useState(null);

  const districts = Object.keys(COMPANIES_BY_DISTRICT);

  const companiesInDistrict =
    COMPANIES_BY_DISTRICT[activeDistrict] || [];

  const selectedCompany =
    companiesInDistrict.find((c) => c.id === activeCompanyId) ||
    companiesInDistrict[0] ||
    null;

  // ref to companies container to scroll/focus on district change
  const companiesRef = useRef(null);

  // Fetch questions for selected company (real-time)
  useEffect(() => {
    if (!selectedCompany) {
      setQaList([]);
      return;
    }

    setLoadingList(true);
    const colRef = getCurrentCollectionRef();
    if (!colRef) {
      setQaList([]);
      setLoadingList(false);
      return;
    }

    const unsub = onSnapshot(
      colRef,
      (snap) => {
        const items = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setQaList(items);
        setLoadingList(false);
      },
      (err) => {
        console.error("Error loading questions:", err);
        toast.error("Failed to load questions. Please try again.");
        setLoadingList(false);
      }
    );

    return () => {
      try {
        unsub && unsub();
      } catch (e) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStack, activeDistrict, selectedCompany?.id]);

  // 🔗 Current questions subcollection:
  // companyQuestions / {stack} / {district} / {companyId} / questions
  function getCurrentCollectionRef() {
    if (!selectedCompany) return null;
    return collection(
      db,
      "companyQuestions",
      activeStack,
      activeDistrict,
      selectedCompany.id,
      "questions"
    );
  }

  function handleChangeDistrict(district) {
    setActiveDistrict(district);
    const firstCompany =
      COMPANIES_BY_DISTRICT[district]?.[0] || null;
    setActiveCompanyId(firstCompany ? firstCompany.id : null);

    // after state set, scroll company list to top and focus first button
    setTimeout(() => {
      if (companiesRef.current) {
        companiesRef.current.scrollTop = 0;
        const firstBtn =
          companiesRef.current.querySelector(".company-btn");
        if (firstBtn) firstBtn.focus();
      }
    }, 50);
  }

  function handleSelectCompany(companyId) {
    setActiveCompanyId(companyId);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (
      !question.trim() ||
      !answer.trim() ||
      !selectedCompany
    )
      return;
    setSaving(true);

    try {
      if (editingId) {
        const ref = doc(
          db,
          "companyQuestions",
          activeStack,
          activeDistrict,
          selectedCompany.id,
          "questions",
          editingId
        );
        await updateDoc(ref, {
          question: question.trim(),
          answer: answer.trim(),
          updatedAt: serverTimestamp(),
        });
        toast.success("Question & answer updated.");
      } else {
        const colRef = getCurrentCollectionRef();
        if (!colRef) throw new Error("No company selected.");
        await addDoc(colRef, {
          question: question.trim(),
          answer: answer.trim(),
          district: activeDistrict,
          companyName: selectedCompany.name,
          createdAt: serverTimestamp(),
          updatedAt: null,
        });
        toast.success("Question & answer saved.");
      }

      setQuestion("");
      setAnswer("");
      setEditingId(null);
    } catch (err) {
      console.error("Error saving question:", err);
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setQuestion(item.question || "");
    setAnswer(item.answer || "");
    const el = document.querySelector(".add-question-section");
    if (el)
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }

  async function handleDelete(id) {
    if (
      !window.confirm(
        "Delete this question & answer permanently?"
      )
    )
      return;

    try {
      const ref = doc(
        db,
        "companyQuestions",
        activeStack,
        activeDistrict,
        selectedCompany.id,
        "questions",
        id
      );
      await deleteDoc(ref);
      toast.success("Deleted successfully.");
    } catch (err) {
      console.error("Error deleting question:", err);
      toast.error(
        err.message || "Failed to delete. Please try again."
      );
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setQuestion("");
    setAnswer("");
  }

  return (
    <div className="admin-page">
      {/* HEADER */}
      <header className="admin-header">
        <h1>Admin – Interview Questions</h1>
        <p className="admin-subtitle">
          Manage company-wise interview questions & answers by
          language and district.
        </p>
      </header>

      {/* 🔥 NOTE: language tabs removed here; navbar handles it */}

      <div className="admin-layout">
        {/* SIDEBAR */}
        <aside className="admin-sidebar">
          <h2 className="sidebar-title">Districts</h2>

          {/* Combo box / select dropdown for districts */}
          <div
            className="district-select-wrap"
            style={{ marginBottom: "1rem" }}
          >
            <label
              htmlFor="district-select"
              className="sr-only"
            >
              Select district
            </label>
            <select
              id="district-select"
              value={activeDistrict}
              onChange={(e) =>
                handleChangeDistrict(e.target.value)
              }
              className="district-select"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <h2
            className="sidebar-title"
            style={{ marginTop: "1.5rem" }}
          >
            Companies in {activeDistrict}
          </h2>
          <div
            className="sidebar-companies"
            ref={companiesRef}
            tabIndex={0}
            aria-label={`Companies in ${activeDistrict}`}
          >
            {companiesInDistrict.length === 0 && (
              <p className="sidebar-empty">
                No companies added yet.
              </p>
            )}
            {companiesInDistrict.map((company) => (
              <button
                key={company.id}
                className={
                  company.id === selectedCompany?.id
                    ? "company-btn company-btn--active"
                    : "company-btn"
                }
                onClick={() =>
                  handleSelectCompany(company.id)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectCompany(company.id);
                  }
                }}
                aria-pressed={
                  company.id === selectedCompany?.id
                }
              >
                <span className="company-name">
                  {company.name}
                </span>
                <span className="company-address">
                  {company.address}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="admin-main">
          {selectedCompany ? (
            <>
              <div className="company-header">
                <h2>
                  {selectedCompany.name} –{" "}
                  {
                    STACKS.find(
                      (s) => s.id === activeStack
                    )?.label
                  }{" "}
                  questions
                </h2>
                <p className="company-meta">
                  {selectedCompany.address}
                </p>
              </div>

              <section className="questions-section">
                <h3>Saved questions & answers</h3>
                {loadingList ? (
                  <p className="empty-questions">
                    Loading…
                  </p>
                ) : qaList.length === 0 ? (
                  <p className="empty-questions">
                    No questions added yet for this company &
                    language.
                  </p>
                ) : (
                  <ul className="questions-list">
                    {qaList.map((item) => (
                      <li
                        key={item.id}
                        className="question-item"
                      >
                        <p className="q-label">
                          <strong>Q:</strong>{" "}
                          {item.question}
                        </p>
                        <p className="a-label">
                          <strong>A:</strong>{" "}
                          {item.answer}
                        </p>
                        <div className="qa-actions">
                          <button
                            type="button"
                            className="qa-btn qa-btn-edit"
                            onClick={() =>
                              handleEdit(item)
                            }
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="qa-btn qa-btn-delete"
                            onClick={() =>
                              handleDelete(item.id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="add-question-section">
                <h3>
                  {editingId
                    ? "Edit question & answer"
                    : "Add a new question"}
                </h3>
                <form
                  className="add-question-form"
                  onSubmit={handleSave}
                >
                  <label className="field-label">
                    Question
                  </label>
                  <textarea
                    placeholder="Type the interview question here…"
                    value={question}
                    onChange={(e) =>
                      setQuestion(e.target.value)
                    }
                    rows={3}
                  />

                  <label className="field-label">
                    Answer
                  </label>
                  <textarea
                    placeholder="Type the ideal answer or notes here…"
                    value={answer}
                    onChange={(e) =>
                      setAnswer(e.target.value)
                    }
                    rows={4}
                  />

                  <div className="add-actions-row">
                    <button
                      type="submit"
                      className="btn-primary save-btn"
                      disabled={saving}
                    >
                      {saving
                        ? "Saving…"
                        : editingId
                        ? "Update question & answer"
                        : "Save question & answer"}
                    </button>

                    {editingId && (
                      <button
                        type="button"
                        className="qa-btn qa-btn-cancel"
                        onClick={handleCancelEdit}
                      >
                        Cancel edit
                      </button>
                    )}
                  </div>
                </form>
              </section>
            </>
          ) : (
            <p>Please select a company.</p>
          )}
        </main>
      </div>
    </div>
  );
}
