"use client";

import TooltipWrapper from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { DEFAULT_ICON_SIZE } from "@/constants/common";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import SaveButton from "./save-button";
import ExecuteButton from "./execute-button";
import NavigationTabs from "./navigation-tabs";
import PublishButton from "./publish-button";
import UnpublishButton from "./unpublish-button";

type Props = {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButtons?: boolean;
  isPublished?: boolean;
};

const Topbar = ({
  title,
  subtitle,
  workflowId,
  hideButtons = false,
  isPublished = false,
}: Props) => {
  const router = useRouter();

  return (
    <header
      className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px]
    sticky top-0 bg-background z-10"
    >
      <div className="flex flex-1 gap-1">
        <TooltipWrapper content="Back">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft size={DEFAULT_ICON_SIZE} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <NavigationTabs workflowId={workflowId} />
      <div className="flex flex-1 gap-1 justify-end">
        {!hideButtons && (
          <>
            <ExecuteButton workflowId={workflowId} />
            {isPublished && <UnpublishButton workflowId={workflowId} />}
            {!isPublished && (
              <>
                <SaveButton workflowId={workflowId} />
                <PublishButton workflowId={workflowId} />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Topbar;
