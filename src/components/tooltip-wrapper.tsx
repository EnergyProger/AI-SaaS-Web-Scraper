"use client";

import { TOOLTIP_PROVIDER_DELAY_DURATION } from "@/constants/common";
import { TOOLTIP_SIDE } from "@/types/common";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Props = {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: TOOLTIP_SIDE;
};

const TooltipWrapper = ({ content, children, side }: Props) => {
  if (!content) return children;

  return (
    <TooltipProvider delayDuration={TOOLTIP_PROVIDER_DELAY_DURATION}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
