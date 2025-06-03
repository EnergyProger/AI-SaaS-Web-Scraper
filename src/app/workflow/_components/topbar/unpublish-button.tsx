"use client";

import { unpublishWorkflow } from "@/actions/workflows";
import { Button } from "@/components/ui/button";
import { TOPBAR_ICON_SIZE } from "@/constants/constants";
import { errorHandler } from "@/lib/helper/error-handler";
import { useMutation } from "@tanstack/react-query";
import { Download } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  workflowId: string;
};

const UnpublishButton = ({ workflowId }: Props) => {
  const mutation = useMutation({
    mutationFn: unpublishWorkflow,
    onSuccess: () => toast.success("Workflow unpublished", { id: workflowId }),
    onError: (error: unknown) => {
      const message = errorHandler(error);
      toast.error(message, { id: workflowId });
    },
  });

  const onUnpublishFlow = (id: string) => {
    toast.loading("Unpublishing workflow...", { id });
    mutation.mutate(id);
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => onUnpublishFlow(workflowId)}
      disabled={mutation.isPending}
    >
      <Download size={TOPBAR_ICON_SIZE} className="stroke-red-400" />
      Unpublish
    </Button>
  );
};

export default UnpublishButton;
