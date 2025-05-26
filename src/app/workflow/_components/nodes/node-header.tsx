"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  COPY_NODE_POSITION_X,
  DEFAULT_NODE_ICON_SIZE,
  TASK_ICON_SIZE,
} from "@/constants/constants";
import { createFlowNode } from "@/lib/workflow/create-flow-node";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNode } from "@/types/app-node";
import { TaskType } from "@/types/task";
import { useReactFlow } from "@xyflow/react";
import { Coins, Copy, GripVertical, Trash } from "lucide-react";

type Props = {
  taskType: TaskType;
  nodeId: string;
};

const NodeHeader = ({ taskType, nodeId }: Props) => {
  const task = TaskRegistry[taskType];
  const { deleteElements, getNode, addNodes } = useReactFlow();

  const deleteNode = (id: string) =>
    deleteElements({
      nodes: [{ id }],
    });

  const copyNode = (id: string) => {
    const node = getNode(id) as AppNode;

    const newX = node.position.x + node.measured?.width! + COPY_NODE_POSITION_X;
    const newY = node.position.y;

    const newNode = createFlowNode(node.data.type, { x: newX, y: newY });

    addNodes([newNode]);
  };

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
            <Coins size={DEFAULT_NODE_ICON_SIZE} /> {task.credits}
          </Badge>
          {!task.isEntryPoint && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteNode(nodeId)}
              >
                <Trash size={DEFAULT_NODE_ICON_SIZE} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyNode(nodeId)}
              >
                <Copy size={DEFAULT_NODE_ICON_SIZE} />
              </Button>
            </>
          )}
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
