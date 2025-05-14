"use server";

import { prisma } from "@/lib/prisma";
import { createFlowNode } from "@/lib/workflow/create-flow-node";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getWorkflowsForUser = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  try {
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
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const createWorkflow = async (form: createWorkflowSchemaType) => {
  let createdWorkflowId: string | null = null;
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  try {
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
    console.log(error);
    throw new Error("Failed to create a workflow");
  } finally {
    if (createdWorkflowId) {
      redirect(`/workflow/editor/${createdWorkflowId}`);
    }
  }
};

export const deleteWorkflow = async (id: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  try {
    await prisma.workflow.delete({
      where: {
        id,
        userId,
      },
    });

    revalidatePath("/workflows");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete the workflow");
  }
};

export const getWorkflowById = async (workflowId: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  try {
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
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const updateWorkflow = async (id: string, definition: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  try {
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
    console.log(error);
    throw new Error("Something went wrong");
  }
};
