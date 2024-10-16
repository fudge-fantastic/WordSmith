import { Button, Input, Textarea } from "@nextui-org/react";
import { Form } from "@remix-run/react";

export default function Comments({ comments, postId }: Readonly<CommentsProps>) {
    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-semibold">Comments Section ({comments.length})</h1>

            {/* Comment form */}
            <Form method="post" className="space-y-4 font-semibold">
                <Input 
                    name="author"
                    radius="sm"
                    label="Author"
                    placeholder="Your name here (optional)"
                    className="w-1/2"
                />
                <Textarea
                    label="Comment"
                    radius="sm"
                    placeholder="Add your comment here"
                    name="content"
                    isRequired
                />
                <Input 
                    type="hidden"
                    name="postId"
                    value={`${postId}`}  // Set postId here
                />
                <Button type="submit" variant="flat" radius="sm" className="font-bold mt-2">
                    Submit!
                </Button>
            </Form>

            {/* Render Comments */}
            <div className="mt-6 space-y-4">
                {comments.length > 0 ? (
                    comments.map((comment: Comment) => (
                        <div key={comment.commentId} className="border p-4 rounded-lg">
                            <p className="font-bold text-sm">{comment.author}</p>
                            <p className="text-sm">{comment.content}</p>
                            <span className="text-gray-500 text-xs">{comment.date}</span>
                        </div>
                    ))
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
}


// Interface for individual comment
interface Comment {
    commentId: number;
    author: string;
    content: string;
    date: string;
}

// Props for the Comments component
interface CommentsProps {
    comments: Comment[];
    postId: number; 
    actionData: unknown;
}