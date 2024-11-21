import { updateForgotPassword } from "@/app/actions/authActions";
import { passwordsSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddNewPsswrd = ({ email }: { email: string }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof passwordsSchema>>({
    resolver: zodResolver(passwordsSchema),
  });

  const onSubmit = async (data: z.infer<typeof passwordsSchema>) => {
    console.log("6666666666666", email);
    if (email) {
      const { message } = await updateForgotPassword({
        email: email,
        password: data.password,
        cpassword: data.cpassword,
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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

export default AddNewPsswrd;
