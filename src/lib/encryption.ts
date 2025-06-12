import "server-only";

import crypto from "crypto";

export const symmetricEncrypt = (data: string) => {
  const ALG = process.env.ENCRYPTION_ALGORITHM;

  if (!ALG) {
    throw new Error("Encryption algorithm not defined");
  }

  const key = process.env.ENCRYPTION_KEY;

  if (!key) {
    throw new Error("Encryption key not found");
  }

  const initVector = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    ALG,
    Buffer.from(key, "hex"),
    initVector
  );

  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return initVector.toString("hex") + ":" + encrypted.toString("hex");
};

export const symmetricDecrypt = (encryptedData: string) => {
  const ALG = process.env.ENCRYPTION_ALGORITHM;

  if (!ALG) {
    throw new Error("Encryption algorithm not defined");
  }

  const key = process.env.ENCRYPTION_KEY;

  if (!key) {
    throw new Error("Encryption key not found");
  }

  const textParts = encryptedData.split(":");
  const initVector = Buffer.from(textParts.shift() as string, "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    ALG,
    Buffer.from(key, "hex"),
    initVector
  );

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
