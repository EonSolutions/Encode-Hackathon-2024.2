import { createHash } from "crypto";

export const hashFunc = (encrypted: string) => {
  return createHash("sha256").update(encrypted).digest("hex");
};