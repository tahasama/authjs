import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { loginSchema } from "./lib/zod";
import { getUserFromDb } from "./app/actions/authActions";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {},
        psswrd: {},
      },
      async authorize(credentials: any) {
        const { email, password } = await loginSchema.parseAsync(credentials);
        const result = await getUserFromDb(email, password);
        if (!result.user) {
          // Throw an error with a cause
          throw new Error("Login failed", {
            cause: { serverMessage: result.message }, // Include user.message in the cause
          });
        }

        return result.user;
      },
    }),
  ],
});
