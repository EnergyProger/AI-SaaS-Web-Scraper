import ExecutionStatusIndicator from "@/app/workflow/runs/[workflowId]/_components/execution-status-indicator";
import ExecutionStatusLabel from "@/app/workflow/runs/[workflowId]/_components/execution-status-label";
import { WORKFLOW_CARD_LAST_RUN_ICON_SIZE } from "@/constants/constants";
import { WorkflowExecutionStatus, WorkflowStatus } from "@/types/workflow";
import { Workflow } from "@prisma/client";
import { format, formatDistanceToNow } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  workflow: Workflow;
};

const LastRunDetails = ({ workflow }: Props) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  if (isDraft) return null;

  const { lastRunAt, lastRunStatus, lastRunId, nextRunAt } = workflow;
  const formattedStartedAt =
    lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true });

  const nextSchedule = nextRunAt && format(nextRunAt, "yyyy-MM-dd HH:mm");
  const nextScheduleUTC =
    nextRunAt && formatInTimeZone(nextRunAt, "UTC", "HH:mm");

  return (
    <div className="bg-primary/5 px-4 py-1 flex justify-between items-center text-muted-foreground">
      <div className="flex items-center text-sm gap-2">
        {lastRunAt && (
          <Link
            href={`/workflow/runs/${workflow.id}/${lastRunId}`}
            className="flex items-center text-sm gap-2 group"
          >
            <span>Last run:</span>
            <ExecutionStatusIndicator
              status={lastRunStatus as WorkflowExecutionStatus}
            />
            <ExecutionStatusLabel
              status={lastRunStatus as WorkflowExecutionStatus}
            />
            <span>{formattedStartedAt}</span>
            <ChevronRight
              size={WORKFLOW_CARD_LAST_RUN_ICON_SIZE}
              className="-translate-x-[2px] group-hover:translate-x-0 transition"
            />
          </Link>
        )}
        {!lastRunAt && <p>No runs yet</p>}
      </div>
      {nextRunAt && (
        <div className="flex items-center text-sm gap-2">
          <Clock size={WORKFLOW_CARD_LAST_RUN_ICON_SIZE} />
          <span>Next run at:</span>
          <span>{nextSchedule}</span>
          <span className="text-xs">({nextScheduleUTC} UTC)</span>
        </div>
      )}
    </div>
  );
};

export default LastRunDetails;
