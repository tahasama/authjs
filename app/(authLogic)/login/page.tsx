import LoginForm from "./loginForm";
import Link from "next/link";
import { LoginProviders } from "@/lib/types";
import SignIn from "@/app/(authLogic)/login/sign-in";
import { auth } from "@/auth";

const Login = async () => {
  const providers: LoginProviders[] = ["resend", "github", "google"];

  return (
    <div className="grid items-center justify-center h-[calc(100vh-100px)]">
      <main className="flex flex-col-reverse sm:flex-row gap-10 p-6 rounded ring-2 ring-purple-950 bg-slate-900">
        {/* Left side: Login form section */}
        <div className="flex flex-col items-center gap-5">
          {/* <h2 className="text-xl font-semibold text-white">Login with Email</h2> */}
          <LoginForm />
          <Link href="/frgtpass" className="text-sky-600/80 hover:underline">
            Forgot Password
          </Link>
        </div>

        <div className="flex sm:flex-col  sm:max-w-5 items-center justify-center gap-2">
          <div className="flex-grow h-px sm:w-px bg-gray-500"></div>
          <span className="text-gray-500">OR</span>
          <div className="flex-grow h-px sm:w-px bg-gray-500"></div>
        </div>

        {/* Right side: Provider login section */}
        <div className="flex flex-col items-center gap-5 max-w-[250px]">
          {/* Optional Title */}
          {/* <h2 className="text-xl font-semibold text-white">Or</h2> */}

          <div className="flex flex-wrap justify-between gap-4 w-full">
            {providers.map((provider, index) => (
              <div key={index} className="w-full sm:w-auto ">
                <SignIn provider={provider} />
              </div>
            ))}
          </div>
          <Link href="/register" className="text-sky-600/80 hover:underline">
            Register with email/password
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
