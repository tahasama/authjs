"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Dashboard = () => {
  const { status, data } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {status === "authenticated" ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Welcome, <span className="text-blue-600">{data.user?.email}</span>!
          </h2>
          <p className="text-gray-600 mb-8">This is your dashboard.</p>
          <Link
            href="/chngPsswrd"
            className=" px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Reset Password
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">You are not logged in</h2>
          <p className="text-gray-600 mb-8">
            Please log in to access your dashboard.
          </p>
          <Link
            href="/login"
            className="px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
