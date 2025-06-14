"use client";

import CustomDialogHeader from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShieldEllipsis } from "lucide-react";
import React, { useState } from "react";
import CreateCredentialDialogForm from "./create-credential-dialog-form";

type Props = {
  triggerText?: string;
};

const CreateCredentialDialog = ({ triggerText }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader icon={ShieldEllipsis} title="Create a credential" />
        <div className="p-6">
          <CreateCredentialDialogForm setIsOpen={setIsOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCredentialDialog;
