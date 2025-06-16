let age = 30;

age; // Typewill know age is intially a number

age = 25; // Reassign to different number no compiler error

age = "Hello"; // Compiler error: Type 'string' is not assignable to type 'number'.

// This is type inference, TypeScript infers the type of the variable based on its initial value.

function add(a: number, b: number): number {
  return a + b;
}

let result = add(5, 10); // result is inferred to be a number
let result2 = add(5, "10"); // Compiler error: Argument of type 'string' is not assignable to parameter of type 'number'.

// TypeScript allows you to create custom types using interfaces or type aliases.

interface Person {
  name: string;
  age: number;
  isEmployed?: boolean; // Optional property
}

let person: Person = {
  name: "John",
  age: 30,
  isEmployed: true, // Optional property can be omitted
};

let person2: Person = {
  name: "Jane",
  age: 25,
  // isEmployed is optional, so we can omit it
};

let person3: Person = {
  name: "Doe",
  age: 40,
  isEmployed: 1, // Optional property can be set to false
};

interface Employee extends Person {
  employeeId: number;
  department: string;
}

let employee: Employee = {
  name: "Alice",
  age: 28,
  employeeId: 12345,
  department: "Engineering",
  isEmployed: true, // Optional property can still be used
};

// Aliases are almost the same as interfaces, but we can use them for primitivie types, we can also union them, and intersect them.

type ID = string | number; // Union type, ID can be either a string or a number

function getUserById(id: ID): Person | null {
  // Simulating a user fetch
  if (typeof id === "string") {
    return { name: "User", age: 30, isEmployed: true };
  } else if (typeof id === "number") {
    return { name: "Admin", age: 40, isEmployed: false };
  }
  return null; // If id is neither string nor number
}

type Coordinates = {
  x: number;
  y: number;
};

type Point = Coordinates & {
  z: number; // Intersection type, Point has all properties of Coordinates plus z
};

function logPoint(point: Point): void {
  console.log(`Point coordinates: (${point.x}, ${point.y}, ${point.z})`);
}

// We can create some interesting types using generics, which allow us to create reusable components or functions that can work with any type.

type Res<T> = {
  data: T;
  status: number;
  message: string;
};

function fetchData<T>(url: string): Promise<Res<T>> {
  return new Promise((resolve) => {
    // Simulating a fetch request
    setTimeout(() => {
      resolve({
        data: {} as T, // Type assertion to T
        status: 200,
        message: "Success",
      });
    }, 1000);
  });
}

fetchData<Person>("https://api.example.com/user")
  .then((response) => {
    console.log(response.data.name); // Accessing the name property of Person
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

const sayHiPerson = (
  person: Person,
  { returnAge }: { returnAge: boolean }
): string | number => {
  if (returnAge) {
    return person.age; // Return age if returnAge is true
  }
  return `Hello, ${person.name}`; // Return greeting otherwise
};

const hi = sayHiPerson({ name: "John", age: 30 }, { returnAge: false });

if (typeof hi === "number") {
  console.log(`Age: ${hi + 2}`); // This will not run since returnAge is false
}

hi.toUpperCase(); // Compiler error: Property 'toUpperCase' does not exist on type 'string | number'.
