import TooltipWrapper from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WORKFLOW_CARD_ACTIONS_ICON_SIZE } from "@/constants/workflows";
import { MoreVertical, Trash } from "lucide-react";
import React, { useState } from "react";
import DeleteWorkflowDialog from "./delete-workflow-dialog";

type Props = {
  workflowId: string;
  workflowName: string;
};

const WorkflowActions = ({ workflowId, workflowName }: Props) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  return (
    <>
      <DeleteWorkflowDialog
        isOpen={showDeleteDialog}
        setIsOpen={setShowDeleteDialog}
        workflowId={workflowId}
        workflowName={workflowName}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <TooltipWrapper content="More actions">
              <div className="flex justify-center items-center w-full h-full">
                <MoreVertical size={WORKFLOW_CARD_ACTIONS_ICON_SIZE} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onSelect={() => setShowDeleteDialog((prevState) => !prevState)}
          >
            <Trash size={WORKFLOW_CARD_ACTIONS_ICON_SIZE} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default WorkflowActions;
