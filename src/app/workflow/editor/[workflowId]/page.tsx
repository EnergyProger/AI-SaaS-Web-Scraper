import { getWorkflowById } from "@/actions/workflows";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Editor from "../../_components/editor";

type Props = {
  params: {
    workflowId: string;
  };
};

const Page = async ({ params }: Props) => {
  const { workflowId } = params;
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const workflow = await getWorkflowById(workflowId);

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow}></Editor>;
};

export default Page;
