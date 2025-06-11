# React Crash Course

React is a frontend library for developing user interfaces. It uses a declaritive paradigm to define the desired state of the UI, rather than an imperative approach where we define "how" to get to that state. Simply put we define "what" we want the UI to look like with React and let the library handle the "how".

Before jumping into React, we should understand a litle bit about "how" it works under the hood.

1. UI's are built from isolated pieces called components. These are essentially JavaScript functions you can sprinkle with markup.

1. React follows a uni-directional data flow, simply put data should only flow down the component tree from parent to child.
   Example:

```JSX
import PersonTitle from "..."

function Page() {
  const name = "Jake"

  return (
    <div>
      <PersonTitle name={name} />
    </div>
  )
} // This is following uni-directional data flow we are passing the name data from the Page component down to our PersonTitle component
```

3. React uses something called a virtual DOM to help determine what should be seen. When a component gets added to the DOM we execute the components function call. It is then added to Reacts virtual DOM with the component's initial state and props. If the props or state of a component changes, it will trigger a rerender of that component, we re-execute the component's function, which creates a new virtual DOM representation, then react compares the virtual DOM to the actual DOM to calculate what needs to be changed, and finally react makes only the changes that it needs to between the two DOMs.

1. An important caveat of the render cycle is that is a component's parent triggers a rerender all children of that parent will also rerender.

1. There is an imporant React feature called "hooks", they let you hook into Reacts lifecycle events, and state from our functional components. We'll talk about the different types of hooks and when to use them later.

## Creating our First React App.

We will be using vite in this example to create our first React App.
Vite is a build tool that priortizes speed and efficieny, using native ES modules rather than common-js, and Rollup instead of Webpack for bundling to the browser.

To create our first react app we will input into our terminal:

```
npm create vite@latest
```

Follow the prompts, creating a project name.

Select React as your framework

We will be using typescript, so select TypeScript + SWC as your variant

and a project folder will be crated in your current directory.
