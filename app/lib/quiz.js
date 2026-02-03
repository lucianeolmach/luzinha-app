export const quiz = {
  title: "Questionário de Bem-Estar",
  // Escala: 0 a 3 (nunca → frequentemente)
  scale: [
    { label: "Nunca", value: 0 },
    { label: "Raramente", value: 1 },
    { label: "Às vezes", value: 2 },
    { label: "Frequentemente", value: 3 },
  ],
  // Você pode adaptar para os domínios do Lucas depois.
  questions: [
    {
      id: "q1",
      text: "Eu me sinto mentalmente acelerada, mesmo quando quero descansar.",
      domain: "ritmo",
    },
    {
      id: "q2",
      text: "Eu me distraio facilmente quando estou tentando focar.",
      domain: "foco",
    },
    {
      id: "q3",
      text: "Eu tenho dificuldade de começar tarefas mesmo sabendo que são importantes.",
      domain: "iniciativa",
    },
    {
      id: "q4",
      text: "Eu fico muito sensível a críticas ou rejeição.",
      domain: "sensibilidade",
    },
    {
      id: "q5",
      text: "Eu alterno entre dias muito produtivos e dias sem energia.",
      domain: "energia",
    },
    {
      id: "q6",
      text: "Eu me sinto sobrecarregada com muitas demandas ao mesmo tempo.",
      domain: "sobrecarga",
    },
  ],
  profiles: [
    {
      id: "p1",
      name: "Exploradora de Possibilidades",
      minScore: 0,
      maxScore: 6,
      preview:
        "Você tende a variar bem o ritmo e se adapta com facilidade. Às vezes só precisa de um pouco mais de estrutura leve para manter consistência.",
      next:
        "Uma trilha curta de rotina gentil + um check-in diário costuma ajudar.",
    },
    {
      id: "p2",
      name: "Mente Acelerada",
      minScore: 7,
      maxScore: 12,
      preview:
        "Seu dia pode ter muita intensidade mental. Você funciona bem com clareza, mas pode se cansar por excesso de estímulo e cobrança interna.",
      next:
        "Micro-pausas, higiene do sono e um plano simples de foco são os primeiros ganhos.",
    },
    {
      id: "p3",
      name: "Sensível à Sobrecarga",
      minScore: 13,
      maxScore: 18,
      preview:
        "Você pode sentir a vida “pesar” quando as demandas se acumulam. Não é falta de capacidade — é um sinal de que seu sistema pede organização e acolhimento.",
      next:
        "Rotinas de proteção energética e divisão de tarefas em passos pequenos mudam o jogo.",
    },
  ],
};

// Calcula pontuação total e pontuação por domínio
export function scoreAnswers(answers) {
  let total = 0;
  const byDomain = {};

  for (const q of quiz.questions) {
    const v = Number(answers[q.id] ?? 0);
    total += v;
    byDomain[q.domain] = (byDomain[q.domain] ?? 0) + v;
  }

  return { total, byDomain };
}

export function pickProfile(total) {
  const found = quiz.profiles.find((p) => total >= p.minScore && total <= p.maxScore);
  return found ?? quiz.profiles[quiz.profiles.length - 1];
}