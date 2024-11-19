import React from "react";
import LoginForm from "./loginForm";
import Link from "next/link";

const Login = () => {
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main className="grid gap-10 p-4 rounded ring-2 ring-purple-950">
        <h1 className="text-center">Login page</h1>
        <LoginForm />
        <Link href="/chngPsswrd">reset password</Link>
      </main>
    </div>
  );
};

export default Login;
