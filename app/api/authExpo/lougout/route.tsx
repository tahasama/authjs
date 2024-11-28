// import { logout } from "@/app/actions/authActions";
import { signOut } from "@/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await signOut(); // Ensure signOut() performs the logout correctly.
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout failed:", error);
    return NextResponse.json(
      { error: "Something went wrong during logout" },
      { status: 500 }
    );
  }
}
