import CounterDisplay from "./components/CounterDisplay";
import CounterControls from "./components/CounterControl";
import { CounterProvider } from "./context/CounterContext";

function App() {
  return (
    <div className="main-container">
      <h1>Counter App with Context API</h1>
      <p>
        Context can be used to pass state down deep component trees without prop
        drilling, or even sharing data between sibling components.
      </p>
      <div className="app-container">
        {/* TODO: 5. Wrap CounterDisplay and CounterControls in the CounterProvider. */}
        {/* These two components are siblings that need to share state. */}
        <CounterDisplay />
        <CounterControls />
      </div>
    </div>
  );
}

export default App;
