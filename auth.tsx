import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { loginSchema } from "./lib/zod";
import { getUserFromDb } from "./app/actions/authActions";
import authConfig from "./auth.config";
import PostgresAdapter from "@auth/pg-adapter";
import { pool } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PostgresAdapter(pool),
  secret: process.env.AUTH_SECRET,

  providers: [
    GitHub({
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      from: process.env.EMAIL_DOMAIN,
    }),
    Credentials({
      credentials: {
        email: {},
        psswrd: {},
      },
      async authorize(credentials: any) {
        console.log("000000000000");
        const { email, password } = await loginSchema.parseAsync(credentials);
        const result = await getUserFromDb(email, password);
        console.log("🚀 ~ authorize ~ result:", result.user);
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
  pages: {
    error: "/authpg/error",
    verifyRequest: "/authpg/verify-request",
  },
  session: {
    strategy: "jwt", // Use JWT or database-based sessions
  },
});
