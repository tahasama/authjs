"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Logout from "@/app/(authLogic)/Logout";
// import { auth } from "@/auth";

const Navbar = () => {
  const { data, status } = useSession();

  return (
    <div
      className={`flex p-5 justify-around ${
        status === "authenticated" ? "bg-purple-950" : "bg-cyan-800/50"
      }`}
    >
      <div>
        {status === "authenticated"
          ? data?.user?.email
          : status === "loading"
          ? "loading"
          : "Not user yet!"}
      </div>
      {status === "authenticated" && <Logout />}
    </div>
  );
};

export default Navbar;
