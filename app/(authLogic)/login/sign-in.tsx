"use client";
import { loginWithProvider } from "@/app/actions/authActions";
import { LoginProvider } from "@/lib/types";
import { useActionState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FaGithub, FaGoogle } from "react-icons/fa";
const providerStyle = {
  github: {
    bg: "bg-black hover:bg-slate-900 ",
    icon: <FaGithub size={20} />,
  },
  google: { bg: "bg-red-600 hover:bg-red-700", icon: <FaGoogle size={16} /> },
  resend: {
    bg: "bg-emerald-600 hover:bg-emerald-700",
    icon: <CiMail size={22} />,
  },
};

export default function SignIn({ provider }: LoginProvider) {
  const [state, actionToTake, pending] = useActionState(loginWithProvider, {
    success: false,
    message: "",
  });

  return (
    <form action={actionToTake} className="flex flex-col gap-3 relative">
      <input type="hidden" name="provider" value={provider} />

      {provider === "resend" && (
        <>
          {state.success ? (
            <i className="text-teal-500 text-sm font tracking-wide">
              {state.message}
            </i>
          ) : (
            <p className="text-white text-center text-sm">
              Enter your email address, and we’ll send a magic link to your
              inbox.
            </p>
          )}

          <input
            type="text"
            name="email"
            placeholder="Email"
            className="rounded p-2 bg-gray-700 text-gray-300 dark:bg-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </>
      )}

      {/* Separator between resend button and provider buttons */}
      {provider === "resend" && (
        // <div className="absolute inset-x-0 top-[calc(100%+2rem)] flex-grow h-px sm:h-px bg-gray-400 dark:bg-gray-600" />
        <div className="mt-1 absolute inset-x-0 top-[calc(100%+1rem)] flex  items-center justify-center gap-2 ">
          <div className="flex-grow h-px sm:h-px bg-gray-400 dark:bg-gray-600"></div>
          <span className="text-gray-600 dark:text-gray-400">
            Or sign in with
          </span>
          <div className="flex-grow h-px sm:h-px bg-gray-400 dark:bg-gray-600"></div>
        </div>
      )}

      <button
        type="submit"
        className={`py-2.5 px-4 capitalize ${
          provider !== "resend" && "sm:mt-8"
        } ${
          providerStyle[provider]?.bg || "bg-indigo-600"
        } min-w-20 flex justify-center items-center gap-3 mb-0.5 text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-150`}
        disabled={pending}
      >
        {pending ? (
          <div className="flex justify-center items-center gap-1">
            <span className="animate-spin">
              <AiOutlineLoading3Quarters />
            </span>
            <p>Sending...</p>
          </div>
        ) : (
          <>
            <span>{providerStyle[provider]?.icon}</span>
            {provider === "resend" ? "Send magic link" : provider}
          </>
        )}
      </button>
    </form>
  );
}
