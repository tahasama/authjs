import { loginWithGitHub } from "@/app/actions/authActions";

export default function SignIn() {
  return (
    <form action={loginWithGitHub}>
      <button
        type="submit"
        className="p-3 bg-slate-400 text-slate-800 rounded-md"
      >
        Signin with GitHub
      </button>
    </form>
  );
}
