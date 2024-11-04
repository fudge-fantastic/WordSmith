import { Form, useOutletContext, useParams } from "@remix-run/react";
import type { Posts } from "../shared/types";
import { Textarea } from "@nextui-org/react";
import Markdown from "react-markdown";

export default function SinglePost() {

    const { sharedData } = useOutletContext<{ sharedData: Posts[] }>() || { sharedData: [] };
    // const matches = useMatches();
    const { slug } = useParams(); // Get the slug from the URL
    const post = sharedData.find((item) => item.slug === slug);

    if (!post) {
        return <p>Post Not Found :(</p>;
    }

    return (
        <div>
            <div className="mx-6 p-5 bg-vanila rounded-3xl text-vanila_text my-4">
                <h1 className="text-2xl font-semibold">{post.title}</h1>
                <p className="mb-3">
                    by <span className="font-semibold">{post.author.name}</span> posted on{" "}
                    <span className="font-semibold">{new Date(post.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}</span>
                </p>
                <p className="font-semibold">{post.summary}</p>
                <Markdown>{post.description}</Markdown>
            </div>
            
            {/* Display comments */}
            <div className="mx-6 p-5 bg-vanila rounded-3xl text-vanila_text">
                <h2 className="text-xl font-semibold">Comments <span className="text-lg">{`{${post.comments.length}}`}</span></h2>
                {/* Comment form */}
                <Form method="post" className="space-y-3 font-semibold">
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
                            {comment.content} -{" "}
                            <i className="font-semibold">{new Date(comment.createdAt).toLocaleDateString()}</i>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
