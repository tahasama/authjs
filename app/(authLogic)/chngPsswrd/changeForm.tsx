"use client";
import {
  changePassword,
  loginWithCredentials,
} from "@/app/actions/authActions";
import { chgPasswordSchema, loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ChangePassword from "./page";

const ChangeForm = () => {
  const { data, status } = useSession();
  const email = data?.user?.email;

  const router = useRouter();

  // const router = useRouter();
  // const path = usePathname();
  // console.log("🚀 ~ LoginForm ~ path:", path);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof chgPasswordSchema>>({
    resolver: zodResolver(chgPasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof chgPasswordSchema>) => {
    const { currentPassword, password, cpassword } = data;
    if (email) {
      const response = await changePassword({
        currentPassword,
        password,
        cpassword,
        email,
      });

      if (response?.message) {
        setError(
          response.message.includes("current") ? "currentPassword" : "password",
          {
            message: response.message,
          }
        );
      } else {
        console.log("your password had been succefully updated!");
        await getSession();

        // router.push("/dashboard");
        // redirect("/");
        router.back();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {/* {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>} */}
      <label htmlFor="currentPassword">Current password</label>

      <input
        // type="email"
        type="password"
        id="currentPassword"
        className="rounded p-1.5 bg-slate-500 text-slate-300"
        {...register("currentPassword")}
        placeholder="Add your current password"
      />
      {errors.currentPassword && (
        <i className="text-red-500 text-sm font-thin">
          {errors.currentPassword.message}
        </i>
      )}
      <label htmlFor="password">New password</label>
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
        Login
      </button>
    </form>
  );
};

export default ChangeForm;
