import HelloWorld from "./components/HelloWorld";
import SomeListComponent from "./components/List";

function App() {
  return (
    <div className="hello-world">
      <header className="">
        <h1>Props and State Example</h1>
      </header>
      <HelloWorld initialName="Larry" />
      <SomeListComponent />
    </div>
  );
}

export default App;
