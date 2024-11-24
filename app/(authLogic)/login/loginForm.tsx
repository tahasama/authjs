"use client";
import { loginWithCredentials } from "@/app/actions/authActions";
import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";

const LoginForm = () => {
  const router = useRouter();
  const path = usePathname();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(!loading);

    const { email, password } = data;
    const response = await loginWithCredentials({
      email,
      password,
    });

    if (response?.message) {
      setError(response.message.includes("password") ? "password" : "email", {
        message: response.message,
      });
    } else {
      setLoading(!loading);
      await getSession();
      if (path !== "/addnewpass") {
        router.back();
      } else router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <label htmlFor="email" className="text-gray-700 dark:text-gray-300">
        Email
      </label>

      <input
        id="email"
        className="rounded-lg p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        {...register("email")}
        placeholder="Add your email"
      />
      {errors.email && (
        <i className="text-red-500 text-sm font-thin">{errors.email.message}</i>
      )}

      <label htmlFor="password" className="text-gray-700 dark:text-gray-300">
        Password
      </label>

      <input
        type="password"
        id="password"
        className="rounded-lg p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        {...register("password")}
        placeholder="Add your password"
      />
      {errors.password && (
        <i className="text-red-500 text-sm font-thin">
          {errors.password.message}
        </i>
      )}

      <button
        type="submit"
        className="bg-indigo-600 text-center rounded-md p-2 mt-3 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-indigo-300 disabled:bg-gray-400"
        disabled={loading}
      >
        {!loading ? (
          "Login"
        ) : (
          <div className="flex justify-center items-center gap-1">
            <span className="animate-spin">
              <AiOutlineLoading3Quarters />
            </span>
            <p>Login in...</p>
          </div>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
