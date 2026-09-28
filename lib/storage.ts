import type { Answer, Assessment } from "./types";

const KEY = "smisi-212-assessment-v1";

export const SECTORS = [
  "Offshoring / BPO / centre de contacts",
  "ESN / services informatiques",
  "Éditeur SaaS",
  "SSII interne / DSI de groupe",
  "Autre PME",
] as const;

export function emptyAssessment(): Assessment {
  return {
    orgName: "",
    sector: SECTORS[0],
    city: "Casablanca",
    targetDate: "",
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    answers: {},
    snapshots: [],
    doneActions: [],
    justifications: {},
  };
}

export function loadAssessment(): Assessment {
  if (typeof window === "undefined") return emptyAssessment();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyAssessment();
    const parsed = JSON.parse(raw) as Assessment;
    return {
      ...emptyAssessment(),
      ...parsed,
      answers: parsed.answers ?? {},
      snapshots: parsed.snapshots ?? [],
      doneActions: parsed.doneActions ?? [],
      justifications: parsed.justifications ?? {},
    };
  } catch {
    return emptyAssessment();
  }
}

export function saveAssessment(next: Assessment): void {
  const payload = { ...next, updatedAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(payload));
}

export function resetAssessment(): Assessment {
  const fresh = emptyAssessment();
  localStorage.removeItem(KEY);
  return fresh;
}

export function setAnswer(
  current: Assessment,
  controlId: string,
  answer: Answer | null,
): Assessment {
  const answers = { ...current.answers };
  if (answer === null) delete answers[controlId];
  else answers[controlId] = answer;
  const next = { ...current, answers };
  saveAssessment(next);
  return next;
}
