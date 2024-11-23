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

export type LoginProviders = "google" | "github";

export interface LoginProvider {
  provider: LoginProviders;
}
