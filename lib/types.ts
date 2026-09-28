export type DomainId =
  | "organisationnel"
  | "personnes"
  | "physique"
  | "technologique";

export type Answer = "conforme" | "partiel" | "non_conforme" | "na";

export type DnssiLink = {
  code: string;
  title: string;
};

export type Control = {
  id: string;
  domain: DomainId;
  title: string;
  question: string;
  explanation: string;
  whyItMatters: string;
  howToStart: string;
  criticality: 1 | 2 | 3 | 4 | 5;
  ease: 1 | 2 | 3 | 4 | 5;
  templates: string[];
  dnssi: DnssiLink[];
};

export type DomainMeta = {
  id: DomainId;
  label: string;
  short: string;
  annex: string;
  count: number;
  blurb: string;
};

export type Snapshot = {
  id: string;
  label: string;
  createdAt: string;
  overall: number;
  byDomain: Record<DomainId, number>;
  counts: Record<Answer | "sans_reponse", number>;
};

export type Assessment = {
  orgName: string;
  sector: string;
  city: string;
  targetDate: string;
  startedAt: string;
  updatedAt: string;
  answers: Record<string, Answer>;
  snapshots: Snapshot[];
  doneActions: string[];
  justifications: Record<string, string>;
  isDemo?: boolean;
};
