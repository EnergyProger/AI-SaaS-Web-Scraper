"use client";

import CustomDialogHeader from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Layers2 } from "lucide-react";
import React, { useState } from "react";
import CreateWorkflowDialogForm from "./create-workflow-dialog-form";

type Props = {
  triggerText?: string;
};

const CreateWorkflowDialog = ({ triggerText }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create a workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2}
          title="Create a workflow"
          subtitle="Start building your workflow"
        />
        <div className="p-6">
          <CreateWorkflowDialogForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
