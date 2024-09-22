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
6. For dynamic routes, we use $ in the route. For instance, below is a dynamic route.
   - $ is a dynamic route, loader is a function that returns the dynamic route.
   - if the route is /posts/01-01-2024/hello, our file name would be something like: posts.tsx and posts.$date.$slug.tsx (this is an example of Dyanamic Routes).
7. Optional Segments: consider this, ($lang).products.tsx can help us create routes likes en/products (for english users) or fr/products (for french users). It's like a nested route.
8. If you want another dynamic route, just add another $ in the route. For instance, posts.$.tsx
   - posts.$.tsx can create any routes, like
     - posts.nature or posts.wild or posts.city or posts.land, etc
9. You can view/load the data using loader. For instance, content_api.js has some data (these are mostly called "resource route"). you can access the data using localhost:5173/content_api (this will load the data).

```tsx
export async function loader({ params }) {
  const slug = params.slug;
  console.log(slug);
  return slug;
}

export default function SinglePost() {
  return (
    <div>
      <h1>This is a Single Post page</h1>
    </div>
  );
}
```

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

### Links and Navigations

1. SSN (Server-Side-Navigation): When clicked on link, the whole page is loaded, and the URL changes. Now to prevent the entire page being loaded everytime we hit a link, we can use the "Link" component in Remix. It will only render the specific file. To disable this, we use reloadDocument property in Remix. [Visit here](https://remix.run/docs/en/main/components/link)
2. What is NavLinks? Wraps "Link" with additional props for styling active and pending states.
3. Meta tags are used to add metadata to a webpage. They provide information about the page, such as the title, description, and (historically) keywords. The title and description meta tags help search engines display relevant information about the page in search results. For instance, when someone searches for your website, they will typically see the title and description you've provided in your meta tags, although keywords are no longer a ranking factor for most modern search engines. [Visit this](https://www.wordstream.com/meta-tags)
