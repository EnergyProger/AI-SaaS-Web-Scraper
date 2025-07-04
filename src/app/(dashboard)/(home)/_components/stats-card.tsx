import ReactCountUpWrapper from "@/components/react-count-up-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_ICON_SIZE } from "@/constants/analytics";
import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  value: number;
  icon: LucideIcon;
};

const StatsCard = (props: Props) => {
  return (
    <Card className="relative overflow-hidden h-full">
      <CardHeader className="flex pb-2">
        <CardTitle>{props.title}</CardTitle>
        <props.icon
          size={ANALYTICS_ICON_SIZE}
          className="text-muted-foreground absolute -bottom-4 -right-8 stroke-primary opacity-10"
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">
          <ReactCountUpWrapper value={props.value} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
