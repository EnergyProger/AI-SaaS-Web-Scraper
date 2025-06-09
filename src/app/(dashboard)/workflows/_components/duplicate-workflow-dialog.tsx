"use client";

import CustomDialogHeader from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Copy, Layers2 } from "lucide-react";
import React, { useState } from "react";
import DuplicateWorkflowDialogForm from "./duplicate-workflow-dialog-form";
import { cn } from "@/lib/utils";

type Props = {
  workflowId?: string;
};

const DuplicateWorkflowDialog = ({ workflowId }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "ml-2 transition-opacity duration-200 opacity-0 group-hover/card:opacity-100"
          )}
        >
          <Copy className="h-4 w-4 text-muted-foreground cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader icon={Layers2} title="Duplicate workflow" />
        <div className="p-6">
          <DuplicateWorkflowDialogForm
            workflowId={workflowId}
            setIsOpen={setIsOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateWorkflowDialog;
