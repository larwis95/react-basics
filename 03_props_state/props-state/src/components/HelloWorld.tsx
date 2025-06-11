import { useState } from "react";

function HelloWorld({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName); // Initialize the name state with the initialName prop

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Finish the function to update the name state
    // Hint: Use setName to update the name state
    // Hint 2:  event.target.value will give you the new value
  };

  return (
    <>
      <h1>Hello, World</h1>
      <p>My name is {name}</p>
      <input
        type="text"
        value={name /* Binds the input value to the name state */}
        onChange={handleChange}
        placeholder="Enter your name"
      />
    </>
  );
}

export default HelloWorld;
