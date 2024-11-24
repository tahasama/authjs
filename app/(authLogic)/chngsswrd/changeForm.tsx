"use client";
import { changePassword } from "@/app/actions/authActions";
import { chgPasswordSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ChangeForm = () => {
  const { data } = useSession();
  const email = data?.user?.email;

  const router = useRouter();
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
        router.back();
      }
    } else {
      setError("currentPassword", {
        message: "User is not logged in",
      });
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
        Update
      </button>
    </form>
  );
};

export default ChangeForm;
