import { loginWithGitHub } from "@/app/actions/authActions";
import { LoginProvider } from "@/lib/types";

const providerStyle = {
  github: "bg-black",
  google: "bg-fuchsia-800/90",
  resend: "bg-emerald-700/80",
};

export default function SignIn({ provider }: LoginProvider) {
  return (
    <form action={loginWithGitHub}>
      <input type="hidden" name="provider" value={provider} />
      {provider === "resend" && (
        <input type="text" name="email" placeholder="Email" />
      )}
      <button
        type="submit"
        className={`p-3 ${providerStyle[provider]} text-slate-300 eme rounded-md hover:brightness-75 transition-all duration-150`}
      >
        Signin with {provider}
      </button>
    </form>
  );
}
