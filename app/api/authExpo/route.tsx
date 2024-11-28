// app/api/authExpo/route.tsx
import { auth, signIn } from "@/auth";
import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecretcode";
// export async function GET() {
//   try {
//     // Call the `getUsers` function to fetch all users from the database
//     const result = await query("SELECT * FROM users");

//     if (!result) {
//       return NextResponse.json(
//         {
//           message: "Failed to fetch users",
//           users: [],
//         },
//         { status: 500 }
//       );
//     }

//     // Return the users as a JSON response
//     return NextResponse.json({
//       users: result.rows,
//       message: "",
//     });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error", users: [] },
//       { status: 500 }
//     );
//   }
// }

// Example of using token to get data in private route

export async function GET(req: NextRequest) {
  try {
    // Step 1: Get the token from the Authorization header
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'
    if (!token) {
      return NextResponse.json({ error: "Token missing" }, { status: 401 });
    }

    // Step 2: Verify the token and get user info
    const decoded = jwt.verify(token, JWT_SECRET as string) as string;

    // Simulate fetching user-specific images from the database
    const userImages = await fetchUserImages(decoded); // Assume this function fetches images from DB

    return NextResponse.json({ images: userImages });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

// Example function to fetch images from a database (just a simulation)
const fetchUserImages = async (email: string) => {
  // Here, you would query your database (PostgreSQL, MongoDB, etc.)
  // For example, you can filter images by email or userId.
  return [
    { url: "image1.jpg", description: "Beach Vacation" },
    { url: "image2.jpg", description: "Family Gathering" },
  ]; // Example data
};

export async function POST(req: NextRequest) {
  try {
    const { email, password, provider } = await req.json();
    console.log("🚀 ~ POST ~ provider:", provider);

    // Attempt to sign in using credentials
    await signIn(provider, {
      email,
      password,
      redirect: false,
    });

    // Get authenticated user
    const session = await auth(); // Or whatever method you use to get the user

    if (!session) {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { email: session.user?.email, id: session.user?.id },
      JWT_SECRET,
      { expiresIn: "1h" } // Adjust expiration time as needed
    );
    const data = { user: session.user, token: token };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
