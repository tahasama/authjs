import React from "react";
import ChangeForm from "./ChangeForm";

const page = () => {
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main className="grid gap-10 p-4 rounded ring-2 ring-purple-950">
        <h1 className="text-center">ChangePassword</h1>
        <ChangeForm />
      </main>
    </div>
  );
};

export default page;
