import React, { memo } from "react";
import { NodeProps } from "@xyflow/react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { AppNodeData } from "@/types/appNode";
import { RegistryTask } from "@/lib/workflow/task/registry";
import NodeInputs from "./node-inputs";
import NodeInput from "./node-input";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = RegistryTask[nodeData.type];

  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput input={input} key={input.name} nodeId={props.id} />
        ))}
      </NodeInputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
