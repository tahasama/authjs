export interface AuthError extends Error {
  cause?: {
    serverMessage?: string; // Your custom error message
  };
}

export interface ChangePsswrdReturn {
  error:boolean,message:string,success:boolean
}