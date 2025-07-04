"use client";

import { purchaseCredits } from "@/actions/billing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { errorHandler } from "@/lib/helper/error-handler";
import { CreditsPack, PackId } from "@/types/billing";
import { useMutation } from "@tanstack/react-query";
import { Coins, CreditCard } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const CreditsPurchase = () => {
  const [selectedPack, setSelectedPack] = useState<PackId>(PackId.MEDIUM);

  const mutation = useMutation({
    mutationFn: purchaseCredits,
    onSuccess: () => {},
    onError: (error: unknown) => {
      const message = errorHandler(error);
      toast.error(message, { id: "purchase-credits" });
    },
  });

  const handlePackChange = (value: PackId) => setSelectedPack(value);

  const handlePurchaseCredits = (selectedPack: PackId) => {
    toast.loading("Purchasing credits...", { id: "purchase-credits" });
    mutation.mutate(selectedPack);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Coins className="h-6 w-6 text-primary" />
          Purchase credits
        </CardTitle>
        <CardDescription>
          Select the number of credits you want to purchase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup onValueChange={handlePackChange} value={selectedPack}>
          {CreditsPack.map((pack) => (
            <div
              key={pack.id}
              className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-3 hover:bg-secondary"
              onClick={() => handlePackChange(pack.id)}
            >
              <RadioGroupItem value={pack.id} id={pack.id} />
              <Label className="flex justify-between w-full cursor-pointer">
                <span className="font-medium">
                  {pack.name} - {pack.label}
                </span>
                <span className="font-bold text-primary">
                  ${(pack.price / 100).toFixed(2)}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={mutation.isPending}
          onClick={() => handlePurchaseCredits(selectedPack)}
        >
          <CreditCard className="mr-2 h-5 w-5" /> Purchase credits
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreditsPurchase;
