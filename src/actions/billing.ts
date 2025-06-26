"use server";

import { SETTING_FREE_USER_CREDITS } from "@/constants/settings";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
      console.log("Failed to get available credits:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};

export const setupUser = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const balance = await prisma.userBalance.findUnique({
      where: {
        userId,
      },
    });

    if (!balance) {
      await prisma.userBalance.create({
        data: {
          userId,
          credits: SETTING_FREE_USER_CREDITS,
        },
      });
    }

    redirect("/");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to setup user:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};
