"use server";

import { symmetricEncrypt } from "@/lib/encryption";
import { prisma } from "@/lib/prisma";
import {
  createCredentialSchema,
  createCredentialSchemaType,
} from "@/schema/credential";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getCredentialsForUser = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const credentials = await prisma.credential.findMany({
      where: {
        userId,
      },
      orderBy: {
        name: "asc",
      },
    });

    return credentials;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to get credentials for user:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};

export const createCredential = async (form: createCredentialSchemaType) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const { success, data } = createCredentialSchema.safeParse(form);

    if (!success) {
      throw new Error("Invalid form data");
    }

    const encryptedValue = symmetricEncrypt(data.value);

    const createdCredential = await prisma.credential.create({
      data: {
        userId,
        name: data.name,
        value: encryptedValue,
      },
    });

    if (!createdCredential) {
      throw new Error("Unable to create credential");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to create a credential:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }

  revalidatePath("/credentials");
};

export const deleteCredential = async (name: string) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    await prisma.credential.delete({
      where: {
        userId_name: {
          userId,
          name,
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to delete credential:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }

  revalidatePath("/credentials");
};
