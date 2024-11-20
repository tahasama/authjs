"use server";

import { signIn } from "@/auth";
import { query } from "@/lib/db";
import {
  chgPasswordSchema,
  emailForgot,
  loginSchema,
  passwordsSchema,
  registerSchema,
} from "@/lib/zod";
import { hashResult, saltAndHashPassword } from "@/lib/utils";
import { AuthError } from "@/lib/types";
import { redirect } from "next/navigation";

export const addUser = async ({
  email,
  password,
  cpassword,
}: {
  email: string;
  password: string;
  cpassword: string;
}) => {
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
  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  return { success: true };
};

export const loginWithGitHub = async () => {
  await signIn("github");
};

export const changePassword = async ({
  currentPassword,
  password,
  cpassword,
  email,
}: {
  currentPassword: string;
  password: string;
  cpassword: string;
  email: string;
}) => {
  // Server-side validation using zod
  const parseResult = await chgPasswordSchema.safeParseAsync({
    currentPassword,
    password,
    cpassword,
  });

  if (!parseResult.success) {
    // return { error: "Validation failed. Please check your inputs." };
    return { error: true, message: parseResult.error.issues[0].message };
  }

  const pwHash = saltAndHashPassword(password);

  const { user } = await getUserFromDb(email, currentPassword);
  if (!user) {
    return { user: null, message: "your current password is wrong" };
  }

  const result = await query(
    "UPDATE users SET psswrdhash = $1 WHERE email = $2",
    [pwHash, email]
  );

  if (result.rowCount === 0) {
    return { user: null, message: "Something went wrong, please try again" };
  }

  return { user: user, message: "" };
};

export const forgotPassword = async ({ email }: { email: string }) => {
  const parseResult = await emailForgot.safeParseAsync({ email });

  if (!parseResult.success) {
    // return { error: "Validation failed. Please check your inputs." };
    return {
      error: true,
      message: parseResult.error.issues[0].message,
      success: false,
    };
  }

  const existingUser = await query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  console.log("🚀 ~ forgotPassword ~ existingUser:", existingUser.rows);

  if (existingUser.rows.length <= 0) {
    return { error: true, message: "User not found", success: false };
  }

  return { success: email };
};

export const updateForgotPassword = async ({
  email,
  password,
  cpassword,
}: {
  email: string;
  password: string;
  cpassword: string;
}) => {
  const parseResult = await registerSchema.safeParseAsync({
    email,
    password,
    cpassword,
  });

  if (!parseResult.success) {
    // return { error: "Validation failed. Please check your inputs." };
    return { error: true, message: parseResult.error.issues[0].message };
  }

  const pwHash = saltAndHashPassword(password);
  console.log("🚀 ~ pwHash:", pwHash);

  const result = await query(
    "UPDATE users SET psswrdhash = $1 WHERE email = $2",
    [pwHash, email]
  );
  console.log("🚀 ~ result:", result);

  if (result.rowCount === 0) {
    return { user: null, message: "Something went wrong, please try again" };
  }

  return { user: null, message: "success!" };
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
  } catch (error: unknown) {
    const authError = error as AuthError;
    return {
      message: authError.cause?.serverMessage,
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

  const hash: string = hashResult(password, storedSalt);

  // Compare the hashed psswrd with the stored hash
  if (hash === storedHash) {
    return { user: user, message: null }; // psswrd matches, return user object
  } else {
    return { user: null, message: "Wrong password" }; // psswrd does not match
  }
};
