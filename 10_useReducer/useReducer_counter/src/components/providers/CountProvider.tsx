import { createContext, useContext, useState } from "react"; // TODO import useReducer, and remove useState

const CounterContext = createContext<null | unknown>(null);

// TODO: Create an initial state for the counter
const initialState = {};

// TODO: Create a reducer function to handle actions for the counter
// This function should take the current state and an action, and return the new state
// Available actions will be 'increment' and 'decrement', and 'reset'.
const counterReducer = (
  state: { count: number },
  action: { type: string; payload?: unknown }
) => {};

export default function CounterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0); // TODO: Replace this with useReducer

  const contextValue = {
    count, // TODO: Replace this with the state from useReducer
    increment: () => {
      setCount((prevCount) => prevCount + 1); // TODO: Replace this with the dispatch function from useReducer
    }, // TODO: Replace this with the dispatch function from useReducer
  };

  return (
    <CounterContext.Provider value={contextValue}>
      {children}
    </CounterContext.Provider>
  );
}

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context as {
    count: number;
    increment: () => void; // TODO: Change this to match the dispatch function from useReducer
  };
};
