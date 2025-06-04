import { Coins, CornerDownRight, MoveRight } from "lucide-react";
import React from "react";
import SchedulerDialog from "./scheduler-dialog";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { Badge } from "@/components/ui/badge";

type Props = {
  isDraft: boolean;
  creditsCost: number;
  workflowId: string;
  cron: string | null;
};

const ScheduleSection = ({ isDraft, creditsCost, workflowId, cron }: Props) => {
  if (isDraft) return null;

  return (
    <div className="flex items-center gap-2">
      <CornerDownRight className="h-4 w-4 text-muted-foreground" />
      <SchedulerDialog
        workflowId={workflowId}
        cron={cron}
        key={`${cron}-${workflowId}`}
      />
      <MoveRight className="h-4 w-4 text-muted-foreground" />
      <TooltipWrapper content="Credit consumption for full run">
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="space-x-2 text-muted-foreground rounded-sm"
          >
            <Coins className="h-4 w-4" />
            <span className="text-sm">{creditsCost}</span>
          </Badge>
        </div>
      </TooltipWrapper>
    </div>
  );
};

export default ScheduleSection;
