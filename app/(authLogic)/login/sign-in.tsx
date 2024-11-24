import { loginWithProvider } from "@/app/actions/authActions";
import { LoginProvider } from "@/lib/types";
import { CiMail } from "react-icons/ci";
import { FaGithub, FaGoogle } from "react-icons/fa";

const providerStyle = {
  github: { bg: "bg-slate-800", icon: <FaGithub /> },
  google: { bg: "bg-fuchsia-800/90", icon: <FaGoogle /> },
  resend: { bg: "bg-emerald-700/80", icon: <CiMail /> },
};

export default function SignIn({ provider }: LoginProvider) {
  return (
    <form action={loginWithProvider} className="flex flex-col gap-3">
      <input type="hidden" name="provider" value={provider} />
      {provider === "resend" && (
        <>
          <p className="text-white text-center">
            Enter your email address, and we’ll send a magic link to your inbox.
          </p>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="rounded p-1.5 bg-slate-500 text-slate-300"
          />
        </>
      )}
      <button
        type="submit"
        className={`py-2.5 px-4 capitalize ${providerStyle[provider].bg} min-w-20 flex justify-center items-center gap-3 text-slate-200 rounded-md hover:brightness-75 transition-all duration-150`}
      >
        <span>{providerStyle[provider].icon} </span>
        {provider === "resend" ? "Send magic link" : provider}
      </button>
    </form>
  );
}
