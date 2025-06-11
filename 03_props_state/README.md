# Props and State

Ok, creating the component was cool, but most of web development is about user interactivity! No one wants to go to a web page and just get a bunch of boring text. So how do we manage that with React?

Thats where properties(props) and state come in.

1. What are properties?
   They are a way to pass data from parent to child component, an interesting note is EVERY html element in JSX (or in typescripts case TSX) has default properties that are the corresponding HTML element's attributes. For example a `<input>` element in TSX has properties from the corresponding HTML elements like `<input value="Jake">`, you can also define your own custom properties, for example:

```TSX
function Name({ name }) {
  return (
    <p> My name is { name } </p>
  )
}

// We can then pass a name property down our tree to that Name component:

function App() {
  return (
    <Name name="Larry" />
  )
}
```

So now we know how to pass data down the tree, how do we make that data dynamic?

Thats where our first hook we will learn about comes in, useState.

1. useState is a hook that allows us access to React state.
1. Simply put its a function that returns two values in an array, the current state value, and a setter function to set the state:

```TSX
  import { useState } from 'react';

  function SomeComponentWithState() {
    const [state, setState] = useState();
  }

  // We can also define an initial state to use in our declaration, if we leave it blank it will be null by default

  const [state, setSate] = useState("Larry"); // Our initial state will be the string "Larry"
```

So how does this help with interactivity? Well recall that React triggers a rerender anytime props OR state changes! So if we change either of those through say a user action it will be reflected in our UI.

```TSX
 function SomeComponentWithState() {
    const [state, setState] = useState("Blue");

    const handleClick = (e) => {
      if (state === "Blue") {
        setState("Red")
      } else if (state === "Red")
        setState("Blue")
    } // define an onclick handler for a button to change state

    return (
      <p> My favorite color is { state }!</p>
      <button onClick={handleClick}> {/* Passing our onClick handler to our onClick prop in the HTML button */}
    )
  }
```

# Challenge:

Now that we know how props and state works let make our previous example in 02 interactive! You will notices a new folder in `/src` called `components` this is a good practice to organize your reusable components. Take a look at `/components/HelloWorld.tsx` and finish the example some commentts with hints will help you.
