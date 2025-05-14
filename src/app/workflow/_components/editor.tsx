"use client";

import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./flow-editor";
import Topbar from "./topbar/topbar";

type Props = {
  workflow: Workflow;
};

const Editor = ({ workflow }: Props) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Topbar
          title="Workflow editor"
          subtitle={workflow.name}
          workflowId={workflow.id}
        />
        <section className="flex h-full overflow-auto">
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default Editor;
