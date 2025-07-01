"use server";

import { SETTING_FREE_USER_CREDITS } from "@/constants/settings";
import { getAppUrl } from "@/lib/helper/app-url";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe/stripe";
import { getCreditsPack, PackId } from "@/types/billing";
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

export const purchaseCredits = async (packId: PackId) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const selectedPack = getCreditsPack(packId);

    if (!selectedPack) {
      throw new Error("Invalid pack");
    }

    const priceId = selectedPack.priceId;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      invoice_creation: {
        enabled: true,
      },
      success_url: getAppUrl("billing"),
      cancel_url: getAppUrl("billing"),
      metadata: {
        userId,
        packId,
      },
      line_items: [
        {
          quantity: 1,
          price: priceId,
        },
      ],
    });

    if (!session.url) {
      throw new Error("Can't create stripe session");
    }

    redirect(session.url);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to purchase credits:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};

export const getUserPurchaseHistory = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const purchases = await prisma.userPurchase.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    return purchases;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to get user purchase history:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};

export const downloadInvoice = async (id: string) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const purchase = await prisma.userPurchase.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!purchase) {
      throw new Error("Bad request");
    }

    const session = await stripe.checkout.sessions.retrieve(purchase.stripeId);

    if (!session.invoice) {
      throw new Error("Invoice not found");
    }

    const invoice = await stripe.invoices.retrieve(session.invoice as string);

    return invoice.hosted_invoice_url;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to download invoice:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};
