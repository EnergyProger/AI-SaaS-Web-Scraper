import { DEFAULT_ICON_SIZE } from "@/constants/constants";
import { ExecutionPhaseStatus } from "@/types/workflow";
import { CircleCheck, CircleDashed, CircleX, Loader2 } from "lucide-react";
import React from "react";

type Props = {
  status: ExecutionPhaseStatus;
};

const PhaseStatusBadge = ({ status }: Props) => {
  switch (status) {
    case ExecutionPhaseStatus.PENDING:
      return (
        <CircleDashed
          size={DEFAULT_ICON_SIZE}
          className="stroke-muted-foreground"
        />
      );
    case ExecutionPhaseStatus.RUNNING:
      return (
        <Loader2
          size={DEFAULT_ICON_SIZE}
          className="animate-spin stroke-yellow-500"
        />
      );
    case ExecutionPhaseStatus.FAILED:
      return (
        <CircleX size={DEFAULT_ICON_SIZE} className="stroke-destructive" />
      );
    case ExecutionPhaseStatus.COMPLETED:
      return (
        <CircleCheck size={DEFAULT_ICON_SIZE} className="stroke-green-500" />
      );
    default:
      return <div className="rounded-full">{status}</div>;
  }
};

export default PhaseStatusBadge;
