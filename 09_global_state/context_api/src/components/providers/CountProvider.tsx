import { createContext, useState } from "react";

// TODO: 1. Create a context for the counter.
export const CounterContext = null; // Replace null with your context creation call

export default function CounterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: 2. Create `count` state and a function to increment it.

  const contextValue = {
    // count: 0, // This should come from your state
    // increment: () => {} // This should be your increment function
  };

  // The Provider below is missing its `value` prop.
  // Pass the contextValue object to it.
  return <CounterContext.Provider>{children}</CounterContext.Provider>;
}
