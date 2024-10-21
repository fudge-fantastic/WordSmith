// app/types.ts
export interface Posts {
    id: number;
    userId: number;
    postId: number;
    title: string;
    slug: string;
    date: string;
    summary: string;
    description: string;
    category: string;
    user: User;
    comments: Comment[];
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }
  
  export interface Comment {
    id: number;
    userId: number;
    postId: number;
    postSlug: string;
    comment: string;
    date: string;
  }
  