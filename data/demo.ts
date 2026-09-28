import { CONTROLS } from "./controls";
import type { Answer, Assessment } from "@/lib/types";

const DEV_NA = new Set([
  "8.4",
  "8.11",
  "8.25",
  "8.26",
  "8.27",
  "8.28",
  "8.29",
  "8.30",
  "8.31",
  "8.33",
]);

const SPECIFIC: Record<string, Answer> = {
  "5.1": "non_conforme",
  "5.2": "partiel",
  "5.3": "non_conforme",
  "5.4": "partiel",
  "5.5": "partiel",
  "5.6": "conforme",
  "5.7": "non_conforme",
  "5.8": "partiel",
  "5.9": "partiel",
  "5.10": "conforme",
  "5.11": "partiel",
  "5.12": "non_conforme",
  "5.13": "non_conforme",
  "5.14": "partiel",
  "5.15": "partiel",
  "5.16": "partiel",
  "5.17": "partiel",
  "5.18": "non_conforme",
  "5.19": "partiel",
  "5.20": "partiel",
  "5.21": "non_conforme",
  "5.22": "non_conforme",
  "5.23": "partiel",
  "5.24": "partiel",
  "5.25": "non_conforme",
  "5.26": "partiel",
  "5.27": "non_conforme",
  "5.28": "non_conforme",
  "5.29": "non_conforme",
  "5.30": "partiel",
  "5.31": "partiel",
  "5.32": "partiel",
  "5.33": "partiel",
  "5.34": "partiel",
  "5.35": "non_conforme",
  "5.36": "non_conforme",
  "5.37": "partiel",
  "6.1": "partiel",
  "6.2": "conforme",
  "6.3": "partiel",
  "6.4": "partiel",
  "6.5": "partiel",
  "6.6": "conforme",
  "6.7": "partiel",
  "6.8": "partiel",
  "7.1": "partiel",
  "7.2": "partiel",
  "7.3": "partiel",
  "7.4": "partiel",
  "7.5": "partiel",
  "7.6": "partiel",
  "7.7": "conforme",
  "7.8": "partiel",
  "7.9": "non_conforme",
  "7.10": "partiel",
  "7.11": "partiel",
  "7.12": "partiel",
  "7.13": "partiel",
  "7.14": "non_conforme",
  "8.1": "partiel",
  "8.2": "non_conforme",
  "8.3": "partiel",
  "8.5": "non_conforme",
  "8.6": "partiel",
  "8.7": "conforme",
  "8.8": "partiel",
  "8.9": "non_conforme",
  "8.10": "non_conforme",
  "8.12": "non_conforme",
  "8.13": "partiel",
  "8.14": "non_conforme",
  "8.15": "partiel",
  "8.16": "non_conforme",
  "8.17": "conforme",
  "8.18": "partiel",
  "8.19": "partiel",
  "8.20": "non_conforme",
  "8.21": "partiel",
  "8.22": "non_conforme",
  "8.23": "partiel",
  "8.24": "partiel",
  "8.32": "partiel",
  "8.34": "partiel",
};

const NA_JUSTIF =
  "Non applicable : Atlas Connect n'édite pas de produit logiciel. Les développements se limitent à quelques scripts internes du DSI, hors périmètre client. À revoir si un portail ou un outil métier est industrialisé.";

export function buildDemoAssessment(): Assessment {
  const answers: Record<string, Answer> = {};
  const justifications: Record<string, string> = {};

  for (const c of CONTROLS) {
    if (DEV_NA.has(c.id)) {
      answers[c.id] = "na";
      justifications[c.id] = NA_JUSTIF;
    } else {
      answers[c.id] = SPECIFIC[c.id] ?? "partiel";
    }
  }

  return {
    orgName: "Atlas Connect",
    sector: "Offshoring / BPO / centre de contacts",
    city: "Casablanca",
    targetDate: "2027-06",
    startedAt: "2026-05-12T09:00:00.000Z",
    updatedAt: new Date().toISOString(),
    answers,
    doneActions: ["5.2", "6.3", "8.13"],
    justifications,
    isDemo: true,
    snapshots: [
      {
        id: "demo-zero",
        label: "Point zéro — mai 2026",
        createdAt: "2026-05-12T10:00:00.000Z",
        overall: 36,
        byDomain: {
          organisationnel: 38,
          personnes: 50,
          physique: 36,
          technologique: 24,
        },
        counts: {
          conforme: 4,
          partiel: 28,
          non_conforme: 48,
          na: 10,
          sans_reponse: 3,
        },
      },
    ],
  };
}
