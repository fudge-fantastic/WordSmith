import { useLoaderData, Link, useActionData, useNavigation } from "@remix-run/react";
import fetchSomeData from "./../../posts_db.json";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { FaArrowLeft } from "react-icons/fa6";
import Comments from "~/components/CommentsSection";
import commentsData from "./../../comments.json";
import { getCurrentDate } from "./posts.new_post";
import fs from "fs/promises"; 
import { useEffect, useState } from "react";

// Find similar content from the DB or the data
export async function loader({ params }: LoaderFunctionArgs) {
    const data = fetchSomeData;
    const slug = params.slug;
    const post = data.find((item: { slug: string | undefined }) => item.slug === slug);
    if (!post) {throw new Error("Post not found.");}
    // Find comments based on the postId
    const filteredComments = commentsData.find((comment) => comment.postId === post.postId)?.comments || [];
    return json({ post: [post], filtered_comments: filteredComments });
    // return json(post);
}  

function delay(ms: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// Catch form data from the request (hit on submit from CommentsSection.tsx)
export async function action({ request }: { request: Request }) {
    try {
        await delay(5000)
        const body = await request.formData();
        const postId = Number(body.get("postId"));
        const author = body.get("author")?.toString() || "Anonymous";
        const content = body.get("content")?.toString();
        const date = getCurrentDate();

        if (!content || content.trim() === "") {
            console.log("Comment cannot be empty.");
            return json({ error: "Comment cannot be empty." }, { status: 400 });
        }

        // Find the post to append the comment to
        const postComments = commentsData.find((post) => post.postId === postId);

        if (!postComments) {return json({ error: "Post not found." }, { status: 404 });}

        // Generate new commentId by incrementing the last commentId
        const lastComment = postComments.comments[postComments.comments.length - 1];
        const newCommentId = lastComment ? lastComment.commentId + 1 : 1;

        const newComment = { postId, commentId: newCommentId, author, content, date };
        // Push the new comment 
        postComments.comments.push(newComment);

        // Save the updated comments data asynchronously
        const commentsFilePath = "./comments.json";

        try {
            await fs.writeFile(commentsFilePath, JSON.stringify(commentsData, null, 2));
        } catch (error) {
            console.error("Error writing to file:", error);
            return json({ error: "Error saving comment to the file." }, { status: 500 });
        }

        return json({ success: true });

    } catch (error) {
        console.error("Error in action:", error);
        return json({ error: "Internal Server Error." }, { status: 500 });
    }
}

export default function SinglePost() {
    // const { post, filtered_comments } = useLoaderData<LoaderData>(); //Loading the data
    const { post, filtered_comments } = useLoaderData<LoaderData>(); //Loading the data
    const actionData = useActionData();
    const navigation = useNavigation();
    const [comments, setComments] = useState(filtered_comments);

    useEffect(() => {
        if (navigation.formData && navigation.formData.get("content")) {
            const newComment = {
                // "postId": navigation.formData.get("postId")?.toString() ?? "",
                "commentId": comments.length + 1, // generate a new commentId
                "author": navigation.formData.get("author")?.toString() ?? "",
                "content": navigation.formData.get("content")?.toString() ?? "",
                "date": getCurrentDate()
            }
            const updatedData = [...comments, newComment];
            setComments(updatedData);
        }
    }, [comments, navigation.formData])

    if (!post || post.length === 0) {
        return <div>Error loading the post.</div>;
    }

    return (
        <div className="min-h-screen">
            <div className="flex font-semibold mb-4 justify-center">
                <button className="flex gap-2 items-center duration-200 hover:text-slate-700">
                    <FaArrowLeft />
                    <Link to="/posts">Return back</Link>
                </button>
            </div>
            <div className="m-8">
                {post.map((item: Posts) => (
                    <div
                        className="text-justify m-4 bg-white p-6 rounded-xl border-1 border-slate-100 shadow-xl"
                        key={item.id}
                    >
                        <h1 className="font-bold text-2xl mb-4">{item.title}</h1>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
            <div className="mx-12 rounded-xl bg-white shadow-xl">
                <Comments comments={filtered_comments} postId={post[0].postId} actionData={actionData}/>
            </div>
        </div>
    );
}

interface Posts {
    id: number;
    postId: number; // Added later
    title: string;
    summary: string;
    author: string;
    date: number;
    slug: string;
    description: string;
    category: string;
}

interface Comment {
    commentId: number;
    author: string;
    content: string;
    date: string;
}

interface LoaderData {
    post: Posts[];
    filtered_comments: Comment[];
}
