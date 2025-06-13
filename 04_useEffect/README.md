# useEffect Hook

So we know that React is a declaritive UI framework, which means everything we do in it should be pure, which means not causing side effects. What if we need to cause a side effect, like for example, fetching data? Or directly accessing the real DOM and not the virtual dom?

There is a solution in React for this, and its called the `useEffect` hook.

Import to remember we ONLY need to use `useEffect` if we are:

1. Syncing with an external data source (database, backend api, local storage).
1. Accessing something on the DOM directly.

In all other cases you probablly do not NEED an effect, in fact reaching for useEffect when we don't need it can lead to perfomance issues, and hard to debug errors. It is not a solution for everything, and goes against the core prinipal of react, which is pure functions.

Lets break down `useEffect`

```TSX
import { useEffect, useState } from 'react';

function SomeComponentWithEffect() {
  // useEffect is a function call that takes two parameters.
  // parameter one is the callback function to run on every render
  /* paramater two is a depedency array, which is an array of
   dependencies that will determine if the useEffect runs or not on that
   render, if any of the dependencies have changed, than the useEffect will run. We can also leave it as a empty array to only run once on component mounting. If you leave out the array all together the effect will run every render.
   */
  useEffect(() => {
    console.log("hello world")
  }, []) // this will print hello world only when the component mounts to the dom

  const someDependency = "Larry"

  useEffect(() => {
    console.log("Hi, " + someDependency);
  }, [someDependency]); // this will run everytime someDependency changes

  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(count + 1);
    console.log(count)
  }) // AVOID doing something like this, since we are changing state in the useEffect, and we haven't included that state as a dependency, and haven't included a dependency array at all, this will run on every render. Now recall changing state triggers a rerender, so what we have here is an infinite render loop.
};
```

So what's a valid use case of useEffect then?

Well to show a good example we also have to talk about another hook that can be used as an escape hatch from React's declaritive paradigm: `useRef`.

`useRef` is a hook that lets us reference a value that is not needed for rendering.

`useRef` will return an object with a single property: current

`ref.current` will be set to the initial value you pass to the hook, null if no value is passed.

Unlike everything else in React, ref.current is mutable, which means we can change it just like in imperative design.

Some caveats with useRef:

1. Do not mutate `ref.current` if it is a value needed for rendering.
1. React does not care about the ref.current value, it is not aware of it because it is just a plain JavaScript object.
1. Never write to or read ref.current during rendering, except for when we initialize it with `useRef`.

Since ref is a plain JavaScript object we can use it to reference a actual DOM element, and React has built in support for that:

```TSX
import { useEffect, useRef } from 'react'

function SomeComponentWithRef() {
  const ref = useRef(); // Initialize our ref as a null value


  useEffect(() => {
    if (!ref.current) return; // if we dont have a ref, do nothing

    if (ref.current.nodeName === "input") {
      ref.current.focus(); // if the ref is an input, focus it on render
    }
  }, [ref]) // Make sure we only run if ref changes

  return (
    <input ref={ref} />
  )
}
```

Let's see an example now of fetching data with useEffect, and let's store that data in a useRef so we keep the previous data around.

```TSX
function Person({ id }) {
  const prevPerson = useRef(null);
  const [person, setPerson] = useState()

  /* For the sake of this example let's say that we have an api endpoint /person/:id that retrieves a person with the specified id path paramater.
  the end point returns a json object that looks like:
    {
    "firstName": "Larry",
    "lastName": "Wisniewski",
    "age": 30
    }
  */

// Since we are syncing with an external system, in this case a RESTful API we will have to fetch in a useEffect to use imperative code.
 useEffect(
  () => {
    // Since fetch a Promise, which is asynchronous, we want to use an async function and await it, async/await is just synatic sugar for promises, it makes promises look like synchronous code.
    const fetchPerson = async () => {
      try {
        const res = await fetch(`/api/person/${id}`); // await the response

        const data = await res.json(); // await the json unmarshaling

        setPerson(data); // set our person state with the person object

      }
      catch(e) {
        console.error("Error finding person! ", e);
      }
    };

      fetchPerson();
    }
  }, [id, person]);

  useEffect(
    () => {
      prevPerson.current = person;
    }, [person])

  return (
    /* We are using conditonal rendering here, the next lesson README goes over it a bit more indepth.
    For this purpose just know, the first <div> will only render if person is not a falsy value (null, undefined, 0, or false).
    And the 2nd div will only render is prevPerson.current is not a falsy value.
    */
    {person && (
      <div>
        <h2>{person.firstName.concat(" ", person.lastName);}<h2>
        <p>Age: {age}</p>
      </div>
    )}

    {prevPerson.current && (
      <div>
        <h2>Previous Person</h2>
        <h2>{prevPerson.current.firstName.concat(" ", prevPerson.current.lastName);}
        <h2>
        <p>Age: {prevPerson.current.age}</p>
      </div>

    )}
  )
}
```

In the previous example, on the first render let's say id 1 gets passed to our component id prop, and that id is a json object:

```JSON
  {
    "firstName": "Larry",
    "lastName": "Wisniewski",
    "age": "30"
  }
```

Then what we would see on the page is:

Larry Wisniewski
Age: 30

Previous Person:
Larry Wisniewski
Age: 30

now let's say we use state to pass an id of 2 to the Person compondent and the id of 2 corresponds with:

```JSON
  {
    "firstName": "Jacob",
    "lastName": "Wisniewski",
    "age": "27"
  }
```

our Person component will trigger a rerender with:

Jacob Wisniewski
Age: 27

Previous Person:
Larry Wisniewski
Age: 30

## Challenge

In `src/components/ImageContainer.tsx` we have a component that should be fetching data to pass down to its children Image components. Complete the useEffect to fetch the images.

In `src/components/Image.tsx` we have a completed Image component, add comments to explain what is happening in the code.
