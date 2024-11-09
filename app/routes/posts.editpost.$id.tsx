/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Input, SelectItem, Textarea } from "@nextui-org/react";
import { Form, useLoaderData, useNavigation, json, redirect } from "@remix-run/react";
import { useState } from "react";
import { getPostById, editPost } from "~/db/query";
import categories_data from "~/shared/categories_data";
import { slugify } from "./posts.new_post";

// Loader function to fetch post data from the database
export async function loader({ params }: { params: any }) {
  const postId = params.id;
  const result = await getPostById(postId);
  if (!result) {
    throw new Response("Post not found", { status: 404 });
  }
  return json(result);
}

export async function action({ request, params }: { request: Request; params: any }) {
  const body = await request.formData();
  const authorId = body.get("authorId") as string;
  const title = body.get("title") as string;
  const summary = body.get("summary") as string;
  const description = body.get("description") as string;
  const category = body.get("category") as string;
  const postId = params.id;
  const slug = slugify(title);

  if (!authorId || !title || !summary || !description || !category) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    await editPost(postId, authorId, title, slug, summary, description, category);
    return redirect("/posts");
  } catch (error) {
    console.error("Error while editing post:", error);
    return json({ error: "Error while editing post" }, { status: 500 });
  }
}

export default function EditPost() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const post = useLoaderData<{
    id: string;
    title: string;
    summary: string;
    description: string;
    category: string;
    authorId: string;
  }>();

  // States to manage form input values
  const [title, setTitle] = useState(post.title);
  const [summary, setSummary] = useState(post.summary);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  // Temporary errors object to demonstrate form validation errors
  const errors: { [key: string]: string | null } = {
    title: null,
    category: null,
    summary: null,
    description: null,
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-semibold font-raleway text-vanila">Flip the Script</h2>

      <div className="bg-vanila w-4/5 min-h-auto m-6 rounded-xl shadow-xl">
        <Form method="post" className="relative m-4 rounded-xl space-y-5">
          <div className="flex md:flex-row justify-between gap-5 flex-col">
            {/* Hidden input to pass the authorId */}
            <Input name="authorId" type="hidden" value={post.authorId} />
            <div className="w-full">
              <Input size="sm" label="Title" radius="sm" variant="flat" name="title" isRequired
                className="text-vanila_text"
                value={title}
                maxLength={100}
                placeholder="Enter your title here"
                onChange={(e) => setTitle(e.target.value)}
                color={errors.title ? "danger" : "default"}
              />
              {errors.title && <p className="text-vanila_text text-xs font-bold m-1">{errors.title}</p>}
            </div>

            {/* Category select dropdown */}
            <div className="md:max-w-64 w-full">
              <Select label="Content type" placeholder="Select Category" name="category" size="sm" isRequired
                value={category}
                color={errors.category ? "danger" : "default"}
                onChange={(e) => setCategory(e as unknown as string)}
              >
                {categories_data.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </Select>
              {errors.category && <p className="text-vanila_text text-xs font-bold m-1">{errors.category}</p>}
            </div>
          </div>

          {/* Summary input */}
          <div>
            <Textarea isRequired label="Summary" placeholder="Post Summary" radius="sm" name="summary"
              className="font-semibold"
              color={errors.summary ? "danger" : "default"}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              maxLength={500}
            />
            {errors.summary && <p className="text-vanila_text text-xs font-bold m-1">{errors.summary}</p>}
          </div>

          {/* Description input with Markdown support */}
          <div>
            <Textarea isRequired radius="sm" label="Description (Markdown supported)" name="description"
              placeholder="Write your content using Markdown..."
              className="font-semibold"
              color={errors.description ? "danger" : "default"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={5000}
            />
            {errors.description && <p className="text-vanila_text text-xs font-bold m-1">{errors.description}</p>}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="font-semibold border-2 border-vanila_text rounded-full px-5 py-1 text-sm text-vanila_text hover:bg-vanila_text hover:text-vanila duration-250"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Edit Post"}
          </button>
        </Form>
      </div>
    </div>
  );
}
