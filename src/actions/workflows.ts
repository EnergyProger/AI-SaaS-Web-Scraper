"use server";

import { prisma } from "@/lib/prisma";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
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
    const newWorkflow = await prisma.workflow.create({
      data: {
        userId,
        status: WorkflowStatus.DRAFT,
        definition: "TODO",
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
