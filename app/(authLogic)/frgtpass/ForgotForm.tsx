"use client";
import { forgotPassword } from "@/app/actions/authActions";
import { emailForgot } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { redirect } from "next/navigation";

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
        // setSuccess(response.success);
        redirect("/login");
      }
    } else {
      setError("email", {
        message: "Error, plae add an email",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {/* {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>} */}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        className="rounded p-1.5 bg-slate-500 text-slate-300"
        {...register("email")}
        placeholder="Add your email"
      />
      {errors.email && (
        <i className="text-red-500 text-sm font-thin">{errors.email.message}</i>
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

export default ForgotForm;
