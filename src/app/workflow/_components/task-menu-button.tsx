import { Button } from "@/components/ui/button";
import { DEFAULT_ICON_SIZE } from "@/constants/constants";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task";
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
    </Button>
  );
};

export default TaskMenuButton;
