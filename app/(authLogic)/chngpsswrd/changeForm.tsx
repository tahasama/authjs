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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* Current Password Field */}
      <div className="flex flex-col">
        <label
          htmlFor="currentPassword"
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          className="mt-2 p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("currentPassword")}
          placeholder="Enter your current password"
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-500 mt-1">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      {/* New Password Field */}
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          New Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-2 p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password")}
          placeholder="Create a new password"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="flex flex-col">
        <label
          htmlFor="cpassword"
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="cpassword"
          className="mt-2 p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("cpassword")}
          placeholder="Confirm your new password"
        />
        {errors.cpassword && (
          <p className="text-sm text-red-500 mt-1">
            {errors.cpassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-3 py-3 px-5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update Password
      </button>
    </form>
  );
};

export default ChangeForm;
