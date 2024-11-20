import { z } from "zod";

const email = z
  .string({ required_error: "Email is required" })
  .min(1, { message: "This field cannot be empty" });
export const emailForgot = z.object({ email });

const password = z
  .string({ required_error: "Password is required" })
  .min(6, { message: "Must be 6 or more characters long" });

export const loginSchema = z.object({
  email,
  password,
});

export const passwordsSchema = z
  .object({
    password,
    cpassword: z
      .string({ required_error: "Confirmed Password is required" })
      .min(6, { message: "Must be 6 or more characters long" }),
  })
  .superRefine((data, ctx) => {
    if (data.cpassword !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cpassword"],
        message: "passwords do not match",
      });
    }
  });

export const chgPasswordSchema = z
  .object({
    currentPassword: password,
  })
  .and(passwordsSchema);

export const registerSchema = z
  .object({
    email,
  })
  .and(passwordsSchema);
