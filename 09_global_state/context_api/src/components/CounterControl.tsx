import { useContext } from "react";

function CounterControls() {
  // TODO: 4. Use the useContext hook to get the `increment` function.
  const increment = () => {
    console.log("Button clicked, but increment is not implemented yet!");
  };

  return (
    <div className="controls-panel">
      <button onClick={increment}>Increment Count</button>
    </div>
  );
}
