import { CONTROLS } from "@/data/controls";
import { DOMAIN_ORDER } from "./domains";
import type { Answer, Assessment, DomainId, Snapshot } from "./types";

export const ANSWER_SCORE: Record<Exclude<Answer, "na">, number> = {
  conforme: 1,
  partiel: 0.5,
  non_conforme: 0,
};

export function isScored(answer: Answer | undefined): answer is Exclude<Answer, "na"> {
  return answer === "conforme" || answer === "partiel" || answer === "non_conforme";
}

export function domainScore(
  answers: Record<string, Answer>,
  domain: DomainId,
): number | null {
  const items = CONTROLS.filter((c) => c.domain === domain);
  let total = 0;
  let n = 0;
  for (const c of items) {
    const a = answers[c.id];
    if (isScored(a)) {
      total += ANSWER_SCORE[a];
      n += 1;
    }
  }
  if (n === 0) return null;
  return Math.round((total / n) * 100);
}

export function overallScore(answers: Record<string, Answer>): number | null {
  let total = 0;
  let n = 0;
  for (const c of CONTROLS) {
    const a = answers[c.id];
    if (isScored(a)) {
      total += ANSWER_SCORE[a];
      n += 1;
    }
  }
  if (n === 0) return null;
  return Math.round((total / n) * 100);
}

export function countAnswers(answers: Record<string, Answer>) {
  const counts: Record<Answer | "sans_reponse", number> = {
    conforme: 0,
    partiel: 0,
    non_conforme: 0,
    na: 0,
    sans_reponse: 0,
  };
  for (const c of CONTROLS) {
    const a = answers[c.id];
    if (!a) counts.sans_reponse += 1;
    else counts[a] += 1;
  }
  return counts;
}

export function answeredCount(answers: Record<string, Answer>): number {
  return CONTROLS.filter((c) => Boolean(answers[c.id])).length;
}

export function progressPct(answers: Record<string, Answer>): number {
  return Math.round((answeredCount(answers) / CONTROLS.length) * 100);
}

export function scoresByDomain(answers: Record<string, Answer>) {
  return Object.fromEntries(
    DOMAIN_ORDER.map((id) => [id, domainScore(answers, id)]),
  ) as Record<DomainId, number | null>;
}

export function maturityLabel(score: number | null): string {
  if (score === null) return "Non commencé";
  if (score >= 85) return "Solide";
  if (score >= 70) return "En bonne voie";
  if (score >= 50) return "Intermédiaire";
  if (score >= 30) return "Initial";
  return "Lacunaire";
}

export function makeSnapshot(assessment: Assessment, label: string): Snapshot {
  const byDomain = {} as Record<DomainId, number>;
  for (const id of DOMAIN_ORDER) {
    byDomain[id] = domainScore(assessment.answers, id) ?? 0;
  }
  return {
    id: crypto.randomUUID(),
    label,
    createdAt: new Date().toISOString(),
    overall: overallScore(assessment.answers) ?? 0,
    byDomain,
    counts: countAnswers(assessment.answers),
  };
}
