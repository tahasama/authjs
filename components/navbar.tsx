"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Logout from "@/app/(authLogic)/Logout";
import Link from "next/link";
import SignIn from "./sign-in";
// import { auth } from "@/auth";

const Navbar = () => {
  const { data, status } = useSession();

  return (
    <div
      className={`flex p-5 justify-around items-center ${
        status === "authenticated" ? "bg-purple-950" : "bg-cyan-800/50"
      }`}
    >
      <Link
        href={"/"}
        className="bg-purple-800/40 rounded-md py-3 px-9 hover:brightness-75 transition-all duration-150"
      >
        Home
      </Link>
      <p>
        {status === "authenticated"
          ? data?.user?.email
          : status === "loading"
          ? "loading"
          : "Not user yet!"}
      </p>
      {status !== "authenticated" && (
        <div className="flex gap-2">
          <SignIn />
          <Link
            href={"/login"}
            className="bg-slate-900 rounded-md p-3 hover:brightness-75 transition-all duration-150"
          >
            got to login page
          </Link>
          <Link
            href={"/register"}
            className="bg-blue-950 rounded-md p-3 hover:brightness-75 transition-all duration-150"
          >
            got to register page
          </Link>
        </div>
      )}
      {status === "authenticated" && <Logout />}
    </div>
  );
};

export default Navbar;
