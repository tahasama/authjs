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
import { saltAndHashPassword } from "./lib/utils";
import { v4 as uuidv4 } from "uuid";

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
  callbacks: {
    async signIn({ user, account }) {
      if (
        account &&
        (account.provider === "google" || account.provider === "github")
      ) {
        try {
          // Check if user already exists in the database
          const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [user.email]
          );

          if (!existingUser.rows.length) {
            const Verycomplicatedword = uuidv4();
            // User doesn't exist, insert them with a placeholder psswrdhash
            const placeholderHash = saltAndHashPassword(Verycomplicatedword);
            await pool.query(
              "INSERT INTO users (email, psswrdhash) VALUES ($1, $2)",
              [user.email, placeholderHash]
            );
          }
        } catch (err) {
          console.error("Error in signIn callback:", err);
          return false; // Prevent sign-in if something goes wrong
        }
      }
      return true;
    },
  },
});
