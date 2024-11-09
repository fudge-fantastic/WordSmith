import { Form, Link, useOutletContext, useParams } from "@remix-run/react";
import type { Posts } from "../shared/types";
import { Textarea, Tooltip } from "@nextui-org/react";
import Markdown from "react-markdown";
import { FaEdit  } from "react-icons/fa";

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
            <div className="mx-6 p-4 bg-vanila rounded-3xl text-vanila_text my-2 font-raleway">
                <div className="flex items-center gap-4">
                    <div className="font-semibold tracking-normal text-3xl">{post.title}</div>
                    <Tooltip content="Edit Post" offset={4} delay={10} closeDelay={10}>
                        {/* <Link to={`/posts/${post.slug}/editpost/${post.id}`}> */}
                        <Link to={`/posts/editpost/${post.id}`}>

                            <FaEdit className="size-5" />
                        </Link>
                    </Tooltip>
                </div>
                <p className="mb-3 text-sm">
                    by <span className="font-bold">{post.author.name}</span> posted on{" "}
                    <span className="font-bold">{new Date(post.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}</span>
                </p>
                <p className="text-2xl font-semibold">Summary</p>
                <p className="font-semibold mb-2">{post.summary}</p>
                <Markdown className="my-2">{post.description}</Markdown>
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
                    <button type="submit" className="border-2 px-4 py-0 rounded-full border-vanila_text hover:bg-vanila_text hover:text-vanila duration-200">
                        Submit!
                    </button>
                </Form>
                {/* <hr className="my-4 border-dark_vanila"></hr> */}
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
