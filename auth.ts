import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github"
import { loginSchema } from "./lib/zod";
import { getUserFromDb } from "./app/actions/authActions";
import authConfig from "./auth.config";
import { useContext } from "react";
import { redirect } from "next/dist/server/api-utils";


// class CustomError extends CredentialsSignin {
//     code = "custom"
//   }


 
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  
  providers: [GitHub,
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
})