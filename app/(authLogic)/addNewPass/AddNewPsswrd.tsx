"use client";
import { updateForgotPassword } from "@/app/actions/authActions";
import { registerSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddNewPsswrd = () => {
  const param = useSearchParams();
  const token = param.get("token");
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    if (token) {
      const { message } = await updateForgotPassword({
        email: data.email,
        password: data.password,
        cpassword: data.cpassword,
        token,
      });
      console.log("🚀 ~ onSubmit ~ message:", message);

      // if (!message) {
      //   router.back();
      // }
      setError("password", {
        message: message,
      });
    }
  };

  return (
    <>
      {!token ? (
        <div className="inline">
          TNo token, please click{" "}
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
          <label htmlFor="password">Email</label>
          <input
            type="email"
            id="email"
            className="rounded p-1.5 bg-slate-500 text-slate-300"
            {...register("email")}
            placeholder="Add your password"
          />
          {errors.email && (
            <i className="text-red-500 text-sm font-thin">
              {errors.email.message}
            </i>
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
          >
            Update
          </button>
        </form>
      )}
    </>
  );
};

export default AddNewPsswrd;
