import type { DomainId, DomainMeta } from "./types";

export const DOMAINS: DomainMeta[] = [
  {
    id: "organisationnel",
    label: "Organisationnel",
    short: "Org.",
    annex: "A.5",
    count: 37,
    blurb: "Gouvernance, politiques, fournisseurs, incidents, conformité.",
  },
  {
    id: "personnes",
    label: "Personnes",
    short: "RH",
    annex: "A.6",
    count: 8,
    blurb: "Recrutement, clauses, sensibilisation, télétravail, signalement.",
  },
  {
    id: "physique",
    label: "Physique",
    short: "Phys.",
    annex: "A.7",
    count: 14,
    blurb: "Locaux, badge, supports, électricité, destruction du matériel.",
  },
  {
    id: "technologique",
    label: "Technologique",
    short: "Tech",
    annex: "A.8",
    count: 34,
    blurb: "Accès, sauvegardes, logs, réseau, crypto, développement.",
  },
];

export const DOMAIN_ORDER: DomainId[] = [
  "organisationnel",
  "personnes",
  "physique",
  "technologique",
];

export function domainMeta(id: DomainId): DomainMeta {
  return DOMAINS.find((d) => d.id === id)!;
}
