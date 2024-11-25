// "use server";
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
      <button type="submit" className=" flex items-center gap-2 w-full">
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
