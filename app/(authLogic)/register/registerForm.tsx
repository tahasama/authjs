"use client";
import { addUser } from "@/app/actions/authActions";
import { registerSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setLoading(!loading);
    const { message } = await addUser({
      email: data.email,
      password: data.password,
      cpassword: data.cpassword,
    });
    console.log("🚀 ~ onSubmit ~ message:", message);
    if (!message) {
      setLoading(!loading);
      await getSession();
      router.back();
    }
    setError(message?.includes("password") ? "password" : "email", {
      message: message,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <label htmlFor="email" className="text-white">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="rounded p-2 bg-gray-700 text-gray-300 dark:bg-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        {...register("email")}
        placeholder="Add your email"
      />
      {errors.email && (
        <i className="text-red-500 text-sm font-thin">{errors.email.message}</i>
      )}

      <label htmlFor="password" className="text-white">
        Password
      </label>
      <input
        type="password"
        id="password"
        className="rounded p-2 bg-gray-700 text-gray-300 dark:bg-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        {...register("password")}
        placeholder="Add your password"
      />
      {errors.password && (
        <i className="text-red-500 text-sm font-thin">
          {errors.password?.message}
        </i>
      )}

      <label htmlFor="cpassword" className="text-white">
        Confirm Password
      </label>
      <input
        type="password"
        id="cpassword"
        className="rounded p-2 bg-gray-700 text-gray-300 dark:bg-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        {...register("cpassword")}
        placeholder="Confirm your password"
      />
      {errors.cpassword && (
        <i className="text-red-500 text-sm font-thin">
          {errors.cpassword?.message}
        </i>
      )}

      <button
        type="submit"
        className="bg-indigo-600 text-center rounded-md p-2 mt-2 hover:bg-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-150"
        disabled={loading}
      >
        {loading ? "Loading..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
