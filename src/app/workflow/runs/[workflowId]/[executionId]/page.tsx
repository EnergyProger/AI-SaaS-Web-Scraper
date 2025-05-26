import Topbar from "@/app/workflow/_components/topbar/topbar";
import React, { Suspense } from "react";
import ExecutionViewerWrapper from "./_components/execution-viewer-wrapper";
import { Loader2 } from "lucide-react";

type Props = {
  params: {
    workflowId: string;
    executionId: string;
  };
};

const ExecutionViewerPage = ({ params }: Props) => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        workflowId={params.workflowId}
        title="Workflow run details"
        subtitle={`Run ID: ${params.executionId}`}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full justify-center items-center">
              <Loader2 className="h-10 w-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={params.executionId} />
        </Suspense>
      </section>
    </div>
  );
};

export default ExecutionViewerPage;
