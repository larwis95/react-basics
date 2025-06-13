# Conditonal Rendering

Now that we have a good grasp of some of the most common hooks, and state in React, we can talk about how to render something differently based on state. After all, why have state if its only going to change what the component it's self shows? We should be able to show entirely separate components based on state as well!

In React we can do that by using the ternary operator syntax `expression ? result if true : result if false`. As well as the logical and operator `expression && result if expression true`.

Example:

```tsx
function SomeTernaryContainer() {
  const [color, setColor] = useState("Blue");

  return (
    <div>
      {color === "Blue" ? (
        <p> My Favorite color is Blue!"</p>
      ) : (
        <p> My Favorite Color is Red!</p>
      )}
    </div>
  );
}
```

And the Logical And:

```tsx
  function SomeAndContainer() {
    const [someData, setSomeData] = useState(); // Initialize as null

    useEffect(
      () => {
        const fetchData = async () => {
          try {
            const res = await fetch("...someurl");
            const data = await res.json();
            setSomeData(data)
          }
          catch(e) {
            console.error("Oh no, there was an error!: ", e)
          }
        }
        fetchData();
      }, []);

      return (
        {!someData && (
          <p>Loading data...</p>
        )}
        {someData && (
          <p>Data: {someData}</p>
        )}
      )
  };
```

What if we want to loop over a list of data and render a component for each item? Easy! We just use JavaScripts built in array methods!

```tsx

function SomeListComponent() {
  const list = ["Jake", "Larry", "Alex", "Andy"];

  return (
    <ul>
      {list.map((item, index) => (<p key={index}>My name is: {item}</p>));
  )
};
```

Notice the "key" prop here: `{list.map((item, index) => (<p key={index}>My name is: {item}</p>`

The "key" prop is a special prop React adds to every component to let it keep track of it during the render cycle. If the key changes React knows its an entirely new component. When rendering from an array WE always want to include a unique key for each component we are rendering. That could be anything as long as it is unique. Here we are just using the item's index in the array as the key.
