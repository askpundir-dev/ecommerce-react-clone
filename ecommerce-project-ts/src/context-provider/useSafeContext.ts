import { useContext, type Context } from "react";

// import hook avoid repetition of the throw new Error part in all the custom hooks
export function useSafeContext<T>(
  givenContext: Context<T | null>,
  hookName: string,
  providerName: string
): T {
  const context = useContext(givenContext);
  if (!context) {
    throw new Error(`${hookName} must be used within ${providerName}`);
  }
  return context;
}
