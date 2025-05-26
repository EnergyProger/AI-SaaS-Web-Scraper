"use client";

import { getWorkflowExecutionWithPhases } from "@/actions/workflows";
import { DEFAULT_ICON_SIZE } from "@/constants/constants";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  Calendar,
  CircleDashed,
  Clock,
  Coins,
  Loader2,
  WorkflowIcon,
} from "lucide-react";
import React from "react";
import ExecutionLabel from "./execution-label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { datesToDurationString } from "@/lib/helper/dates";
import { getPhasesTotalCost } from "@/lib/helper/phases";

type ExecutionData = Awaited<ReturnType<typeof getWorkflowExecutionWithPhases>>;

type Props = {
  initialData: ExecutionData;
};

const ExecutionViewer = ({ initialData }: Props) => {
  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    initialData,
    queryFn: () => getWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (query) =>
      query.state.data?.status === WorkflowExecutionStatus.RUNNING
        ? 1000
        : false,
  });

  const duration = datesToDurationString(
    query.data?.startedAt,
    query.data?.completedAt
  );

  const creditsConsumed = getPhasesTotalCost(query.data?.phases || []);

  return (
    <div className="flex h-full w-full">
      <aside
        className="w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow
      flex-col overflow-hidden"
      >
        <div className="py-4 px-2">
          <ExecutionLabel
            icon={CircleDashed}
            label="Status"
            value={query.data?.status}
          />
          <ExecutionLabel
            icon={Calendar}
            label="Started at"
            value={
              <span className="lowercase">
                {query.data?.startedAt
                  ? formatDistanceToNow(new Date(query.data.startedAt), {
                      addSuffix: true,
                    })
                  : "-"}
              </span>
            }
          />
          <ExecutionLabel
            icon={Clock}
            label="Duration"
            value={
              duration ? (
                duration
              ) : (
                <Loader2 className="animate-spin" size={DEFAULT_ICON_SIZE} />
              )
            }
          />
          <ExecutionLabel
            icon={Coins}
            label="Credits consumed"
            value={creditsConsumed}
          />
        </div>
        <Separator />
        <div className="flex justify-center items-center py-2 px-4">
          <div className="text-muted-foreground flex items-center gap-2">
            <WorkflowIcon
              size={DEFAULT_ICON_SIZE}
              className="stroke-muted-foreground/80"
            />
            <span className="font-semibold">Phases</span>
          </div>
        </div>
        <Separator />
        <div className="overflow-auto h-full px-2 py-4">
          {query.data?.phases.map((phase, index) => (
            <Button
              key={phase.id}
              className="w-full justify-between"
              variant="ghost"
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline">{index + 1}</Badge>
                <p className="font-semibold">{phase.name}</p>
              </div>
            </Button>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default ExecutionViewer;
