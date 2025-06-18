import { useCounter } from "./providers/CountProvider";

function CounterControls() {
  // TODO: Change this to use our useReducer values
  const { increment } = useCounter();

  // TODO change this to use the dispatch function from useReducer
  const handleIncrement = () => {
    increment();
  };

  // TODO :  Finish the handlers for decrement and reset actions
  const handleDecrement = () => {
    console.log("Decrement not implemented yet");
  };
  const handleReset = () => {
    console.log("Reset not implemented yet");
  };

  return (
    <div className="controls-panel">
      <button onClick={handleIncrement}>Increment Count</button>
      <button id="decrement" onClick={handleDecrement}>
        Decrement Count
      </button>
      <button id="reset" onClick={handleReset}>
        Reset Count
      </button>
    </div>
  );
}

export default CounterControls;
