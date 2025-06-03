"use client";

import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./flow-editor";
import Topbar from "./topbar/topbar";
import TaskMenu from "./task-menu";
import { FlowValidationContextProvider } from "@/context/flow-validation-context";
import { WorkflowStatus } from "@/types/workflow";

type Props = {
  workflow: Workflow;
};

const Editor = ({ workflow }: Props) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className="flex flex-col w-full h-full overflow-hidden">
          <Topbar
            title="Workflow editor"
            subtitle={workflow.name}
            workflowId={workflow.id}
            isPublished={workflow.status === WorkflowStatus.PUBLISHED}
          />
          <section className="flex h-full overflow-auto">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
};

export default Editor;
