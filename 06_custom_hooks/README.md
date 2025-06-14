# Custom Hooks

Okay so we know all the most commonly used React hooks nows, but wouldn't it get pretty repetivie using the same hooks over and over again? Like imagine we have to fetch the cat data from 04 on separate pages, do I really want to write that code for every component that needs it?

Of course not, after all DRY is a SOLID principle.

So how can we fix that?

Well React has a feature that allows you to define your own custom hooks.

For example with the cat fetching logic:

```tsx
export function useCatFetch() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=10"
        );

        const data = await res.json();

        setData(data);
      } catch (e) {
        console.error("Error fetching! ", e);
        setData(null);
      }
    };
  }, [data]);

  return [data, setData];
}
```

We can then import this custom hook, and use it anywhere we need to fetch our cats!

Example:

```TSX
import { useCatFetch } from '...'
function CatImages() {
  const [cats, setCats] = useCatFetch();

  return (
    //...do something with cats
  )
};
```

Some import caveats with custom hooks:

1. Must be prefixed with `use` why? React knows anything that starts with the prefix `use` is a hook, which helps it control the render cycle of a component.
1. Can only be used at the top level of a component! This is true of not just custom hooks, but EVERY hook. For example we cannot do this:

```TSX

function CatImages() {
  const getCatData = () => {
    const [cats, setCats] = useCatFetch();
    return [cats, setCats];
  } // cannot put a hook inside another function, or the JSX

  return (
    //...do something with cats
  )
};
```

3. Do not call hooks inside loops, conditions, or try/catch blocks, for the same reason as above, they can only be called in the immediate component scope.
1. Do not call hooks inside the hooks useMemo or useCallback, we haven't talked about these hooks yet, but it is important to stress this now.
