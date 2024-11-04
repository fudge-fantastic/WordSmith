import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";
import { json, redirect } from "@remix-run/node";
import categories_data from "./../shared/categories_data";
import { Form, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { createPost } from "../db/query";
import { getSession } from "~/sessions_db";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Slug logic
function slugify(title: string) {
    return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/^-|-$/g, '');
}

// Loader function
export async function loader({ request }: { request: Request }) {
    const userSession = await getSession(request.headers.get("cookie"));
    if (!userSession.has("userId")) return redirect("/login");
    return json({ success: true });
}

// Action function
export async function action({ request }: { request: Request }) {
    const body = await request.formData();
    // 91060d0e-0620-470c-87c1-ee29634246b1
    const userId = "91060d0e-0620-470c-87c1-ee29634246b1";
    // const userId = body.get("authorId") as string;
    const title = body.get("title") as string;
    const summary = body.get("summary") as string;
    const description = body.get("description") as string;
    const category = body.get("category") as string;
    const slug = slugify(title);
    console.log(userId, title, summary, description, category, slug) 

    if (!userId || !title || !summary || !description || !category) {
        return json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        await createPost(userId, title, slug, summary, description, category);
        redirect("/posts");
    } catch (error) {
        console.error("Error creating post:", error);
        return json({ error: "Error creating post" }, { status: 500 });
    }

    return json({ success: true });
}

export default function CreatePosts() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    // State management for form fields and preview
    const [formFields, setFormFields] = useState({
        title: "",
        summary: "",
        description: "",
        category: ""
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
        setErrors({ ...errors, [name]: value ? "" : `${name} is required` });
    };

    // Handle form submission validation
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const newErrors: { [key: string]: string } = {};

        // Check each field for empty values
        Object.keys(formFields).forEach((field) => {
            if (!formFields[field as keyof typeof formFields]) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            e.preventDefault();
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold font-raleway text-vanila">Think the unthinkable.</h1>
            <div className="bg-green_vanila w-4/5 min-h-auto m-6 rounded-xl shadow-xl">
                <Form method="post" className="relative m-6 rounded-xl space-y-5" onSubmit={handleSubmit}>
                    <div className="flex md:flex-row justify-between gap-5 flex-col">
                        <Input name="authorId" type="hidden"/>
                        <Input size="sm" label="Title" placeholder="Enter your title here" className="w-full" radius="sm"
                            variant="flat"
                            name="title"
                            isRequired
                            description={errors.title}
                            color={errors.title ? "danger" : "default"}
                            value={formFields.title}
                            onChange={handleInputChange}
                            maxLength={100}
                        />
                        <Select label="Content type" placeholder="Select Category" className="md:max-w-64" name="category" size="sm"
                            isRequired
                            value={formFields.category}
                            onChange={handleInputChange}
                        >
                            {categories_data.map((category) => (
                                <SelectItem key={category.name} value={category.name}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <Textarea
                        className="font-semibold"
                        isRequired
                        label="Summary"
                        placeholder="Post Summary"
                        radius="sm"
                        name="summary"
                        color={errors.summary ? "danger" : "default"}
                        description={errors.summary}
                        value={formFields.summary}
                        onChange={handleInputChange}
                        maxLength={500}
                    />
                    <Textarea className="font-semibold" isRequired radius="sm" label="Description (Markdown supported)" placeholder="Write your content using Markdown..." name="description"
                        color={errors.description ? "danger" : "default"}
                        description={errors.description}
                        value={formFields.description}
                        onChange={handleInputChange}
                        maxLength={5000}
                    />
                    <button
                        type="submit"
                        className="font-semibold border-2 border-vanila bg-vanila rounded-full px-5 py-1 text-sm text-vanila_text hover:bg-green_vanila duration-250"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Create Post"}
                    </button>
                </Form>

                <div className="p-4 mt-4 rounded-lg shadow-lg text-vanila_text">
                    <h2 className="font-semibold text-lg">Preview:</h2>
                    <Markdown remarkPlugins={[remarkGfm]}>{formFields.description}</Markdown>
                </div>
            </div>
        </div>
    );
}
