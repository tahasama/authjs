import { loginWithGitHub } from "@/app/actions/authActions";

export default function SignIn() {
  return (
    <form action={loginWithGitHub}>
      <button
        type="submit"
        className="p-3 bg-slate-400 text-slate-800 rounded-md hover:brightness-75 transition-all duration-150"
      >
        Signin with GitHub
      </button>
    </form>
  );
}
