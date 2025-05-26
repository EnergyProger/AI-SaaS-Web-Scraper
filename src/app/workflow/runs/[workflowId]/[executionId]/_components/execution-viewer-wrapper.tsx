import { getWorkflowExecutionWithPhases } from "@/actions/workflows";
import React from "react";
import ExecutionViewer from "./execution-viewer";

type Props = {
  executionId: string;
};

const ExecutionViewerWrapper = async ({ executionId }: Props) => {
  const workflowExecution = await getWorkflowExecutionWithPhases(executionId);

  if (!workflowExecution) {
    return <div>Not found</div>;
  }

  return <ExecutionViewer initialData={workflowExecution} />;
};

export default ExecutionViewerWrapper;
