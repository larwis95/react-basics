# useReducer

Remember how we said one of the disadvantages of the Context API was the fact that complex state could be hard to manage? Like for example:

```TSX
import { createContext, useState, useContext} from 'react';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [name, setName] = useState('Jake');
  const [isActive, setIsActive] = useState(false);
  const [lastActivity, setLastActivity] = useState(null);

  const toggleActivity = () => {
    setIsActive(prevIsActive => {
      setLastActivity(new Date().toLocaleString());
      return !prevIsActive;
    })
  }

  const updateName = newName => setName(newName);

  const profileContext = {
    profileState: { name, isActive, lastActivity},
    toggleActibity,
    updateName
  };

  return (
    <UserProfileContext.Provider value={profileContext}>
      { children }
    </UserProfileContext.Provider>
  )
};

export const useUserProfile = () => useContext(UserProfileContext);
```

We can already see even with only 3 pieces of the state we need to change/update the boiler plate for setting up our context is getting extremely complicated and hard to read.

And you might say, but we can use one object in useState as our state? Wouldn't that fix the issue? Why have all this useState just to update one property of our context state? We can just pass the `spread operator: ...` and only pass the property we want to change in our setState for our context.

You're absolutely right, you can do that, but imagine we had, I don't know, 40 properties on that state, and those properties have even more nested object state, and so on and so forth. There's also the implication that the spread operator does have a performance cost.

For example imagine doing something like:

```TSX
const { name, post, friends, comment, setUser } = useContext(UserContext);

const editPostContentBody = ( { user }, input) => {
  setUser(...user, post {
    ...post,
    content: {
      ...content,
      body: input
    }
  });
}
```

That's exhausting me, and we only went 2 levels down, not to mention if we wanted to change multiple pieces of that state. Not to mention, every single time we use the spread operator its costing us O(n - 1) time complexity since we have to iterate over every key of the object minus the key we are targeting.

So whats the solution?

## useReducer to the Rescue!

Now what is this hook? Simply put it was made to solve issues like the above. `useReducer`, is very similar to `useState`, but it allow us to handle complex state objects in a more elegant way.

There are 3 main parts of `useReducer`

**1. The State:** - The data your components need to remember, typically with `useState` we have many individual state pieces like in the example at the start (`name, isActive, lastActivity`). useReducer is almost always going to be a single object.

**2. Dispatch Function:** - A function that tells React you want to change the state. We usually call a setter function from `useState` to do this, but with `useReducer` we instead **_dispatch an action_**. An **action** is just a plain object that describes **_what we want to happen_**, for example:

```TSX
    dispatch({type: 'TOGGLE_ACTIVITY'});
    // or with a payload
    dispatch({type: 'SET_NAME', payload: 'Larry'})
```

**3. Reducer Function:** - This is where the actual work of `useReducer` happens. Its a pure function that takes two parameters: **_the current state_**, and **_the action that was dispatched_** - It returns the **_NEW state_**. - Remember this is a pure function, it does not _modify the original state directly_, it returns _brand new state_. `Immutability` after all is a core principle of React.

Let's take our example from the top and refactor it with `useReducer`.

### Example

```TSX
import { createContext, useReducer, useContext} from 'react';

const UserProfileContext = createContext();

const initialState = {
  name: 'Jake',
  isActive: false,
  lastActive: null
} // define an initial state.

// Create our reducer function
const profileReducer = (state, dispatch) => {
  switch (action.type) {
    case 'TOGGLE_ACTIVITY':
      return {
        ...state, // copy the state to maintain immutability
        isActive: !state.IsActive,
        lastActivity: new Date().toLocalteString()

      };
    case: 'SET_NAME':
      return {
        ...state,
        name: action.payload
      };
    default:
      return state; // if unknown action simply return the state
  }
}

export const UserProfileProvider = ({ children }) => {
  const [ profileState, dispatch ] = useReducer(profileReducer, initialState); // call use reducer with our reducer function and initial state

  return (
    <UserProfileContext.Provider value={{profileState, dispatch}}> {/* pass the profileState, and dispatch function as a single object*/}
      { children }
    </UserProfileContext.Provider>
  )
};

export const useUserProfile = () => useContext(UserProfileContext);
```

So what would this look like in our components then? Well let's take a look.

```TSX
import { useUserProfile } from '...';
import { useState } from 'react';

function EditProfile() {
  const [profile, dispatch] = useUserProfile();
  const [ newName, setNewName ] = useState("");

  const handleEditName = (name) => {
    dispatch({type: 'SET_NAME', payload: name});
  };

  const handleToggleActivity = () => {
    dispatch({type: 'TOGGLE_ACTIVITY'});
  }

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <input value={newName} onChange={handleChange} placeholder="Enter a new name for your profile." />
      <button onClick={() => handleEditName(newName)}>
        Submit Name
      </button>
      <button onClick={handleToggleActivity}>
        {profile.isActive ? "Logout": "Login"}
      </button>
    </div>
  )
};
```

This is much cleaner in the component, and much easier to follow! We avoid a ton of `useState` calls at the top level, and simply pass our action and payload if we need one!

With that in minds lets take us into our challenge.

## Challenge

**Your Task: Refactor the Counter**

Your goal is to refactor the counter we created in `09_global_state`, using `useReducer` instead of `useState`. This will allow us to add some more complex logic, so we will also want to add a way of decrementing and resetting the count.

Here are the steps to complete the challenge:

1. Make a `counterReducer` function, it should have two arguments: `state` and `action`
1. Define some initial state for our counter. HINT: it will probably want to start at zero.
1. Refactor `CounterProvider` to use `useReducer`
1. Update `CounterControls` to `dispatch actions`.
   - You will need to add an decrement, and reset button along with corresponding event handler functions.
1. Update `CounterDisplay` to get the state from our Context, which will be state.count now.

Once complete, all three buttons should correctly manipulate the count displayed on the screen. This will demonstrate how useReducer can centralize all your state transitions in one place!

** *BONUS can you make the decrement not go below zero in our reducer function?* **
