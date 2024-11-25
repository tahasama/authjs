import Link from "next/link";
import React from "react";

const verifyRequest = () => {
  return (
    <div className="grid place-items-center h-[calc(100vh-100px)] bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="grid place-items-center text-center p-6 bg-white dark:bg-gray-800 shadow-md rounded-md space-y-6">
        <p className="text-red-600 dark:text-red-400">
          Check your email. A sign-in link has been sent to your email address.
        </p>
        <div className="flex flex-col gap-4 w-fit">
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
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default verifyRequest;
