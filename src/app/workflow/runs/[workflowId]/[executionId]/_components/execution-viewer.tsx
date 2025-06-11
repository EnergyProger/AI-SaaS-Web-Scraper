"use client";

import {
  getWorkflowExecutionWithPhases,
  getWorkflowPhaseDetails,
} from "@/actions/workflows";
import {
  DEFAULT_ICON_SIZE,
  EXECUTION_REFETCH_INTERVAL,
} from "@/constants/constants";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflow";
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
import React, { useEffect, useState } from "react";
import ExecutionLabel from "./execution-label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { datesToDurationString } from "@/lib/helper/dates";
import { getPhasesTotalCost } from "@/lib/helper/phases";
import ParameterViewer from "./parameter-viewer";
import LogViewer from "./log-viewer";
import PhaseStatusBadge from "./phase-status-badge";
import ReactCountUpWrapper from "@/components/react-count-up-wrapper";

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
        ? EXECUTION_REFETCH_INTERVAL
        : false,
  });

  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const phaseDetails = useQuery({
    queryKey: ["phaseDetails", selectedPhase, query.data?.status],
    enabled: selectedPhase !== null,
    queryFn: () => getWorkflowPhaseDetails(selectedPhase!),
  });

  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

  useEffect(() => {
    const phases = query.data?.phases || [];

    if (isRunning) {
      const phaseToSelect = phases.toSorted((a, b) =>
        a.startedAt! > b.startedAt! ? -1 : 1
      )[0];

      setSelectedPhase(phaseToSelect.id);
      return;
    }

    const phaseToSelect = phases.toSorted((a, b) =>
      a.completedAt! > b.completedAt! ? -1 : 1
    )[0];

    setSelectedPhase(phaseToSelect.id);
  }, [query.data?.phases, isRunning, setSelectedPhase]);

  const duration = datesToDurationString(
    query.data?.startedAt,
    query.data?.completedAt
  );

  const creditsConsumed = getPhasesTotalCost(query.data?.phases || []);

  const onSelectedPhase = (phaseId: string, isRunning: boolean) => {
    if (isRunning) return;
    setSelectedPhase(phaseId);
  };

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
            value={
              <div className="font-semibold capitalize flex items-center gap-2">
                <PhaseStatusBadge
                  status={query.data?.status as ExecutionPhaseStatus}
                />
                <span>{query.data?.status}</span>
              </div>
            }
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
            value={<ReactCountUpWrapper value={creditsConsumed} />}
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
              variant={selectedPhase === phase.id ? "secondary" : "ghost"}
              onClick={() => onSelectedPhase(phase.id, isRunning)}
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline">{index + 1}</Badge>
                <p className="font-semibold">{phase.name}</p>
              </div>
              <PhaseStatusBadge status={phase.status as ExecutionPhaseStatus} />
            </Button>
          ))}
        </div>
      </aside>
      <div className="flex h-full w-full">
        {isRunning && (
          <div className="flex flex-col justify-center items-center gap-2 h-full w-full">
            <p className="font-bold">Run is in progress, please wait...</p>
          </div>
        )}
        {!isRunning && !selectedPhase && (
          <div className="flex flex-col justify-center items-center gap-2 h-full w-full">
            <div className="flex flex-col gap-1 text-center">
              <p className="font-bold">No phase selected</p>
              <p className="text-sm text-muted-foreground">
                Select a phase to view details
              </p>
            </div>
          </div>
        )}
        {!isRunning && selectedPhase && phaseDetails.data && (
          <div className="flex flex-col py-4 container gap-4 overflow-auto">
            <div className="flex gap-2 items-center">
              <Badge variant="outline" className="space-x-4">
                <div className="flex gap-1 items-center">
                  <Coins
                    size={DEFAULT_ICON_SIZE}
                    className="stroke-muted-foreground"
                  />
                  <span>Credits</span>
                </div>
                <span>{phaseDetails.data.creditsConsumed}</span>
              </Badge>
              <Badge variant="outline" className="space-x-4">
                <div className="flex gap-1 items-center">
                  <Clock
                    size={DEFAULT_ICON_SIZE}
                    className="stroke-muted-foreground"
                  />
                  <span>Duration</span>
                </div>
                <span>
                  {datesToDurationString(
                    phaseDetails.data.startedAt,
                    phaseDetails.data.completedAt
                  ) || "-"}
                </span>
              </Badge>
            </div>
            <ParameterViewer
              title="Inputs"
              subtitle="Inputs used  for this phase"
              paramsJSON={phaseDetails.data.inputs}
            />
            <ParameterViewer
              title="Outputs"
              subtitle="Outputs generated by this phase"
              paramsJSON={phaseDetails.data.outputs}
            />
            <LogViewer logs={phaseDetails.data.logs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutionViewer;
