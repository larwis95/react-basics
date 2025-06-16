import React, { useState } from "react";

function ClickCounter() {
  const [count, setCount] = useState({
    countOne: 0,
    countTwo: 0,
    countThree: 0
  }); // Initialize the name state with the initialName prop

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;

    console.log(count);

    if (button.innerText.match("One"))
      return setCount((prev) => ({...prev, countOne: prev.countOne + 1})
    );

    if (button.innerText.match("Two"))
      return setCount((prev) => ({...prev, countTwo: prev.countTwo + 1})
    );

    if (button.innerText.match("Three"))
      return setCount((prev) => ({...prev, countThree: prev.countThree + 1})
    );
  };

  return (
    <>
      <h1>Hello, World</h1>
      <p>Click these buttons!</p>

      <button onClick = {handleChange}>
        Button One : { count.countOne }
      </button>

      <button onClick = {handleChange}>
        Button Two : { count.countTwo }
      </button>

      <button onClick = {handleChange}>
        Button Three : { count.countThree }
      </button>
    </>
  );
}

export default ClickCounter;
