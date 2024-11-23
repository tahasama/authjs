"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Logout from "@/app/(authLogic)/Logout";
import Link from "next/link";
import SignIn from "./sign-in";
import { LoginProviders } from "@/lib/types";

const Navbar = () => {
  const { data, status } = useSession();
  const providers: LoginProviders[] = ["google", "github", "resend"];
  return (
    <div
      className={`flex p-5 justify-around items-center ${
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
          {providers.map((provider, index) => {
            return <SignIn provider={provider} key={index} />;
          })}
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
