"use client";
import { ErrorMessagesProps } from "@/lib/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const GetError = () => {
  const searchParams = useSearchParams();
  const error: string | null = searchParams.get("error");
  console.log("🚀 ~ GetError ~ error:", error);

  const errorMessages: ErrorMessagesProps = {
    Configuration: "There was a problem with the configuration.",
    AccessDenied: "You don't have permission to access this.",
    Default: "Something went wrong. Please try again later.",
    Verification:
      "Unable to sign in The sign in link is no longer valid.It may have been used already or it may have expired.",
  };

  //   const errorMessage = error && errorMessages[error] ? errorMessages[error] : errorMessages.Default;
  const errorMessage: string = error
    ? errorMessages[error as keyof ErrorMessagesProps]
    : errorMessages.Default;

  return (
    <div className="grid place-items-center h-[calc(100vh-100px)] bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="grid place-items-center text-center p-6 bg-white dark:bg-gray-800 shadow-md rounded-md max-w-lg">
        <i className="text-red-600 dark:text-red-500/90 mb-6">
          {error ? errorMessage : errorMessages.Default}
        </i>
        <div className="flex flex-col gap-3 w-fit">
          <Link
            href="/Login"
            className="bg-indigo-600 text-white dark:bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-all"
          >
            Try logging in again
          </Link>
          <Link
            href="/"
            className="bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetError;
