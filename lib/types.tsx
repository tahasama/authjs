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

export type LoginProviders = "google" | "github" | "resend";

export interface LoginProvider {
  provider: LoginProviders;
}

export interface ErrorMessagesProps {
  Configuration: string;
  AccessDenied: string;
  Default: string;
  Verification: string;
}
