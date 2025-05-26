import { ExecutionPhase } from "@prisma/client";

export type Phase = Pick<ExecutionPhase, "creditsConsumed">;
