"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEFAULT_NODE_ICON_SIZE, TASK_ICON_SIZE } from "@/constants/constants";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task";
import { Coins, GripVertical } from "lucide-react";

type Props = {
  taskType: TaskType;
};

const NodeHeader = ({ taskType }: Props) => {
  const task = TaskRegistry[taskType];

  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={TASK_ICON_SIZE} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry point</Badge>}
          <Badge className="gap-2 flex items-center text-xs">
            <Coins size={DEFAULT_NODE_ICON_SIZE} /> TODO
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="drag-handle cursor-grab"
          >
            <GripVertical size={DEFAULT_NODE_ICON_SIZE} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
