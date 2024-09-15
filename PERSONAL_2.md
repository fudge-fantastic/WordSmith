## Notes
1. Optimizing, Rendering UI with the working functions -> .jsx or .tsx
2. Just keeping the working functions -> .js or .ts
3. In the routes folder, if added a file (.tsx or .jsx), you can access the file in the URL by http://localhost:5173/demo


## Imports and Exports
### Simple import
```ts
import {app} from "./test_folder_1/demo_child"
// Here, the demo_child is a .tsx file, and it has a default export

// demo_child.tsx
function app() {
    return <h1>Hi, I&appos;m the app</h1>;
}
export default app;
```

### Using named exports
```tsx
// file_1.tsx
// Named export
export const demo = () => {
  return <h1>Hi, I'm the demo</h1>;
};

// Default export
const demo_2 = () => {
  return <h1>Hi, I'm the demo_2</h1>;
};

export default demo_2;


// file_2.tsx
import demo_2, { demo } from "./file_1";

function App() {
  return (
    <>
      <demo />
      <demo_2 />
    </>
  );
}
export default App;
```

