import { AppNode } from "@/types/app-node";
import { TaskRegistry } from "./task/registry";

export const calculateWorkflowCost = (nodes: AppNode[]) => {
  return nodes.reduce((totalCost, node) => {
    return totalCost + TaskRegistry[node.data.type].credits;
  }, 0);
};
