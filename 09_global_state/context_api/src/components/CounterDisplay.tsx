import { useContext } from "react";

function CounterDisplay() {
  // TODO: 3. Use the useContext hook to get the current `count`.
  const count = 0; // This is hardcoded for now.

  return (
    <div className="display-panel">
      <h2>Current Count</h2>
      <p className="count">{count}</p>
    </div>
  );
}

export default CounterDisplay;
