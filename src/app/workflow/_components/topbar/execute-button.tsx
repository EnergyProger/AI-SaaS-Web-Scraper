"use client";

import { runWorkflow } from "@/actions/workflows";
import { Button } from "@/components/ui/button";
import { TOPBAR_ICON_SIZE } from "@/constants/constants";
import { useExecutionPlan } from "@/hooks/use-execution-plan";
import { errorHandler } from "@/lib/helper/error-handler";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { Play } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  workflowId: string;
};

const ExecuteButton = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () =>
      toast.success("Execution started", { id: "flow-execution" }),
    onError: (error: unknown) => {
      const message = errorHandler(error);
      toast.error(message, { id: "flow-execution" });
    },
  });

  const onExecuteFlow = (id: string) => {
    const plan = generate();

    if (!plan) {
      return;
    }

    mutation.mutate({
      workflowId: id,
      flowDefinition: JSON.stringify(toObject()),
    });
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => onExecuteFlow(workflowId)}
      disabled={mutation.isPending}
    >
      <Play size={TOPBAR_ICON_SIZE} className="stroke-orange-400" />
      Execute
    </Button>
  );
};

export default ExecuteButton;
