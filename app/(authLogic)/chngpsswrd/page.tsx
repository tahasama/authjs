import React from "react";
import ChangeForm from "./changeForm";

const page = () => {
  return (
    <div className="grid items-center justify-items-center min-h-[calc(100vh-100px)] bg-gray-100 dark:bg-gray-900 py-4 px-4">
      <main className="max-w-sm w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-2 ring-gray-300 dark:ring-gray-700">
        <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Change Password
        </h1>
        <ChangeForm />
      </main>
    </div>
  );
};

export default page;
