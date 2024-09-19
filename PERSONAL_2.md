## Notes

1. Optimizing, Rendering UI with the working functions -> .jsx or .tsx
2. Just keeping the working functions -> .js or .ts
3. In the routes folder, if added a file (.tsx or .jsx), you can access the file in the URL by http://localhost:5173/demo
4. Nested routes can be accessed by http://localhost:5173/posts or http://localhost:5173/posts/design
   - posts/design
   - posts/design/figma
   - For instance, create two or more .tsx or .jsx file in the routes folder, and name them as below:
     - posts.tsx
     - posts.design.tsx
     - posts.design.figma.tsx
   - You can access these routes by http://localhost:5173/posts/design/figma
   - But if noted, we cannot view those child components on the web-apges, in order to view them, we use Outlet component in the parent component.
   - For instance, we can use Outlet component in the posts.tsx file to display the posts/design/figma component.
   - It's like a linked-list, you'll have to use use the Outlet component to access the child components. You can find the code in this section.
   - If you don't wanna share your layout with nested routes, you can use [posts_.design_.figma.tsx] instead. It will only show the figma page.
   - Another one is, if you don't wanna share your URL route with the people, you can use [_auth.tsx] and [_auth.login.tsx] instead.
5. \_index.tsx is a default route. Why? Note the underscore before the index.tsx file. "\_" ignores the filename.
6. Dynamic Routes:

## Code Demo

### Simple import

```ts
import { app } from "./test_folder_1/demo_child";
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

### Nested Routing

```tsx
// posts.tsx
import { Outlet } from "@remix-run/react";

export default function Posts() {
  return (
    <div>
      <h1>This is a Posts page</h1>
      <Outlet />
    </div>
  );
}

// posts.design.tsx
import { Outlet } from "@remix-run/react";

export default function Design() {
  return (
    <div>
      <h1>This is a Design page</h1>
      <Outlet />
    </div>
  );
}

// posts.design.figma.tsx
export default function Figma() {
  return (
    <div>
      <h1>This is a Figma page</h1>
    </div>
    // <Outlet />
  );
}
```
