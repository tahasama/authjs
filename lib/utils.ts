import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const saltAndHashPassword = (psswrd: string) => {
  const salt = crypto.randomBytes(16).toString("hex"); // Generate random salt
  const hash = crypto
    .pbkdf2Sync(psswrd, salt, 1000, 64, "sha512")
    .toString("hex"); // Generate hash
  return `${salt}:${hash}`; // Store as salt:hash
};
