import { Form, Link, useMatches, useParams } from "@remix-run/react";
import type { Posts } from "../shared/types";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Input, Textarea } from "@nextui-org/react";

export default function SinglePost() {
    const matches = useMatches();
    const { slug } = useParams(); // Get the slug from the URL
    const data = matches[1].data as Posts[]; // Access posts data from useMatches
    // console.log("Data from $slug path route", data);

    // Find the post by matching the slug
    const post = data.find((item) => item.slug === slug);

    if (!post) {
        return <p>Post Not Found :(</p>;
    }

    return (
        <div className="min-h-screen">
            <div className="flex justify-end mx-7 gap-4">
                <Link to="/posts" className="size-9 rounded-xl bg-[#e0d6c2] flex justify-center items-center hover:bg-skin_vanila duration-200"> <FaArrowLeftLong className="size-5 fill-vanila_text" /> </Link>
            </div>
            <div className="mx-6 p-5 bg-vanila rounded-3xl text-vanila_text my-5">
                <h1 className="text-2xl font-semibold">{post.title}</h1>
                <p className="mb-3">
                    by <span className="font-semibold">{post.user.name}</span> posted on{" "}
                    <span className="font-semibold">{new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}</span>
                </p>
                <p className="font-semibold">{post.summary}</p>
                <p>{post.description}</p>
            </div>
            
            {/* Display comments */}
            <div className="mx-6 p-5 bg-vanila rounded-3xl text-vanila_text">
                <h2 className="text-xl font-semibold">Comments <span className="text-lg">{`{${post.comments.length}}`}</span></h2>
                {/* Comment form */}
                <Form method="post" className="space-y-3 font-semibold">
                    <Input 
                        name="author"
                        radius="sm"
                        label="Author"
                        placeholder="Your name here (optional)"
                        className="w-1/2"
                        size="sm"
                    />
                    <Textarea
                        label="Comment"
                        radius="sm"
                        placeholder="Add your comment here"
                        name="content"
                        isRequired
                        size="sm"
                    />
                    <button type="submit" className="font-semibold px-3 py-1 border-2 hover:bg-red_vanila duration-200 hover:border-red_vanila hover:text-white border-red_vanila rounded-xl text-dark_vanila">
                        Submit!
                    </button>
                </Form>
                <hr className="my-4 border-dark_vanila"></hr>
                <ul>
                    {post.comments.map((comment) => (
                        <li key={comment.id}>
                            {comment.comment} -{" "}
                            <i className="font-semibold">{new Date(comment.date).toLocaleDateString()}</i>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
