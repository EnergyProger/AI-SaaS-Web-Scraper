import { getWorkflowsForUser } from "@/actions/workflows";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, Inbox } from "lucide-react";
import CreateWorkflowDialog from "@/app/(dashboard)/workflows/_components/create-workflow-dialog";
import WorkflowCard from "@/app/(dashboard)/workflows/_components/workflow-card";
import { WORKFLOWS_EMPTY_ICON_SIZE } from "@/constants/workflows";

const UserWorkflows = async () => {
  const workflows = await getWorkflowsForUser();

  if (!workflows) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong</AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full justify-center items-center">
        <div className="rounded-full bg-accent w-20 h-20 flex justify-center items-center">
          <Inbox size={WORKFLOWS_EMPTY_ICON_SIZE} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflows created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create workflow
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create your first workflow" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
};

export default UserWorkflows;
