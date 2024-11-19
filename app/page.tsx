import SignIn from "@/components/sign-in";
// import UserInfo from "@/components/user-info";
import Link from "next/link";
import { getUsers } from "./actions/authActions";
import { auth } from "@/auth";

export default async function Home() {
  const { users } = await getUsers();
  const uuu = await auth();
  console.log("🚀 ~ Home ~ uuu:", uuu);

  console.log("🚀 ~ Home ~ users:", users.length);

  return (
    <div className="grid items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="grid gap-10">
        <h1 className="text-xl">This is a Auth app</h1>
        <h2 className="text-lg">We will create an all auth app with auth.js</h2>
        <p>We will show here if user is logged or not</p>

        <SignIn />
        <Link
          href={"/login"}
          className="bg-slate-900 rounded-md p-3 flex justify-between max-w-52"
        >
          got to login page
          <span>--{`>`}</span>
        </Link>
        <Link
          href={"/register"}
          className="bg-blue-950 rounded-md p-3 flex justify-between max-w-52"
        >
          got to register page
          <span>--{`>`}</span>
        </Link>
      </main>
    </div>
  );
}
