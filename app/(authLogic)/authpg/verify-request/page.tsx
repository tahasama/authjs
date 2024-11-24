import Link from "next/link";
import React from "react";

const verifyRequest = () => {
  return (
    <div className="text-center text-red-600 p-40">
      Check your email A sign in link has been sent to your email address.
      <Link href={"/"}>Home</Link>
    </div>
  );
};

export default verifyRequest;
