import { Phase } from "@/types/phase";

export const getPhasesTotalCost = (phases: Phase[]) => {
  return phases.reduce((acc, phase) => acc + (phase.creditsConsumed || 0), 0);
};
