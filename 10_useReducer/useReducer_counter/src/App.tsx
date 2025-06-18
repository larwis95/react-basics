import CounterDisplay from "./components/CounterDisplay";
import CounterControls from "./components/CounterControl";
import CounterProvider from "./components/providers/CountProvider";

function App() {
  return (
    <div className="main-container">
      <h1>Counter App with Context API using useReducer</h1>
      <p>
        useReducer helps us manage complex state, we can use it to make our
        counter app more efficient and easier to maintain. In this example, we
        will use useReducer to manage the state of a counter, allowing us to
        increment, decrement, and reset the counter value. The state will be
        managed in a context provider.
      </p>
      <div className="app-container">
        <CounterProvider>
          <CounterDisplay />
          <CounterControls />
        </CounterProvider>
      </div>
    </div>
  );
}

export default App;
