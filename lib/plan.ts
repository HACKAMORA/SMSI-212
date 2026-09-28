import { CONTROLS } from "@/data/controls";
import { getTemplate } from "./templates";
import type { Answer, Control } from "./types";

export type Horizon = "quick_win" | "moyen" | "structurant";

export type ActionItem = {
  control: Control;
  answer: Answer;
  priority: number;
  horizon: Horizon;
  effortLabel: string;
  impactLabel: string;
};

export function buildPlan(answers: Record<string, Answer>): ActionItem[] {
  const items: ActionItem[] = [];
  for (const control of CONTROLS) {
    const answer = answers[control.id];
    if (answer !== "non_conforme" && answer !== "partiel") continue;
    const gapBoost = answer === "non_conforme" ? 1.15 : 1;
    const priority = control.criticality * control.ease * gapBoost;
    items.push({
      control,
      answer,
      priority: Math.round(priority * 10) / 10,
      horizon: horizonOf(control),
      effortLabel: effortLabel(control.ease),
      impactLabel: impactLabel(control.criticality),
    });
  }
  return items.sort((a, b) => b.priority - a.priority);
}

function horizonOf(control: Control): Horizon {
  if (control.criticality >= 4 && control.ease >= 4) return "quick_win";
  if (control.criticality >= 4 && control.ease <= 2) return "structurant";
  if (control.ease <= 2) return "structurant";
  return "moyen";
}

function effortLabel(ease: number): string {
  if (ease >= 5) return "Quelques heures";
  if (ease >= 4) return "Quelques jours";
  if (ease >= 3) return "1 à 3 semaines";
  if (ease >= 2) return "Un mois ou plus";
  return "Chantier de trimestre";
}

function impactLabel(crit: number): string {
  if (crit >= 5) return "Critique pour la certif";
  if (crit >= 4) return "Fort";
  if (crit >= 3) return "Utile";
  return "Secondaire";
}

export const HORIZON_META: Record<
  Horizon,
  { label: string; hint: string }
> = {
  quick_win: {
    label: "Gains rapides",
    hint: "Fort impact, relativement simple — à lancer ce mois-ci.",
  },
  moyen: {
    label: "Palier intermédiaire",
    hint: "À planifier sur le trimestre.",
  },
  structurant: {
    label: "Chantiers structurants",
    hint: "Plus lourds : budget, prestataire ou arbitrage direction.",
  },
};

export function templateTitles(ids: string[]): string[] {
  return ids
    .map((id) => getTemplate(id)?.title)
    .filter((t): t is string => Boolean(t));
}
