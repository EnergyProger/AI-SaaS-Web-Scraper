"use client";

import {
  EDITOR_BACKGROUND_VARIANT_GAP,
  EDITOR_BACKGROUND_VARIANT_SIZE,
} from "@/constants/constants";
import { Workflow } from "@prisma/client";
import { useEffect } from "react";
import NodeComponent from "./nodes/node-component";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  ScrapeFlowNode: NodeComponent,
};

const fitViewOptions = { padding: 1, maxZoom: 1 };

type Props = {
  workflow: Workflow;
};

const FlowEditor = ({ workflow }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport } = useReactFlow();

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

  return (
    <main className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
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
