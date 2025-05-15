"use client";

import { COLOR_FOR_NODE_HANDLE } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import React from "react";

type Props = {
  output: TaskParam;
};

const NodeOutput = ({ output }: Props) => {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4",
          COLOR_FOR_NODE_HANDLE[output.type]
        )}
      />
    </div>
  );
};

export default NodeOutput;
