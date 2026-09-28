import { CONTROLS } from "@/data/controls";
import { DOMAINS, domainMeta } from "./domains";
import { buildPlan } from "./plan";
import { countAnswers, overallScore, scoresByDomain } from "./scoring";
import { getTemplate } from "./templates";
import type { Answer, Assessment } from "./types";

const ANSWER_LABEL: Record<Answer, string> = {
  conforme: "Conforme",
  partiel: "Partiellement conforme",
  non_conforme: "Non conforme",
  na: "Non applicable",
};

function csvEscape(value: string): string {
  const v = value.replace(/"/g, '""');
  return `"${v}"`;
}

export function assessmentToCsv(a: Assessment): string {
  const header = [
    "Code",
    "Domaine",
    "Titre",
    "Statut",
    "Criticité",
    "Facilité",
    "DNSSI",
    "Applicable",
    "Justification",
    "Question",
  ];
  const rows = CONTROLS.map((c) => {
    const dnssi = c.dnssi.map((d) => `${d.code} ${d.title}`).join(" | ");
    const ans = a.answers[c.id];
    return [
      c.id,
      domainMeta(c.domain).label,
      c.title,
      ans ? ANSWER_LABEL[ans] : "Sans réponse",
      String(c.criticality),
      String(c.ease),
      dnssi,
      !ans ? "—" : ans === "na" ? "Non" : "Oui",
      a.justifications[c.id] ?? "",
      c.question,
    ].map(csvEscape);
  });
  return ["\uFEFF" + header.map(csvEscape).join(";"), ...rows.map((r) => r.join(";"))].join(
    "\n",
  );
}

export function planToCsv(a: Assessment): string {
  const plan = buildPlan(a.answers);
  const header = [
    "Priorité",
    "Horizon",
    "Code",
    "Titre",
    "Statut",
    "Impact",
    "Effort",
    "Premier pas",
    "Modèles",
    "DNSSI",
    "Lancée",
  ];
  const rows = plan.map((item, i) =>
    [
      String(i + 1),
      item.horizon,
      item.control.id,
      item.control.title,
      ANSWER_LABEL[item.answer],
      item.impactLabel,
      item.effortLabel,
      item.control.howToStart,
      item.control.templates
        .map((id) => getTemplate(id)?.title ?? id)
        .join(" | "),
      item.control.dnssi.map((d) => d.code).join(" | "),
      a.doneActions.includes(item.control.id) ? "Oui" : "Non",
    ].map(csvEscape),
  );
  return ["\uFEFF" + header.map(csvEscape).join(";"), ...rows.map((r) => r.join(";"))].join(
    "\n",
  );
}

export function downloadText(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const el = document.createElement("a");
  el.href = url;
  el.download = filename;
  el.click();
  URL.revokeObjectURL(url);
}

export async function exportPdf(a: Assessment) {
  const [{ jsPDF }, autoTableMod] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);
  const autoTable = autoTableMod.default;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const score = overallScore(a.answers);
  const byDomain = scoresByDomain(a.answers);
  const counts = countAnswers(a.answers);
  const plan = buildPlan(a.answers);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("SMISI-212 — Diagnostic ISO 27001:2022", 14, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    [
      `Organisation : ${a.orgName || "Non renseignée"}`,
      `Secteur : ${a.sector || "—"}  ·  Ville : ${a.city || "—"}`,
      `Score global : ${score === null ? "—" : `${score} %`}  ·  Écarts au plan : ${plan.length}`,
      `Export : ${new Date().toLocaleDateString("fr-MA")}`,
    ].join("\n"),
    14,
    24,
  );

  autoTable(doc, {
    startY: 46,
    head: [["Domaine", "Score"]],
    body: DOMAINS.map((d) => [
      `${d.annex}  ${d.label}`,
      byDomain[d.id] === null ? "—" : `${byDomain[d.id]} %`,
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [15, 98, 254] },
  });

  autoTable(doc, {
    startY: (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8,
    head: [["Conforme", "Partiel", "Non conforme", "N/A", "Sans réponse"]],
    body: [[
      String(counts.conforme),
      String(counts.partiel),
      String(counts.non_conforme),
      String(counts.na),
      String(counts.sans_reponse),
    ]],
    styles: { fontSize: 9 },
    headStyles: { fillColor: [18, 32, 43] },
  });

  autoTable(doc, {
    startY: (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8,
    head: [["#", "Code", "Action (écart)", "Horizon", "Impact"]],
    body: plan.slice(0, 35).map((item, i) => [
      String(i + 1),
      item.control.id,
      item.control.title,
      item.horizon === "quick_win"
        ? "Gain rapide"
        : item.horizon === "moyen"
          ? "Trimestre"
          : "Structurant",
      item.impactLabel,
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 29, 108] },
    columnStyles: { 2: { cellWidth: 90 } },
  });

  doc.addPage();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Détail des 93 mesures — Annexe A (2022)", 14, 16);

  autoTable(doc, {
    startY: 22,
    head: [["Code", "Domaine", "Titre", "Statut", "Appl.", "DNSSI"]],
    body: CONTROLS.map((c) => [
      c.id,
      domainMeta(c.domain).short,
      c.title,
      a.answers[c.id] ? ANSWER_LABEL[a.answers[c.id]] : "—",
      !a.answers[c.id] ? "—" : a.answers[c.id] === "na" ? "Non" : "Oui",
      c.dnssi.map((d) => d.code).join(", "),
    ]),
    styles: { fontSize: 7 },
    headStyles: { fillColor: [15, 98, 254] },
    columnStyles: { 2: { cellWidth: 70 } },
  });

  const excluded = CONTROLS.filter((c) => a.answers[c.id] === "na");
  if (excluded.length > 0) {
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("SoA — exclusions (non applicables)", 14, 16);
    autoTable(doc, {
      startY: 22,
      head: [["Code", "Titre", "Justification"]],
      body: excluded.map((c) => [
        c.id,
        c.title,
        a.justifications[c.id] || "(justification manquante)",
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [18, 32, 43] },
      columnStyles: { 2: { cellWidth: 110 } },
    });
  }

  doc.save(`SMISI-212_${slug(a.orgName || "diagnostic")}.pdf`);
}

function slug(value: string): string {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "export"
  );
}
