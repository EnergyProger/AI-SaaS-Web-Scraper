"use client";

import { publishWorkflow } from "@/actions/workflows";
import { Button } from "@/components/ui/button";
import { TOPBAR_ICON_SIZE } from "@/constants/constants";
import { useExecutionPlan } from "@/hooks/use-execution-plan";
import { errorHandler } from "@/lib/helper/error-handler";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { Upload } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  workflowId: string;
};

const PublishButton = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: publishWorkflow,
    onSuccess: () => toast.success("Workflow published", { id: workflowId }),
    onError: (error: unknown) => {
      const message = errorHandler(error);
      toast.error(message, { id: workflowId });
    },
  });

  const onPublishFlow = (id: string) => {
    const plan = generate();

    if (!plan) {
      return;
    }

    toast.loading("Publishing workflow...", { id });

    mutation.mutate({
      id,
      flowDefinition: JSON.stringify(toObject()),
    });
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => onPublishFlow(workflowId)}
      disabled={mutation.isPending}
    >
      <Upload size={TOPBAR_ICON_SIZE} className="stroke-blue-400" />
      Publish
    </Button>
  );
};

export default PublishButton;
