import * as fs from "fs";

export function base64_encode(file: string): string {
  const bitmap = fs.readFileSync(file);
  return Buffer.from(bitmap).toString("base64");
}

export async function waitFor(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
