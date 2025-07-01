import { getAvailableCredits } from "@/actions/billing";
import ReactCountUpWrapper from "@/components/react-count-up-wrapper";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BILLING_BALANCE_CARD_ICON_SIZE } from "@/constants/billing";
import { Coins } from "lucide-react";
import React from "react";

const BalanceCard = async () => {
  const userBalance = await getAvailableCredits();

  return (
    <Card
      className="bg-gradient-to-br from-primary/10 via-primary/5 
    to-background border-primary/20 shadow-lg flex justify-between flex-col overflow-hidden"
    >
      <CardContent className="p-6 relative items-center">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Available credits
            </h3>
            <p className="text-4xl font-bold text-primary">
              <ReactCountUpWrapper value={userBalance} />
            </p>
          </div>
          <Coins
            size={BILLING_BALANCE_CARD_ICON_SIZE}
            className="text-primary opacity-20 absolute bottom-0 right-0"
          />
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        If your credit balance reaches zero, your workflows will be paused
      </CardFooter>
    </Card>
  );
};

export default BalanceCard;
