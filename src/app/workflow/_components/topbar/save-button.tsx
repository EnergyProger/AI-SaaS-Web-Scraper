"use client";

import { updateWorkflow } from "@/actions/workflows";
import { Button } from "@/components/ui/button";
import { TOPBAR_ICON_SIZE } from "@/constants/constants";
import { errorHandler } from "@/lib/helper/error-handler";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { Check } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type SaveWorkflowData = {
  id: string;
  definition: string;
};

type Props = {
  workflowId: string;
};

const SaveButton = ({ workflowId }: Props) => {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: ({ id, definition }: SaveWorkflowData) =>
      updateWorkflow(id, definition),
    onSuccess: () =>
      toast.success("Flow saved successfully", { id: "save-workflow" }),
    onError: (error: unknown) => {
      const message = errorHandler(error);
      toast.error(message, { id: "save-workflow" });
    },
  });

  const onUpdateWorkflow = () => {
    const workflowDefinition = JSON.stringify(toObject());
    toast.loading("Saving workflow...", { id: "save-workflow" });
    saveMutation.mutate({
      id: workflowId,
      definition: workflowDefinition,
    });
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={onUpdateWorkflow}
      disabled={saveMutation.isPending}
    >
      <Check size={TOPBAR_ICON_SIZE} className="stroke-green-400" />
      Save
    </Button>
  );
};

export default SaveButton;
