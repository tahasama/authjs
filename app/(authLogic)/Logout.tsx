// "use server";
import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return (
    <form
      action={async () => {
        // "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="bg-red-600/80 rounded-md py-3 px-5 text-slate-200 hover:brightness-90 transition-all duration-150"
      >
        Sign out
      </button>
    </form>
  );
};

export default Logout;
