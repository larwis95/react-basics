function SomeListComponent() {
  const names = ["Jake", "Larry", "Alex", "Retard"];

  return (
    <ul>
      {names.map((item) => {
        return <li>{item}</li>;
      })}
    </ul>
  );
}

export default SomeListComponent;
