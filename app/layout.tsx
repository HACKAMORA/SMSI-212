import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { AssessmentProvider } from "@/lib/assessment-context";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMISI-212 — Conformité ISO 27001 pour PME marocaines",
  description:
    "Plateforme de conformité ISO 27001:2022 et pont DNSSI pour ESN, BPO et éditeurs SaaS au Maroc.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${sans.variable} font-sans`}>
        <AssessmentProvider>{children}</AssessmentProvider>
      </body>
    </html>
  );
}
