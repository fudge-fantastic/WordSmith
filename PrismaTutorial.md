## DataBase

```bash
npm i --save-dev prisma typescript ts-node @types/node nodemon
npx prisma init --datasource-provider postgresql
```

Will Return something like: 
```bash
warn Prisma would have added DATABASE_URL but it already exists in .env
warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started
```

Some Commands
```bash
# to format the prisma schema
npx prisma format

# Migrate to your database, when you wanna make changes in the database schema
npx prisma migrate dev --name init

# Generate the Prisma Client
npx prisma generate
```
### **Models Overview**

Your Prisma schema defines three main models: `User`, `Post`, and `Comment`. Each of these models represents a table in your database. Here’s what each model represents:

- **User**: Represents users who can write posts and comments.
- **Post**: Represents blog posts or articles written by users.
- **Comment**: Represents comments made by users on specific posts.

### **Relations Between Models**

The relationships between the models are defined using foreign keys. In this schema:

- **A `User` can write many `Posts`.**
- **A `User` can write many `Comments`.**
- **A `Post` can have many `Comments`.**

These relationships are key to understanding how to query data.

---

### **User Model**

```prisma
model User {
  id              String    @id @default(uuid())  // Unique identifier for each user (UUID format)
  name            String                          // The name of the user
  birthDate       String                          // User's birthdate
  email           String    @unique               // User's email, must be unique
  password        String                          // User's password
  role            Role      @default(BASIC)       // User role, defaults to BASIC (could be ADMIN)
  
  writtenPosts    Post[]    @relation("WrittenPosts")   // A user can write many posts
  writtenComments Comment[] @relation("WrittenComments") // A user can write many comments

  @@unique([name, birthDate])  // Combination of name and birthdate must be unique
  @@index([email])             // Index to optimize search on email field
}
```

- **Fields**:
  - `id`: Unique identifier for the user.
  - `name`: Name of the user.
  - `birthDate`: User's birth date.
  - `email`: User's email, which must be unique across the database.
  - `password`: User's password (hashed).
  - `role`: Defines the role of the user. It can be either `BASIC` or `ADMIN` (set using the `Role` enum).
  - `writtenPosts`: A list of posts that the user has written (one-to-many relationship).
  - `writtenComments`: A list of comments that the user has written (one-to-many relationship).

- **Indexes**:
  - `@@unique([name, birthDate])`: Ensures that the combination of `name` and `birthDate` is unique in the database.
  - `@@index([email])`: Helps speed up database queries for the `email` field.

---

### **Post Model**

```prisma
model Post {
  id           String    @id @default(uuid())     // Unique identifier for each post (UUID format)
  authorId     String                          // Foreign key pointing to the user who wrote the post
  createdAt    DateTime  @default(now())        // Timestamp of when the post was created
  updatedAt    DateTime  @default(now())        // Timestamp of when the post was last updated
  author       User      @relation("WrittenPosts", fields: [authorId], references: [id]) // Relation to the author (User)
  
  title        String                          // Title of the post
  slug         String                          // A URL-friendly version of the title
  summary      String                          // A short summary of the post
  description  String                          // Full content of the post
  category     String                          // Category of the post (e.g., tech, sports, etc.)
  
  comments     Comment[] @relation("PostComments") // A post can have many comments (one-to-many relationship)
}
```

- **Fields**:
  - `id`: Unique identifier for the post.
  - `authorId`: Foreign key linking to the `User` who wrote the post.
  - `createdAt`: Timestamp for when the post was created.
  - `updatedAt`: Timestamp for the last update of the post.
  - `author`: A relation that links the post to the user who wrote it.
  - `title`: Title of the post.
  - `slug`: A URL-friendly version of the title (used in links).
  - `summary`: A short description or teaser for the post.
  - `description`: The main content of the post.
  - `category`: The category to which the post belongs (e.g., technology, health, etc.).
  - `comments`: A list of comments associated with the post.

---

### **Comment Model**

```prisma
model Comment {
  id        String   @id @default(uuid())       // Unique identifier for each comment (UUID format)
  authorId  String                             // Foreign key pointing to the user who wrote the comment
  postId    String                             // Foreign key pointing to the post that the comment belongs to
  createdAt DateTime @default(now())            // Timestamp of when the comment was created
  content   String                             // Content of the comment
  
  author    User     @relation("WrittenComments", fields: [authorId], references: [id]) // Relation to the author (User)
  post      Post     @relation("PostComments", fields: [postId], references: [id]) // Relation to the post (Post)
}
```

- **Fields**:
  - `id`: Unique identifier for the comment.
  - `authorId`: Foreign key linking the comment to the `User` who wrote it.
  - `postId`: Foreign key linking the comment to the `Post` it is associated with.
  - `createdAt`: Timestamp for when the comment was created.
  - `content`: The text of the comment.
  - `author`: A relation that links the comment to the user who wrote it.
  - `post`: A relation that links the comment to the post it belongs to.

---

### **Role Enum**

```prisma
enum Role {
  BASIC
  ADMIN
}
```

- **Role**: Defines two possible roles for users:
  - `BASIC`: A regular user.
  - `ADMIN`: An admin with elevated privileges.

---

### **How the Relations Work**

1. **User and Post (One-to-Many)**:
   - A single `User` can write multiple `Posts`. The foreign key `authorId` in the `Post` model links each post to a specific user.

2. **Post and Comment (One-to-Many)**:
   - A single `Post` can have multiple `Comments`. The foreign key `postId` in the `Comment` model links each comment to a specific post.

3. **User and Comment (One-to-Many)**:
   - A single `User` can write multiple `Comments`. The foreign key `authorId` in the `Comment` model links each comment to a specific user.

### **Querying Data**

#### Fetch a Post and Its Comments:
```js
const postWithComments = await prisma.post.findUnique({
  where: { id: "post_id_here" },  // Replace with actual post ID
  include: { comments: true },    // Include all associated comments
});
```

#### Fetch Comments with Author and Post Information:
```js
const commentsWithDetails = await prisma.comment.findMany({
  include: {
    post: true,    // Include the post the comment belongs to
    author: true,  // Include the user who wrote the comment
  },
});
```

#### Fetch a Post, Its Comments, and the Comment Authors:
```js
const postWithCommentsAndAuthors = await prisma.post.findUnique({
  where: { id: "post_id_here" },  // Replace with actual post ID
  include: {
    comments: {
      include: { author: true },  // Include authors of the comments
    },
  },
});
```

## Commands

```js
async function main() {
    // Creating single new User
    const user = await prisma.user.create({data: {name: "Saly"}})
    const users = await prisma.user.findMany()
    console.log(users)
}

await prisma.user.deleteMany() // Inside the async function, to delete the entire records of the model
await prisma.user.createMany() // To create multiple records of the model
data: [
  {name: "Kely", email: "bluesalt@gmail.com", age: 23},
  {name: "Sally", email: "greenman@gmail.com", age: 21},
]
await prisma.user.findMany() // To view multiple records of the model

// To filter the data,
await prisma.user.findMany({
  where: {
    name: {
      "sally", 
    },
    orderBy: {
      age: "desc"
    }
    email: {
      contains: "@test.com",
    }
  }
}) 

// To update the data
await prisma.user.update({
  where: {
    email: "greenman@test.com",
  },
  data: {
    name: "Sally",
    email: "greenman@gmail.com",
    age: 21
  }
})
```