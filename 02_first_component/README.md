# Creating our First Component

React is a very developer experience friendly framework and makes building UI's much more simple than the old imperative approach of the likes of J-Query.

Components are reusable pieces of isolated UI, basically they are just functions that contain both JavaScript in our case, TypeScript, and markup.

So let's make our first first component!

Steps:

1. Navigate in your terminal to first-component `cd first-component`
1. Install our dependencies `npm i`
1. Open up the entry point of our application: `/src/App.tsx`
1. You should see an empty "App" function like so:

```TSX
function App() {


  return (

  )
}

export default App
```

5. Lets create a simple Hello World component!
6. Start by making a name for the component:

```TSX
function HelloWorld() {

}

function App() {


  return (

  )
}

export default App
```

7. We aren't worried about state right now, so lets just return some markdown with what we want to show, in this case lets return a `<div>` that contains a `<h1>` and a `<p>`:

```TSX
function HelloWorld() {
  return (
    <div>
      <h1>Hello World!</h1>
      <p>My name is Larry!</p>
    </div>
  )
}

function App() {


  return (

  )
}

export default App
```

8. Now we can simple have the app return that component!

```TSX
function HelloWorld() {
  return (
    <div>
      <h1>Hello World!</h1>
      <p>My name is Larry!</p>
    </div>
  )
}

function App() {


  return (
    <HelloWorld />
  )
}

export default App
```

And there we go, we just crated our first reusable component in React!

Simply run `npm run dev` and navigate to `localhost:5173` and we can view the webpage in the browser!
