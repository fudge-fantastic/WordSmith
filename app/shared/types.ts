// app/types.ts

export interface Posts {
    id : string
    authorId : string
    createdAt : Date
    updatedAt : Date
    author : User
    title : string
    slug : string
    summary : string
    description : string
    category : string
    comments : Comment[]
}


export interface User {
    id :       string
    name :     string
    email :    string
    password : string
    bio :      string
  }
  
  export interface Comment {
    id        :string
    authorId  :string
    postId    :string
    createdAt :Date
    author    :User
    post      :Posts
    content   :string
  }
  