"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Logout from "@/app/(authLogic)/Logout";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";

const Navbar = () => {
  const { data, status } = useSession();
  return (
    <div
      className={`flex p-5 justify-between items-center ${
        status === "authenticated" ? "bg-purple-950" : "bg-cyan-800/50"
      }`}
    >
      <div className="flex gap-2">
        <Link
          href={"/"}
          className="bg-purple-800/40 rounded-md py-3 px-9 hover:brightness-75 transition-all duration-150"
        >
          Home
        </Link>
        {status === "authenticated" && (
          <Link
            href={"/dashboard"}
            className="bg-fuchsia-800/40 rounded-md py-3 px-6 hover:brightness-75 transition-all duration-150"
          >
            Dashboard
          </Link>
        )}
      </div>
      <p>
        {status === "authenticated"
          ? data?.user?.email
          : status === "loading"
          ? "loading"
          : "Not user yet!"}
      </p>
      {status !== "authenticated" && (
        <div className="flex gap-2">
          <Link
            href={"/login"}
            className="bg-slate-900 flex justify-center items-center gap-2 rounded-md p-3 hover:brightness-75 transition-all duration-150"
          >
            <FiLogIn size={20} />
            Sign in
          </Link>
        </div>
      )}
      {status === "authenticated" && <Logout />}
    </div>
  );
};

export default Navbar;
