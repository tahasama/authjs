import { loginWithProvider } from "@/app/actions/authActions";
import { LoginProvider } from "@/lib/types";
import { CiMail } from "react-icons/ci";
import { FaGithub, FaGoogle } from "react-icons/fa";
const providerStyle = {
  github: { bg: "bg-gray-900 hover:bg-gray-800", icon: <FaGithub /> },
  google: { bg: "bg-red-600 hover:bg-red-500", icon: <FaGoogle /> },
  resend: { bg: "bg-emerald-600 hover:bg-emerald-500", icon: <CiMail /> },
};

export default function SignIn({ provider }: LoginProvider) {
  return (
    <form action={loginWithProvider} className="flex flex-col gap-3 relative">
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
        className={`py-2.5 px-4 capitalize ${provider !== "resend" && "mt-9"} ${
          providerStyle[provider]?.bg || "bg-indigo-600"
        } min-w-20 flex justify-center items-center gap-3 mb-0.5 text-white rounded-md hover:brightness-75 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-150`}
      >
        <span>{providerStyle[provider]?.icon}</span>
        {provider === "resend" ? "Send magic link" : provider}
      </button>
    </form>
  );
}
