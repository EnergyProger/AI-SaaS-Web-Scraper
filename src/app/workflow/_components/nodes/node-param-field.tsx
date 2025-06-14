"use client";

import { TaskParam, TaskParamType } from "@/types/task";
import React, { useCallback } from "react";
import StringParam from "./params/string-param";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/types/app-node";
import BrowserInstanceParam from "./params/browser-instance-param";
import SelectParam from "./params/select-param";
import CredentialsParam from "./params/credentials-param";

type Props = {
  param: TaskParam;
  nodeId: string;
  disabled: boolean;
};

const NodeParamField = ({ param, nodeId, disabled }: Props) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (value: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: value,
        },
      });
    },
    [nodeId, updateNodeData, param.name, node?.data.inputs]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return <BrowserInstanceParam param={param} />;
    case TaskParamType.SELECT:
      return (
        <SelectParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.CREDENTIAL:
      return (
        <CredentialsParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
