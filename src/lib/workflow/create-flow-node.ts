import { AppNode, AppNodePosition } from "@/types/app-node";
import { TaskType } from "@/types/task";

export const createFlowNode = (
  nodeType: TaskType,
  position?: AppNodePosition
): AppNode => {
  return {
    id: crypto.randomUUID(),
    type: "ScrapeFlowNode",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
};
