// import { logout } from "@/app/actions/authActions";
import { signOut } from "@/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("🚀 ~ AAAA ~ 111111111111:");
    await signOut(); // Ensure signOut() performs the logout correctly.
    console.log("🚀 ~ BBBB ~ 222222222222:");

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout failed:", error);
    return NextResponse.json(
      { error: "Something went wrong during logout" },
      { status: 500 }
    );
  }
}
