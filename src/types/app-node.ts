import { Node } from "@xyflow/react";
import { TaskType } from "./task";

export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface AppNode extends Node {
  data: AppNodeData;
}

export interface AppNodePosition {
  x: number;
  y: number;
}

export type AppNodeMissingInputs = {
  nodeId: string;
  inputs: string[];
};
