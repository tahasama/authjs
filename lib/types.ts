export interface AuthError extends Error {
  cause?: {
    serverMessage?: string; // Your custom error message
  };
}