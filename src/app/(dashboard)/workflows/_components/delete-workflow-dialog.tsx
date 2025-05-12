"use client";

import { deleteWorkflow } from "@/actions/workflows";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  workflowId: string;
  workflowName: string;
};

const DeleteWorkflowDialog = ({
  isOpen,
  setIsOpen,
  workflowId,
  workflowName,
}: Props) => {
  const [confirmText, setConfirmText] = useState<string>("");
  const onChangeConfirmText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmText(event.target.value);

  const deleteMutation = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted successfully", { id: workflowId });
      setConfirmText("");
    },
    onError: () =>
      toast.error("Failed to delete the workflow", { id: workflowId }),
  });

  const onDeleteWorkflow = () => {
    toast.loading("Deleting workflow...", { id: workflowId });
    deleteMutation.mutate(workflowId);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this workflow, it can&apos;t be recovered
            <div className="flex flex-col py-4 gap-2">
              <p>
                If you are sure, enter <b>{workflowName}</b> to confirm:
              </p>
              <Input value={confirmText} onChange={onChangeConfirmText} />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== workflowName || deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onDeleteWorkflow}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkflowDialog;
