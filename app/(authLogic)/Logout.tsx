// "use server";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

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
        className="bg-red-600/80 flex justify-center items-center gap-2 rounded-md py-3 px-5 text-sm text-slate-200 hover:brightness-90 transition-all duration-150"
      >
        <FiLogOut size={18} /> Log out
      </button>
    </form>
  );
};

export default Logout;
