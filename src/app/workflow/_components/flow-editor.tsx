"use client";

import {
  EDITOR_BACKGROUND_VARIANT_GAP,
  EDITOR_BACKGROUND_VARIANT_SIZE,
} from "@/constants/constants";
import { Workflow } from "@prisma/client";
import { useCallback, useEffect } from "react";
import NodeComponent from "./nodes/node-component";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { createFlowNode } from "@/lib/workflow/create-flow-node";
import { TaskType } from "@/types/task";
import { AppNode } from "@/types/appNode";
import DeletableEdge from "./edges/deletable-edge";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  ScrapeFlowNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

const fitViewOptions = { padding: 1, maxZoom: 1 };

type Props = {
  workflow: Workflow;
};

const FlowEditor = ({ workflow }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);

      if (!flow) return;

      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewport) return;

      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }, [workflow.definition, setNodes, setEdges, setViewport]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    const taskType = event.dataTransfer.getData("application/reactflow");

    if (typeof taskType === undefined || !taskType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = createFlowNode(taskType as TaskType, position);
    setNodes((prevNodes) => prevNodes.concat(newNode));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((prevEdgs) =>
      addEdge({ ...connection, animated: true }, prevEdgs)
    );
  }, []);

  return (
    <main className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background
          variant={BackgroundVariant.Dots}
          gap={EDITOR_BACKGROUND_VARIANT_GAP}
          size={EDITOR_BACKGROUND_VARIANT_SIZE}
        />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
