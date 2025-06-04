"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  WORKFLOW_CARD_EDIT_ICON_SIZE,
  WORKFLOW_STATUS_COLORS,
} from "@/constants/constants";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/types/workflow";
import { Workflow } from "@prisma/client";
import { FileText, Play, Shuffle } from "lucide-react";
import Link from "next/link";
import React from "react";
import WorkflowActions from "./workflow-actions";
import RunButton from "./run-button";
import ScheduleSection from "./schedule-section";
import LastRunDetails from "./last-run-details";

type Props = {
  workflow: Workflow;
};

const WorkflowCard = ({ workflow }: Props) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  return (
    <Card
      className="border border-separate shadow-sm rounded-lg overflow-hidden
    hover:shadow-md dark:shadow-primary/30"
    >
      <CardContent className="p-4 flex justify-between items-center h-[100px]">
        <div className="flex justify-end items-center space-x-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex justify-center items-center",
              WORKFLOW_STATUS_COLORS[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileText className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className="flex items-center hover:underline"
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span
                  className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800
              rounded-full"
                >
                  Draft
                </span>
              )}
            </h3>
            <ScheduleSection
              isDraft={isDraft}
              creditsCost={workflow.creditsCost}
              workflowId={workflow.id}
              cron={workflow.cron}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isDraft && <RunButton workflowId={workflow.id} />}
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center gap-2"
            )}
          >
            <Shuffle size={WORKFLOW_CARD_EDIT_ICON_SIZE} />
            Edit
          </Link>
          <WorkflowActions
            workflowId={workflow.id}
            workflowName={workflow.name}
          />
        </div>
      </CardContent>
      <LastRunDetails workflow={workflow} />
    </Card>
  );
};

export default WorkflowCard;
