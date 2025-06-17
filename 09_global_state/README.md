# Global State

So far we have only talked about props and local component state. What if we need some state that is shared between component trees, or what if we want to avoid deep prop drilling by having a global store?

Well there are a few solutions used in the real world for this.

1. An external state library, like redux, zustand, or jotai. These (especially redux) can be quite heavy, but all provide a common api for managing global state across the entire app.

1. React context, a built in method for handling global state, there are a couple downsides, the most major being that anything that consumes your context will be rerendered when the context changes.

1. A fetching library like TanStack Query, these basically reduce the workload of fetching on the frontend, while doing so they create a cache of your fetched data, so they can act as a global state for your application.

We aren't going to really go into solution 1 or 3, since we are more worried about React itself right now. So let's talk about context.

## React Context

So what is context?

Its simply a built in API in React that lets you share data between components with out passing props down every level of the component tree.

So how does that work?

Well first we create a context we want to share, we then create a Context Provider component to wrap the components that will have access to that context. We can then use a hook `useContext` to consume the context in any component that is in the provider's tree.

A common way to allow theme switching involves the context API:

```tsx
// src/components/providers/theme.tsx
import { createContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
}); // Initialize our context with an object that defaults to the values light, and a function that does nothing.

export default function ThemeProvider({
  children,
}) /* here we are usiong the special children prop in react, which is just a prop that represents all children of this function */ {
  const [theme, setTheme] = useState("light"); // useState is being intialized so we can pass its values to the Theme provider.

  return (
    <ThemeContext.Provider value={(theme, setTheme)}>
      {" "}
      {/* pass our useState values to the Provider*/}
      {children} {/* render any children the provider has*/}
    </ThemeContext.Provider>
  );
}
```

So thats pretty simple, but how do we consume it?

## useContext

Thats where `useContext` comes in:

```TSX
// src/App.tsx

import ThemeProvider from '...';


function App() {
  return (
    <>
      <ThemeProvider>
        <HelloWorld>
        <ThemeControl>
      </ThemeProvider>
    </>
  )
};
```

Here we are setting up our ThemeContext, by using it to wrap a couple components in our app, let's look at those components now:

```TSX
// src/components/HelloWorld.tsx
import { ThemeContext } from "...";
import { useContext } from 'react'

function HelloWorld() {
  const { theme } = useContext(ThemeContext); // consume our Context, in this case the theme value from it.

  return (
    <div
      style={
        {
          backgroundColor: theme === "light" ? "white" : "black", // using a ternary operator to render different styling based on the theme value
          color: theme === "light" ? "black" : "white"
        }
      }
    >
      <h2>Hello World</h2>
      <p>Themes are amazing!</p>
    </div>
  )
};
```

Here we can see, we consume the context by using `useContext(context)`, giving us access to those values in the component without them being passed as props.

Let's take a look at our theme control now:

```TSX
// src/components/ThemeControl.tsx
import { ThemeContext } from '...';
import { useContext } from 'react';

function ThemeControl() {
  const { theme, setTheme } = useContext(ThemeContext); // We want to modify for the theme value, so we get the setTheme function from our context as well.

  const handleThemeSwitch = () => { // create a handler for our button click
    if (theme === "light") {
      return setTheme("dark");
    }
    return setTheme("light");
  };

  return (
    <button onClick={handleThemeSwitch}
      style={
        {
          backgroundColor: theme === "light" ? "black" : "white",
          color: theme === "light" ? "white" : "black"
        }
      }
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"} {/* use conditonal rendering to change the button text based on theme */}
    </button>
  )
}
```

How is this different than just using a `useState` call? Well, lets look at our app.tsx again, specifically our component tree:

```TSX
      <ThemeProvider>
        <HelloWorld>
        <ThemeControl>
      </ThemeProvider>
```

Now, let's recall that React uses uni-directional data binding; data can only flow down the component tree. Yet, here a sibling component `ThemeControl` is modifying data that `HelloWorld` uses? Doesn't that violate the data flow rule?

No, because the `ThemeContext` is the one passing that data down to those components. That's what context is, a way to avoid passing props down the component tree. `useState` could technically do the same thing if we pass it's setter function down, but we would be prop drilling if we did that.

So what are the caveats then?

1. Every component that consumes the context will rerender when the context changes, even if a part of the context they are using doesn't change.
1. Because of this it can cause excessive rerenders, leading to performance issues.
1. Complex state for the context can be very hard to do, in theory. In practice React has a way to get around this.

We'll talk about the solution to #3 in the next lesson.

## Challenge
