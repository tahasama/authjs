import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button
        type="submit"
        className="p-3 bg-slate-400 text-slate-800 rounded-md"
      >
        Signin with GitHub
      </button>
    </form>
  );
}
