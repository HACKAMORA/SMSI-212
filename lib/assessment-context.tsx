"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { buildDemoAssessment } from "@/data/demo";
import { makeSnapshot } from "./scoring";
import {
  emptyAssessment,
  loadAssessment,
  resetAssessment,
  saveAssessment,
  setAnswer as persistAnswer,
} from "./storage";
import type { Answer, Assessment } from "./types";

type Ctx = {
  ready: boolean;
  assessment: Assessment;
  setMeta: (patch: Partial<Pick<Assessment, "orgName" | "sector" | "city" | "targetDate">>) => void;
  answer: (controlId: string, value: Answer | null) => void;
  setJustification: (controlId: string, text: string) => void;
  toggleDone: (controlId: string) => void;
  snapshot: (label: string) => void;
  loadDemo: () => void;
  reset: () => void;
};

const AssessmentContext = createContext<Ctx | null>(null);

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [assessment, setAssessment] = useState<Assessment>(emptyAssessment);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAssessment(loadAssessment());
    setReady(true);
  }, []);

  const setMeta: Ctx["setMeta"] = useCallback((patch) => {
    setAssessment((prev) => {
      const next = { ...prev, ...patch };
      saveAssessment(next);
      return { ...next, updatedAt: new Date().toISOString() };
    });
  }, []);

  const answer: Ctx["answer"] = useCallback((controlId, value) => {
    setAssessment((prev) => persistAnswer(prev, controlId, value));
  }, []);

  const setJustification: Ctx["setJustification"] = useCallback((controlId, text) => {
    setAssessment((prev) => {
      const justifications = { ...prev.justifications };
      if (text.trim()) justifications[controlId] = text;
      else delete justifications[controlId];
      const next = { ...prev, justifications };
      saveAssessment(next);
      return next;
    });
  }, []);

  const toggleDone: Ctx["toggleDone"] = useCallback((controlId) => {
    setAssessment((prev) => {
      const set = new Set(prev.doneActions);
      if (set.has(controlId)) set.delete(controlId);
      else set.add(controlId);
      const next = { ...prev, doneActions: [...set] };
      saveAssessment(next);
      return next;
    });
  }, []);

  const loadDemo = useCallback(() => {
    const demo = buildDemoAssessment();
    saveAssessment(demo);
    setAssessment(demo);
  }, []);

  const snapshot: Ctx["snapshot"] = useCallback((label) => {
    setAssessment((prev) => {
      const snap = makeSnapshot(prev, label);
      const next = { ...prev, snapshots: [...prev.snapshots, snap] };
      saveAssessment(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setAssessment(resetAssessment());
  }, []);

  const value = useMemo(
    () => ({
      ready,
      assessment,
      setMeta,
      answer,
      setJustification,
      toggleDone,
      snapshot,
      loadDemo,
      reset,
    }),
    [ready, assessment, setMeta, answer, setJustification, toggleDone, snapshot, loadDemo, reset],
  );

  return (
    <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used within AssessmentProvider");
  return ctx;
}
