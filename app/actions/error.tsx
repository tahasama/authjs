import Link from "next/link";
import React from "react";

const error = () => {
  return (
    <div className="flex items-center justify-center">
      <p className="text-center text-red-600 p-40">
        Something went wrong, please try again!
      </p>
      <Link
        href="/login"
        className="px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Login
      </Link>
    </div>
  );
};

export default error;
