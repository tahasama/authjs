import LoginForm from "./loginForm";
import Link from "next/link";
import { LoginProviders } from "@/lib/types";
import SignIn from "@/app/(authLogic)/login/sign-in";
import { Suspense } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = async () => {
  const providers: LoginProviders[] = ["resend", "github", "google"];

  return (
    <div className="grid items-center justify-center h-[calc(100vh-100px)] bg-gray-100 dark:bg-gray-900">
      <main className="flex flex-col-reverse sm:flex-row gap-8 p-8 sm:p-10 rounded-xl bg-white dark:bg-gray-800  shadow-lg">
        {/* Left side: Login form section */}
        <div className="flex flex-col items-center gap-6 w-full max-w-md p-6 ring-1 dark:ring-gray-700/40 rounded-lg">
          <Suspense
            fallback={
              <div className="flex justify-center items-center gap-1">
                <span className="animate-spin">
                  <AiOutlineLoading3Quarters />
                </span>
                <p>Loading...</p>
              </div>
            }
          >
            <LoginForm />
          </Suspense>
          <Link
            href="/frgtpass"
            className="text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 mt-1"
          >
            Forgot Password
          </Link>
        </div>

        {/* Separator */}
        <div className="flex sm:flex-col items-center justify-center gap-2">
          <div className="flex-grow w-px sm:w-px bg-gray-400 dark:bg-gray-600"></div>
          <span className="text-gray-600 dark:text-gray-400">OR</span>
          <div className="flex-grow w-px sm:w-px bg-gray-400 dark:bg-gray-600"></div>
        </div>

        {/* Right side: Provider login section */}
        <div className="flex flex-col items-center gap-6 p-6  max-w-[300px] ring-1 dark:ring-gray-700/40  rounded-lg">
          {/* <div className="max-w-md p-6 ring-1 dark:ring-gray-700/40 rounded-lg"> */}

          <div className="flex flex-wrap justify-between gap-6 min-w-[16rem]">
            {providers.map((provider, index) => (
              <div key={index} className="w-full sm:w-auto">
                <SignIn provider={provider} />
              </div>
            ))}
          </div>
          <Link
            href="/register"
            className="text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 mt-2"
          >
            Register with email/password
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
