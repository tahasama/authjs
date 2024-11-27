// app/api/authExpo/route.tsx
import { auth, signIn } from "@/auth";
import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Call the `getUsers` function to fetch all users from the database
    const result = await query("SELECT * FROM users");

    if (!result) {
      return NextResponse.json(
        {
          message: "Failed to fetch users",
          users: [],
        },
        { status: 500 }
      );
    }

    // Return the users as a JSON response
    return NextResponse.json({
      users: result.rows,
      message: "",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error", users: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log("🚀 ~ POST ~ email, password:", email, password);

    // Attempt to sign in using credentials
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // Get authenticated user
    const user = await auth(); // Or whatever method you use to get the user

    console.log("🚀 ~ POST ~ user:", user);

    if (!user) {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
