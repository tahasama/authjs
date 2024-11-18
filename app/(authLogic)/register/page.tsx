import React from "react";

const Register = () => {
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main className="grid gap-10 p-4 rounded ring-2 ring-purple-950">
        <h1 className="text-center">Register page</h1>
        <form action="" className="flex flex-col gap-3">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            className="rounded p-1.5 bg-slate-500 text-slate-300"
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            className="rounded p-1.5 bg-slate-500 text-slate-300"
          />
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="text"
            name="cpassword"
            className="rounded p-1.5 bg-slate-500 text-slate-300"
          />
          <button
            type="submit"
            className="bg-blue-950 text-center rounded-md p-1.5 mt-1 hover:bg-blue-900/50"
          >
            register
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
