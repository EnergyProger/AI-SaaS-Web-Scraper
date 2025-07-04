import { getAppUrl } from "@/lib/helper/app-url";
import { prisma } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";

export const GET = async (request: Request) => {
  const now = new Date();
  const workflows = await prisma.workflow.findMany({
    select: {
      id: true,
    },
    where: {
      status: WorkflowStatus.PUBLISHED,
      cron: {
        not: null,
      },
      nextRunAt: { lte: now },
    },
  });

  for (const workflow of workflows) {
    triggerWorkflow(workflow.id);
  }

  return Response.json({ workflowsToRun: workflows.length }, { status: 200 });
};

const triggerWorkflow = (workflowId: string) => {
  const triggerApiUrl = getAppUrl(
    `api/workflows/execute?workflowId=${workflowId}`
  );

  fetch(triggerApiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET_KEY!}`,
    },
    cache: "no-store",
  }).catch((error) => {
    console.error(
      "Error triggering workflow with id: ",
      workflowId,
      ":error->",
      error.message
    );
  });
};
