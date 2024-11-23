import { loginWithGitHub } from "@/app/actions/authActions";
import { LoginProvider } from "@/lib/types";

const providerStyle = {
  github: "bg-black",
  google: "bg-fuchsia-800",
};

export default function SignIn({ provider }: LoginProvider) {
  return (
    <form action={loginWithGitHub}>
      <input type="hidden" name="provider" value={provider} />

      <button
        type="submit"
        className={`p-3 ${providerStyle[provider]} text-slate-300 rounded-md hover:brightness-75 transition-all duration-150`}
      >
        Signin with {provider}
      </button>
    </form>
  );
}
