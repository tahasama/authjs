// app/api/authExpo/route.tsx
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

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
