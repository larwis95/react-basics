import { useCounter } from "./providers/CountProvider";

function CounterDisplay() {
  // TODO: Change this to use our useReducer values
  const { count } = useCounter();

  return (
    <div className="display-panel">
      <h2>Current Count</h2>
      <p className="count">{count}</p>
    </div>
  );
}

export default CounterDisplay;
