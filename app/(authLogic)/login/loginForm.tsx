"use client";
import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log("wow", data);
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
          {errors.password.message}
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

export default LoginForm;
