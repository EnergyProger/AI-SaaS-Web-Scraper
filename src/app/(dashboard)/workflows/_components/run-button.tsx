"use client";

import { runWorkflow } from "@/actions/workflows";
import { Button } from "@/components/ui/button";
import { DEFAULT_ICON_SIZE } from "@/constants/common";
import { errorHandler } from "@/lib/helper/error-handler";
import { useMutation } from "@tanstack/react-query";
import { Play } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  workflowId: string;
};

const RunButton = ({ workflowId }: Props) => {
  const mutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => toast.success("Workflow started", { id: workflowId }),
    onError: (error: unknown) => {
      const message = errorHandler(error);
      toast.error(message, { id: workflowId });
    },
  });

  const onRunWorkflow = (id: string) => {
    toast.loading("Scheduling run...", { id });
    mutation.mutate({
      workflowId: id,
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => onRunWorkflow(workflowId)}
    >
      <Play size={DEFAULT_ICON_SIZE} />
      Run
    </Button>
  );
};

export default RunButton;
