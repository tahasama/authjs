"use client";
import { updateForgotPassword } from "@/app/actions/authActions";
import { passwordsSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";

const AddNewPsswrd = () => {
  const router = useRouter();
  const param = useSearchParams();
  const token = param.get("token");
  const email = param.get("email");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof passwordsSchema>>({
    resolver: zodResolver(passwordsSchema),
  });

  const onSubmit = async (data: z.infer<typeof passwordsSchema>) => {
    setLoading(!loading);
    if (token && email) {
      const { message } = await updateForgotPassword({
        email,
        password: data.password,
        cpassword: data.cpassword,
        token,
      });

      // if (!message) {
      //   router.back();
      // }
      setError("password", {
        message: message,
      });
      setLoading(!loading);
      setSuccessMessage("Password chaneged successfully!");
      if (typeof window !== "undefined") {
        setTimeout(() => {
          router.push(
            `/login?redirect=${encodeURIComponent(window.location.pathname)}`
          );
        }, 1200);
      }
    } else {
      setError("password", {
        message: "Network error please try again",
      });
    }
  };

  return (
    <>
      {!token ? (
        <div className="inline">
          No token, please click{" "}
          <Link
            href={"/frgtpass"}
            className="text-sky-600 hover:underline transition-all duration-500"
          >
            here
          </Link>{" "}
          to reset again{" "}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {successMessage && (
            <p className="text-teal-600 text-sm">{successMessage}</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="rounded p-1.5 bg-slate-500 text-slate-300"
            {...register("password")}
            placeholder="Add your password"
          />
          {errors.password && (
            <i className="text-red-500 text-sm font-thin">
              {errors.password.message}
            </i>
          )}
          <label htmlFor="cpassword">Confirm new password</label>
          <input
            type="password"
            id="cpassword"
            className="rounded p-1.5 bg-slate-500 text-slate-300"
            {...register("cpassword")}
            placeholder="Add your password"
          />
          {errors.cpassword && (
            <i className="text-red-500 text-sm font-thin">
              {errors.cpassword.message}
            </i>
          )}
          <button
            type="submit"
            className="bg-blue-950 text-center rounded-md p-1.5 mt-1 hover:bg-blue-900/50"
            disabled={loading}
          >
            {!loading ? (
              "Update Password"
            ) : (
              <div className="flex justify-center items-center gap-1">
                <span className="animate-spin">
                  <AiOutlineLoading3Quarters />
                </span>
                <p>Updating...</p>
              </div>
            )}
          </button>
        </form>
      )}
    </>
  );
};

export default AddNewPsswrd;
