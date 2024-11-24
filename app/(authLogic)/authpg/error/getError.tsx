"use client";
import { ErrorMessagesProps } from "@/lib/types";
import { useSearchParams } from "next/navigation";

const GetError = () => {
  const searchParams = useSearchParams();
  const error: string | null = searchParams.get("error");

  const errorMessages: ErrorMessagesProps = {
    Configuration: "There was a problem with the configuration.",
    AccessDenied: "You don't have permission to access this.",
    Default: "Something went wrong. Please try again later.",
    Verification:
      "Unable to sign in The sign in link is no longer valid.It may have been used already or it may have expired.",
  };

  //   const errorMessage = error && errorMessages[error] ? errorMessages[error] : errorMessages.Default;
  const errorMessage: string = error
    ? errorMessages[error as keyof ErrorMessagesProps]
    : errorMessages.Default;

  return (
    <div className="text-center text-red-600 p-40">
      {error ? errorMessage : errorMessages.Default}
    </div>
  );
};

export default GetError;
