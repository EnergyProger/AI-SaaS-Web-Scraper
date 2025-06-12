"use client";

import { deleteCredential } from "@/actions/credentials";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_ICON_SIZE } from "@/constants/constants";
import { errorHandler } from "@/lib/helper/error-handler";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  name: string;
};

const DeleteCredentialDialog = ({ name }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>("");
  const onChangeConfirmText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmText(event.target.value);

  const deleteMutation = useMutation({
    mutationFn: deleteCredential,
    onSuccess: () => {
      toast.success("Credential deleted successfully", { id: name });
      setConfirmText("");
    },
    onError: (error: unknown) => {
      const message = errorHandler(error);
      toast.error(message, { id: name });
    },
  });

  const onDeleteCredential = (name: string) => {
    toast.loading("Deleting credential...", { id: name });
    deleteMutation.mutate(name);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <X size={DEFAULT_ICON_SIZE} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this credential, it can&apos;t be recovered
            <div className="flex flex-col py-4 gap-2">
              <p>
                If you are sure, enter <b>{name}</b> to confirm:
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
            disabled={confirmText !== name || deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => onDeleteCredential(name)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCredentialDialog;
