"use server";

import { prisma } from "@/lib/prisma";
import { createFlowNode } from "@/lib/workflow/create-flow-node";
import { executeWorkflow } from "@/lib/workflow/execute-workflow";
import { flowToExecutionPlan } from "@/lib/workflow/execution-plan";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
import { AppNode } from "@/types/app-node";
import { TaskType } from "@/types/task";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
  WorkflowStatus,
} from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getWorkflowsForUser = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const workflows = await prisma.workflow.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return workflows;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to get workflows for user:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};

export const createWorkflow = async (form: createWorkflowSchemaType) => {
  let createdWorkflowId: string | null = null;

  try {
    const { success, data } = createWorkflowSchema.safeParse(form);

    if (!success) {
      throw new Error("Invalid form data");
    }

    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
      nodes: [],
      edges: [],
    };

    initialFlow.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));

    const newWorkflow = await prisma.workflow.create({
      data: {
        userId,
        status: WorkflowStatus.DRAFT,
        definition: JSON.stringify(initialFlow),
        ...data,
      },
    });

    createdWorkflowId = newWorkflow.id;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to create a workflow:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  } finally {
    if (createdWorkflowId) {
      redirect(`/workflow/editor/${createdWorkflowId}`);
    }
  }
};

export const deleteWorkflow = async (id: string) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    await prisma.workflow.delete({
      where: {
        id,
        userId,
      },
    });

    revalidatePath("/workflows");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to delete a workflow", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};

export const getWorkflowById = async (workflowId: string) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const workflow = await prisma.workflow.findUnique({
      where: {
        id: workflowId,
        userId,
      },
    });

    if (!workflow) {
      throw new Error("Workflow not found");
    }

    return workflow;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to get a workflow by id", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};

export const updateWorkflow = async (id: string, definition: string) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const workflow = await prisma.workflow.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!workflow) {
      throw new Error("Workflow not found");
    }

    if (workflow.status !== WorkflowStatus.DRAFT) {
      throw new Error("Workflow isn't a draft");
    }

    await prisma.workflow.update({
      where: {
        id,
        userId,
      },
      data: {
        definition,
      },
    });

    revalidatePath("/workflows");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to update workflow:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};

export const runWorkflow = async (form: {
  workflowId: string;
  flowDefinition?: string;
}) => {
  let workflowIdentifier: string | null = null;
  let executionId: string | null = null;

  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const { workflowId, flowDefinition } = form;

    if (!workflowId) {
      throw new Error("workflowId is required");
    }

    const workflow = await prisma.workflow.findUnique({
      where: {
        userId,
        id: workflowId,
      },
    });

    if (!workflow) {
      throw new Error("Workflow not found");
    }

    let executionPlan: WorkflowExecutionPlan;

    if (!flowDefinition) {
      throw new Error("Flow definition isn't defined");
    }

    const flow = JSON.parse(flowDefinition);
    const result = flowToExecutionPlan(flow.nodes, flow.edges);

    if (result.error) {
      throw new Error("Flow definition not valid");
    }

    if (!result.executionPlan) {
      throw new Error("No execution plan generated");
    }

    executionPlan = result.executionPlan;

    const execution = await prisma.workflowExecution.create({
      data: {
        workflowId,
        userId,
        trigger: WorkflowExecutionTrigger.MANUAL,
        definition: flowDefinition,
        status: WorkflowExecutionStatus.PENDING,
        startedAt: new Date(),
        phases: {
          create: executionPlan.flatMap((phase) => {
            return phase.nodes.flatMap((node) => {
              return {
                userId,
                status: ExecutionPhaseStatus.CREATED,
                number: phase.phase,
                node: JSON.stringify(node),
                name: TaskRegistry[node.data.type].label,
              };
            });
          }),
        },
      },
      select: {
        id: true,
        phases: true,
      },
    });

    if (!execution) {
      throw new Error("Failed to create workflow execution");
    }

    executeWorkflow(execution.id);

    workflowIdentifier = workflowId;
    executionId = execution.id;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Workflow execution failed:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  } finally {
    if (workflowIdentifier && executionId) {
      redirect(`/workflow/runs/${workflowIdentifier}/${executionId}`);
    }
  }
};

export const getWorkflowExecutionWithPhases = async (executionId: string) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    return prisma.workflowExecution.findUnique({
      where: {
        id: executionId,
        userId,
      },
      include: {
        phases: {
          orderBy: {
            number: "asc",
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to get workflow execution phases:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};

export const getWorkflowPhaseDetails = async (phaseId: string) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const phase = await prisma.executionPhase.findUnique({
      where: {
        id: phaseId,
        execution: {
          userId,
        },
      },
      include: {
        logs: {
          orderBy: {
            timestamp: "asc",
          },
        },
      },
    });

    return phase;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to get workflow phase details:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};
