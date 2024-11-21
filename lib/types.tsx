export interface AuthError extends Error {
  cause?: {
    serverMessage?: string;
  };
}

export interface ChangePsswrdReturn {
  error: boolean;
  message: string;
  success: boolean;
}
