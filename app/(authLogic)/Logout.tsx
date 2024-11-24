// "use server";
import { signOut } from "next-auth/react";
import { useActionState } from "react";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../actions/authActions";

const Logout = () => {
  const [state, action, pending] = useActionState(logout, null);

  if (state !== null) {
    return <div className="text-center text-red-600 p-40">Error</div>;
  }

  return (
    <form action={action}>
      <button
        type="submit"
        className="bg-red-600/80 flex justify-center items-center gap-2 rounded-md py-3 px-5 text-sm text-slate-200 hover:brightness-90 transition-all duration-150"
      >
        {!pending ? (
          <>
            <FiLogOut size={18} /> <span>Log out </span>
          </>
        ) : (
          "Loading..."
        )}
      </button>
    </form>
  );
};

export default Logout;
