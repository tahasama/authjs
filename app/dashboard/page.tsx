"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { status, data } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <>
          <h2>
            {data.user?.email}
            {`'`}s Dashboard
          </h2>
          <Link href="/chngPsswrd">reset password</Link>
        </>
      ) : (
        <>
          <Link href={"/login"}>Login</Link>
        </>
      )}
    </div>
  );
};

export default Dashboard;
