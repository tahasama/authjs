import React, { Suspense } from "react";
import GetError from "./getError";

const LogError = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <GetError />
    </Suspense>
  );
};

export default LogError;
