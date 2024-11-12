import { z } from "zod";

const matchPsswrdSchema = z
  .object({
    psswrd: z.string().min(6, "Your password must be at least 6 characters."),
    confirmPsswrd: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.psswrd !== val.confirmPsswrd) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPsswrd"],
        message: "Your passwords do not match, please try again.",
      });
    }
  });

export const formSchema = z
  .object({
    email: z.string().email("Please add a valid email."),
  })
  .and(matchPsswrdSchema);
