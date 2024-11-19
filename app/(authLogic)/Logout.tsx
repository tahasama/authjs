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
        className="bg-red-600 rounded-sm py-1 px-3  text-slate-200"
      >
        Sign out
      </button>
    </form>
  );
};

export default Logout;
