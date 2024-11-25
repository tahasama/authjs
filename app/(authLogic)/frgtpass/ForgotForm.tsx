"use client";
import { forgotPassword } from "@/app/actions/authActions";
import { emailForgot } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { redirect } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";

const ForgotForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof emailForgot>>({
    resolver: zodResolver(emailForgot),
  });

  const onSubmit = async (data: z.infer<typeof emailForgot>) => {
    setLoading(!loading);
    const { email } = data;
    if (email) {
      const response = await forgotPassword({
        email,
      });

      if (response?.message) {
        setLoading(false);
        console.log("🚀 ~ onSubmit ~ response?.message:", response?.message);
        setError("email", {
          message: response.message,
        });
      } else {
        setLoading(false);

        setSuccessMessage("An email was sent to you, please check your inbox");
        setTimeout(() => {
          redirect("/login");
        }, 1000);
      }
    } else {
      setError("email", {
        message: "Something went wrong, pleaae resend request again",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {/* Email Field */}
      {successMessage && (
        <p className="text-teal-600 text-sm">{successMessage}</p>
      )}
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="font-medium text-gray-600 dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-2 p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("email")}
          placeholder="Add your email"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-950 text-center rounded-md p-2.5 mt-1 hover:bg-blue-900/50"
        disabled={loading}
      >
        {!loading ? (
          "Send link to email"
        ) : (
          <div className="flex justify-center items-center gap-1">
            <span className="animate-spin">
              <AiOutlineLoading3Quarters />
            </span>
            <p>Sending...</p>
          </div>
        )}
      </button>
    </form>
  );
};

export default ForgotForm;
