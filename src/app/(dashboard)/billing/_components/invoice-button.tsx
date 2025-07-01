"use client";

import { downloadInvoice } from "@/actions/billing";
import { Button } from "@/components/ui/button";
import { errorHandler } from "@/lib/helper/error-handler";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  id: string;
};

const InvoiceButton = ({ id }: Props) => {
  const mutation = useMutation({
    mutationFn: downloadInvoice,
    onSuccess: (data) => (window.location.href = data as string),
    onError: (error: unknown) => {
      const message = errorHandler(error);
      toast.error(message, { id: "download-invoice" });
    },
  });

  const handleDownloadInvoice = (id: string) => {
    toast.loading("Preparing invoice...", { id: "download-invoice" });
    mutation.mutate(id);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-xs gap-2 text-muted-foreground px-1"
      disabled={mutation.isPending}
      onClick={() => handleDownloadInvoice(id)}
    >
      Invoice
      {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
    </Button>
  );
};

export default InvoiceButton;
