import CounterDisplay from "./components/CounterDisplay";
import CounterControls from "./components/CounterControls";
import { CounterProvider } from "./context/CounterContext";

export default function App() {
  return (
    <div className="app-container">
      {/* TODO: 5. Wrap CounterDisplay and CounterControls in the CounterProvider. */}
      {/* These two components are siblings that need to share state. */}
      <CounterDisplay />
      <CounterControls />
    </div>
  );
}

export default App;
