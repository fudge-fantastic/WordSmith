import { Link, useMatches, useParams } from "@remix-run/react";
import type { Posts } from "../shared/types";
import { FaArrowLeftLong } from "react-icons/fa6";

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
                <hr className="mb-3 mt-1 border-dark_vanila"></hr>
                <ul>
                    {post.comments.map((comment) => (
                        <li key={comment.id}>
                            {comment.comment} -{" "}
                            <i>{new Date(comment.date).toLocaleDateString()}</i>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
