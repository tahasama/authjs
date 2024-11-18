import React from "react";
import RegisterForm from "./registerForm";

const Register = () => {
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main className="grid gap-10 p-4 rounded ring-2 ring-purple-950">
        <h1 className="text-center">Register page</h1>
        <RegisterForm />
      </main>
    </div>
  );
};

export default Register;
