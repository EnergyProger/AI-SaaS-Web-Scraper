import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEFAULT_ICON_SIZE } from "@/constants/common";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task";
import { Coins } from "lucide-react";
import React from "react";

type Props = {
  taskType: TaskType;
};

const TaskMenuButton = ({ taskType }: Props) => {
  const task = TaskRegistry[taskType];

  const onDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant="secondary"
      className="flex justify-between items-center gap-2 border w-full"
      draggable
      onDragStart={(event) => onDragStart(event, taskType)}
    >
      <div className="flex gap-2">
        <task.icon size={DEFAULT_ICON_SIZE} />
        {task.label}
      </div>
      <Badge className="flex items-center gap-2" variant="outline">
        <Coins size={DEFAULT_ICON_SIZE} />
        {task.credits}
      </Badge>
    </Button>
  );
};

export default TaskMenuButton;
