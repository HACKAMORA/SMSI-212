import type { Control, DomainId } from "@/lib/types";
import { CONTROLS_ORG } from "./controls-org";
import { CONTROLS_PEOPLE } from "./controls-people";
import { CONTROLS_PHYS } from "./controls-phys";
import { CONTROLS_TECH } from "./controls-tech";

export const CONTROLS: Control[] = [
  ...CONTROLS_ORG,
  ...CONTROLS_PEOPLE,
  ...CONTROLS_PHYS,
  ...CONTROLS_TECH,
];

export const CONTROLS_BY_ID: Record<string, Control> = Object.fromEntries(
  CONTROLS.map((c) => [c.id, c]),
);

export function controlsInDomain(domain: DomainId): Control[] {
  return CONTROLS.filter((c) => c.domain === domain);
}

export function getControl(id: string): Control | undefined {
  return CONTROLS_BY_ID[id];
}
