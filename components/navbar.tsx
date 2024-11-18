"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  //   const session = await auth();
  const { data, status } = useSession();
  console.log("🚀 ~ Navbar ~ status:", status === "authenticated");

  return (
    <div
      className={`p-5 ${
        status === "authenticated" ? "bg-red-700/50" : "bg-purple-950"
      }`}
    >
      {status === "authenticated"
        ? data?.user?.email
        : status === "loading"
        ? "loading"
        : "Not user yet!"}
    </div>
  );
};

export default Navbar;
