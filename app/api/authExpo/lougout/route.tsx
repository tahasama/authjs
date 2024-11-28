// import { logout } from "@/app/actions/authActions";
import { signOut } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // This endpoint handles logout requests.
    // No need to verify the token here; just provide a response indicating logout success.

    // If you are managing server-side sessions, clear them here.
    // For example: await clearSessionForUser(token.userId);
    // await logout();
    await signOut();
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout failed:", error);
    return NextResponse.json(
      { error: "Something went wrong during logout" },
      { status: 500 }
    );
  }
}
