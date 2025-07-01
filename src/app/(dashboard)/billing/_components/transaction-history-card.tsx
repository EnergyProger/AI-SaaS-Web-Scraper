import { getUserPurchaseHistory } from "@/actions/billing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatAmount } from "@/lib/helper/billing";
import { formatDate } from "@/lib/helper/dates";
import { ArrowLeftRight } from "lucide-react";
import React from "react";
import InvoiceButton from "./invoice-button";

const TransactionHistoryCard = async () => {
  const purchases = await getUserPurchaseHistory();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ArrowLeftRight className="h-6 w-6 text-primary" />
          Transaction history
        </CardTitle>
        <CardDescription>
          View your transaction history and download invoices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {purchases.length === 0 && (
          <p className="text-muted-foreground">No transactions found</p>
        )}
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="flex justify-between items-center py-3 border-b last:border-b-0"
          >
            <div>
              <p className="font-medium">{formatDate(purchase.date)}</p>
              <p className="text-sm text-muted-foreground">
                {purchase.description}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {formatAmount(purchase.amount, purchase.currency)}
              </p>
              <InvoiceButton id={purchase.id} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TransactionHistoryCard;
