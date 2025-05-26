import { DEFAULT_ICON_SIZE } from "@/constants/constants";
import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  icon: LucideIcon;
  label: React.ReactNode;
  value: React.ReactNode;
};

const ExecutionLabel = ({ icon, label, value }: Props) => {
  const Icon = icon;

  return (
    <div className="flex justify-between items-center py-2 px-4 text-sm">
      <div className="text-muted-foreground flex items-center gap-2">
        <Icon size={DEFAULT_ICON_SIZE} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="font-semibold capitalize flex gap-2 items-center">
        {value}
      </div>
    </div>
  );
};

export default ExecutionLabel;
