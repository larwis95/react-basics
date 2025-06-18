import { useContext } from "react";

function CounterControls() {
  // TODO: 4. Use the useContext hook to get the `increment` function.
  const handleIncrement = () => {
    console.log("Button clicked, but increment is not implemented yet!");
  };

  return (
    <div className="controls-panel">
      <button onClick={handleIncrement}>Increment Count</button>
    </div>
  );
}

export default CounterControls;
