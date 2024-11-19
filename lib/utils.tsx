import crypto from "crypto";

export const saltAndHashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex"); // Generate random salt
  const hash = hashResult(password, salt);
  return `${salt}:${hash}`; // Store as salt:hash
};

export const hashResult = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex"); // Generate hash
};
