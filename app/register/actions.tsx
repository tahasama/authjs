"use server";

import { query } from "@/lib/db";
import { redirect } from "next/navigation";
import { saltAndHashPassword } from "@/lib/utils";
import { formSchema } from "@/lib/types";

// Function to salt and hash password

export const addUser = async ({
  email,
  psswrd,
  confirmPsswrd,
}: {
  email: string;
  psswrd: string;
  confirmPsswrd: string;
}) => {
  // Server-side validation using zod
  const parseResult = await formSchema.safeParseAsync({
    email,
    psswrd,
    confirmPsswrd,
  });

  if (!parseResult.success) {
    // return { error: "Validation failed. Please check your inputs." };
    return { error: parseResult.error.issues[0].message };
  }

  // Validate the email uniqueness first
  const existingUser = await query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (existingUser.rows.length > 0) {
    return { error: "This email is already registered." };
  }

  // Check if passwords match
  if (psswrd !== confirmPsswrd) {
    return { error: "Passwords do not match." };
  }

  // Generate the password hash
  const pwHash = saltAndHashPassword(psswrd);

  // Insert the new user into the database
  const result = await query(
    "INSERT INTO users (email, passwordhash) VALUES ($1, $2) RETURNING *",
    [email, pwHash]
  );

  if (result.rowCount === 0) {
    return { error: "Failed to add user. Please try again later." };
  }

  redirect("/"); // Redirect to home page on success
  return { success: true };
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
