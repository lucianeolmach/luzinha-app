"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ResultadoPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("resultado_mvp");
    if (!raw) return;
    try {
      setData(JSON.parse(raw));
    } catch {}
  }, []);

  const checkoutUrl =
    "https://SEU-LINK-DE-CHECKOUT-AQUI"; // Hotmart/Eduzz/Stripe Checkout etc.

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <h1 style={styles.h1}>Sua prévia</h1>

        {!data ? (
          <>
            <p style={styles.p}>
              Não encontrei suas respostas aqui. Volte e faça o questionário.
            </p>
            <Link href="/quiz" style={styles.button}>
              Ir para o questionário
            </Link>
          </>
        ) : (
          <>
            <div style={styles.panel}>
              <p style={styles.label}>Perfil de bem-estar</p>
              <h2 style={styles.h2}>{data.profile.name}</h2>
              <p style={styles.p}>{data.profile.preview}</p>

              <p style={{ ...styles.p, marginTop: 10 }}>
                <strong>Próximo passo sugerido:</strong> {data.profile.next}
              </p>

              <p style={styles.mini}>
                Pontuação total (apenas para referência interna do método):{" "}
                <strong>{data.total}</strong>
              </p>
            </div>

            <div style={styles.offer}>
              <h3 style={styles.h3}>Quer aprofundar?</h3>
              <p style={styles.p}>
                Ao assinar, você recebe: trilhas completas, áudios do Lucas, exercícios guiados e check-ins para
                construir consistência.
              </p>

              <a href={checkoutUrl} style={styles.buttonPrimary}>
                Quero assinar e acessar o conteúdo
              </a>

              <p style={styles.small}>
                * Educacional. Não substitui acompanhamento médico/psicológico.
              </p>
            </div>

            <Link href="/" style={styles.link}>
              Voltar ao início
            </Link>
          </>
        )}
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
  h1: { margin: 0, fontSize: 26 },
  h2: { margin: "6px 0 10px", fontSize: 22 },
  h3: { margin: 0, fontSize: 18 },
  label: { margin: 0, color: "#666", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.8 },
  p: { color: "#222", lineHeight: 1.55 },
  mini: { marginTop: 12, color: "#666", fontSize: 12 },
  panel: { border: "1px solid #eee", borderRadius: 16, padding: 18, background: "#fff" },
  offer: { marginTop: 16, border: "1px solid #eee", borderRadius: 16, padding: 18, background: "#fafafb" },
  button: {
    display: "inline-block",
    padding: "12px 16px",
    borderRadius: 12,
    background: "#111",
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
    marginTop: 10,
  },
  buttonPrimary: {
    display: "inline-block",
    padding: "12px 16px",
    borderRadius: 12,
    background: "#111",
    color: "white",
    textDecoration: "none",
    fontWeight: 800,
    marginTop: 10,
  },
  link: { display: "inline-block", marginTop: 14, color: "#111" },
  small: { marginTop: 10, color: "#666", fontSize: 12, lineHeight: 1.4 },
};