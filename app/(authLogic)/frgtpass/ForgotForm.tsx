"use client";
import { forgotPassword } from "@/app/actions/authActions";
import { emailForgot } from "@/lib/zod";
// import { changePassword } from "@/app/actions/authActions";
// import { chgPasswordSchema,  } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddNewPsswrd from "./AddNewPsswrd";
import { ChangePsswrdReturn } from "@/lib/types";

const ForgotForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof emailForgot>>({
    resolver: zodResolver(emailForgot),
  });

  // const [state, setState] = useState<ChangePsswrdReturn>({
  //   error: false,
  //   message: "",
  //   success: false,
  // });
  const [success, setSuccess] = useState<string | boolean>("");

  const onSubmit = async (data: z.infer<typeof emailForgot>) => {
    const { email } = data;
    if (email) {
      const response = await forgotPassword({
        email,
      });

      if (response?.message) {
        setError("email", {
          message: response.message,
        });
      } else {
        // setState(response);
        setSuccess(response.success);
      }
      console.log("🚀 ~ onSubmit ~ response:", response);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>} */}
          <label htmlFor="email">Email</label>
          <p className="text-pink-500">{success ? "success" : "failed"}</p>
          <input
            type="email"
            id="email"
            className="rounded p-1.5 bg-slate-500 text-slate-300"
            {...register("email")}
            placeholder="Add your email"
          />
          {errors.email && (
            <i className="text-red-500 text-sm font-thin">
              {errors.email.message}
            </i>
          )}
          <button
            type="submit"
            className="bg-blue-950 text-center rounded-md p-1.5 mt-1 hover:bg-blue-900/50"
          >
            Update
          </button>
        </form>
      ) : (
        // <AddNewPsswrd email={state.message} />
        <AddNewPsswrd email={success as string} />
      )}
    </>
  );
};

export default ForgotForm;
