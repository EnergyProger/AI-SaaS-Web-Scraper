import React, { Suspense } from "react";
import Topbar from "../../_components/topbar/topbar";
import ExecutionsTableWrapper from "./_components/executions-table-wrapper";
import { Loader2 } from "lucide-react";
import { DEFAULT_ICON_SIZE } from "@/constants/common";

type Props = {
  params: {
    workflowId: string;
  };
};

const ExecutionPage = ({ params }: Props) => {
  return (
    <div className="h-full w-full overflow-auto">
      <Topbar
        workflowId={params.workflowId}
        title="All runs"
        subtitle="List of all your runs"
        hideButtons
      />
      <Suspense
        fallback={
          <div className="flex h-full w-full justify-center items-center">
            <Loader2
              size={DEFAULT_ICON_SIZE}
              className="animate-spin stroke-primary"
            />
          </div>
        }
      >
        <ExecutionsTableWrapper workflowId={params.workflowId} />
      </Suspense>
    </div>
  );
};

export default ExecutionPage;
