"use client";
import { addUser } from "@/app/actions/authActions";
import { registerSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const { message } = await addUser({
      email: data.email,
      password: data.password,
      cpassword: data.cpassword,
    });
    console.log("🚀 ~ onSubmit ~ message:", message);
    if (!message) {
      await getSession();
      router.back();
    }
    setError(message?.includes("password") ? "password" : "email", {
      message: message,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <label htmlFor="email">Email</label>
      <input
        // type="email"
        id="email"
        className="rounded p-1.5 bg-slate-500 text-slate-300"
        {...register("email")}
        placeholder="Add your email"
      />
      {errors.email && (
        <i className="text-red-500 text-sm font-thin">{errors.email.message}</i>
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
          {errors.password?.message}
        </i>
      )}
      <label htmlFor="cpassword">Confirm Password</label>
      <input
        type="password"
        id="cpassword"
        className="rounded p-1.5 bg-slate-500 text-slate-300"
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
        className="bg-blue-950 text-center rounded-md p-1.5 mt-1 hover:bg-blue-900/50"
      >
        register
      </button>
    </form>
  );
};

export default RegisterForm;
