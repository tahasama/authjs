"use server";

import { signIn } from "@/auth";
import { z } from "zod";
import crypto from "crypto";
import { query } from "@/lib/db";
import { redirect } from "next/navigation";
import { loginSchema, registerSchema } from "@/lib/zod";
import { hashResult, saltAndHashPassword } from "@/lib/utils";
import { AuthError } from "next-auth";

export const addUser = async ({
  email,
  password,
  cpassword,
}: {
  email: string;
  password: string;
  cpassword: string;
}) => {
  console.log("🚀 ~ email:", email);
  // Server-side validation using zod
  const parseResult = await registerSchema.safeParseAsync({
    email,
    password,
    cpassword,
  });

  if (!parseResult.success) {
    // return { error: "Validation failed. Please check your inputs." };
    return { error: true, message: parseResult.error.issues[0].message };
  }

  // Validate the email uniqueness first

  const existingUser = await query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  console.log("🚀 ~ existingUser:", existingUser);

  if (existingUser.rows.length > 0) {
    return { error: true, message: "This email is already registered." };
  }

  // Generate the psswrd hash
  const pwHash = saltAndHashPassword(password);

  // Insert the new user into the database

  const result = await query(
    "INSERT INTO users (email, psswrdhash) VALUES ($1, $2) RETURNING *",
    [email, pwHash]
  );

  if (result.rowCount === 0) {
    return {
      error: true,
      message: "Failed to add user. Please try again later.",
    };
  }
  redirect("/"); // Redirect to home page on success
  return { success: true };
};

export const loginWithGitHub = async () => {
  const ccc = await signIn("github");
};

export async function getUsers() {
  const result = await query("SELECT *FROM users");

  if (!result) {
    return {
      message: "Failed to fetch users",
      users: [],
    };
  }

  return {
    users: result.rows,
    message: "",
  };
}

export const loginWithCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const loginValidation = loginSchema.safeParse({
    email,
    password,
  });

  if (!loginValidation.success) {
    return {
      error: true,
      message: loginValidation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error: any) {
    return {
      message: error.cause.serverMessage,
    };
  }
};

export const getUserFromDb = async (email: string, password: string) => {
  // Query the database for the user by email
  const res = await query("SELECT * FROM users WHERE email = $1", [email]);

  if (res.rows.length === 0) {
    return { user: null, message: "User not found or wrong email" }; // User not found
  }

  const user = res.rows[0];

  // Split the stored salt and hash
  const [storedSalt, storedHash] = user.psswrdhash.split(":");

  // Hash the provided psswrd using the stored salt

  const hash: any = hashResult(password, storedSalt);

  // Compare the hashed psswrd with the stored hash
  if (hash === storedHash) {
    return { user: user, message: null }; // psswrd matches, return user object
  } else {
    return { user: null, message: "Wrong password" }; // psswrd does not match
  }
};
