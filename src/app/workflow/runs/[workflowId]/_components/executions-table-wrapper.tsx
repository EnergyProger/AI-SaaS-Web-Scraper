import { getWorkflowExecutions } from "@/actions/workflows";
import { EMPTY_EXECUTION_RUNS_ICON_SIZE } from "@/constants/constants";
import { Inbox } from "lucide-react";
import React from "react";
import ExecutionsTable from "./executions-table";

type Props = {
  workflowId: string;
};

const ExecutionsTableWrapper = async ({ workflowId }: Props) => {
  const executions = await getWorkflowExecutions(workflowId);

  if (!executions) {
    return <div>No data</div>;
  }

  if (executions.length === 0) {
    return (
      <div className="container w-full py-6">
        <div className="flex flex-col gap-2 justify-center items-center h-full w-full">
          <div className="rounded-full bg-accent h-20 w-20 flex justify-center items-center">
            <Inbox
              size={EMPTY_EXECUTION_RUNS_ICON_SIZE}
              className="stroke-primary"
            />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">
              No runs have been triggered yet for this workflow
            </p>
            <p className="text-sm text-muted-foreground">
              You can trigger a new run in the editor page
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 w-full">
      <ExecutionsTable workflowId={workflowId} initialData={executions} />
    </div>
  );
};

export default ExecutionsTableWrapper;
