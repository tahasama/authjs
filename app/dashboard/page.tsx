"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { status, data } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <div>{data.user?.email}'s Dashboard</div>
      ) : (
        <>
          <Link href={"/login"}>Login</Link>
        </>
      )}
    </div>
  );
};

export default Dashboard;
