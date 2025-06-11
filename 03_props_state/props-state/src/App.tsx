import HelloWorld from "./components/HelloWorld";

import "./App.css";

function App() {
  return (
    <div className="hello-world">
      <header className="">
        <h1>Props and State Example</h1>
      </header>
      <HelloWorld initialName="Larry" />
    </div>
  );
}

export default App;
