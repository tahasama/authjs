import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { pool, query } from "./lib/db";
import { getUserFromDb } from "./app/actions/authActions";
import { signInSchema } from "./lib/zod";
// import { Adapter } from "next-auth/adapters";
// import PostgresAdapter from "@auth/pg-adapter";
import authConfig from "./auth.config";
import GitHub from "next-auth/providers/github";

// const adapterX: Adapter = PostgresAdapter(pool);

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: adapterX,
  ...authConfig,
  //   callbacks: {
  //     jwt({ token, user }) {
  //       if (user) {
  //         token.id = user.id;
  //       }
  //       return token;
  //     },
  //     session({ session, token }) {
  //       session.user.id = token.id as string;
  //       return session;
  //     },
  //   },
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        psswrd: {},
      },
      async authorize(credentials: any) {
        const { email, psswrd } = await signInSchema.parseAsync(credentials);
        const user = await getUserFromDb(email, psswrd);
        return user;
      },
    }),
  ],
});
