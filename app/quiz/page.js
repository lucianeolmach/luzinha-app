"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { quiz, scoreAnswers, pickProfile } from "../lib/quiz";

export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState(() => ({}));
  const [step, setStep] = useState(0);

  const current = quiz.questions[step];
  const isLast = step === quiz.questions.length - 1;

  const progress = useMemo(() => {
    const done = Object.keys(answers).length;
    return Math.round((done / quiz.questions.length) * 100);
  }, [answers]);

  function setAnswer(qid, value) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function next() {
    if (!current) return;
    if (answers[current.id] === undefined) return; // força responder
    if (isLast) {
      const { total, byDomain } = scoreAnswers(answers);
      const profile = pickProfile(total);

      // salva no navegador (MVP). Depois troca por Supabase.
      const payload = { total, byDomain, profile, answeredAt: new Date().toISOString() };
      localStorage.setItem("resultado_mvp", JSON.stringify(payload));

      router.push("/resultado");
      return;
    }
    setStep((s) => s + 1);
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <div style={styles.topRow}>
          <h1 style={styles.h1}>{quiz.title}</h1>
          <div style={styles.badge}>{progress}%</div>
        </div>

        <div style={styles.progressOuter}>
          <div style={{ ...styles.progressInner, width: `${progress}%` }} />
        </div>

        <p style={styles.qText}>
          <span style={styles.qIndex}>
            {step + 1}/{quiz.questions.length}
          </span>{" "}
          {current.text}
        </p>

        <div style={styles.options}>
          {quiz.scale.map((opt) => {
            const selected = answers[current.id] === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setAnswer(current.id, opt.value)}
                style={{
                  ...styles.optBtn,
                  ...(selected ? styles.optBtnSelected : null),
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div style={styles.footer}>
          <button onClick={back} style={{ ...styles.navBtn, opacity: step === 0 ? 0.4 : 1 }} disabled={step === 0}>
            Voltar
          </button>
          <button onClick={next} style={styles.navBtnPrimary}>
            {isLast ? "Ver prévia" : "Próximo"}
          </button>
        </div>

        <p style={styles.small}>
          * Educacional. Não fornece diagnóstico. Se estiver em sofrimento intenso, procure ajuda profissional.
        </p>
      </div>
    </main>
  );
}

const styles = {
  main: { minHeight: "100vh", display: "grid", placeItems: "center", padding: 20, background: "#f7f7fb" },
  card: {
    width: "100%",
    maxWidth: 720,
    background: "white",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
  },
  topRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
  h1: { margin: 0, fontSize: 22 },
  badge: { background: "#111", color: "white", padding: "6px 10px", borderRadius: 999, fontSize: 12 },
  progressOuter: { height: 10, background: "#eee", borderRadius: 999, overflow: "hidden", marginTop: 12 },
  progressInner: { height: "100%", background: "#111" },
  qText: { fontSize: 18, lineHeight: 1.5, marginTop: 18, color: "#222" },
  qIndex: { color: "#666", fontSize: 14 },
  options: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, marginTop: 16 },
  optBtn: {
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    fontWeight: 600,
  },
  optBtnSelected: { borderColor: "#111", background: "#111", color: "white" },
  footer: { display: "flex", justifyContent: "space-between", marginTop: 18, gap: 10 },
  navBtn: { padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd", background: "white", cursor: "pointer" },
  navBtnPrimary: { padding: "10px 12px", borderRadius: 12, border: "none", background: "#111", color: "white", cursor: "pointer", fontWeight: 700 },
  small: { marginTop: 12, color: "#666", fontSize: 12, lineHeight: 1.4 },
};