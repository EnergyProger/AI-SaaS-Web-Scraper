"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getAvailableCredits = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const balance = await prisma.userBalance.findUnique({
      where: { userId },
    });

    if (!balance) {
      return -1;
    }

    return balance.credits;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to get available credits", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};
