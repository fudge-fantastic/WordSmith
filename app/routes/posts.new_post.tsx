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
    const userId = "91060d0e-0620-470c-87c1-ee29634246b1";
    const title = body.get("title") as string;
    const summary = body.get("summary") as string;
    const description = body.get("description") as string;
    const category = body.get("category") as string;
    const slug = slugify(title);

    if (!userId || !title || !summary || !description || !category) {
        return json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        await createPost(userId, title, slug, summary, description, category);
        return redirect("/posts");
    } catch (error) {
        console.error("Error creating post:", error);
        return json({ error: "Error creating post" }, { status: 500 });
    }
}

export default function CreatePosts() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

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
            <h2 className="font-semibold font-raleway text-vanila">Think the unthinkable.</h2>
            <div className="bg-vanila w-4/5 min-h-auto m-6 rounded-xl shadow-xl">
                <Form method="post" className="relative m-4 rounded-xl space-y-5" onSubmit={handleSubmit}>
                    <div className="flex md:flex-row justify-between gap-5 flex-col ">
                        <Input name="authorId" type="hidden"/>
                        <div className="w-full">
                            <Input size="sm" label="Title" placeholder="Enter your title here" className="text-vanila_text" radius="sm" variant="flat" name="title" isRequired
                                color={errors.title ? "danger" : "default"}
                                value={formFields.title}
                                onChange={handleInputChange}
                                maxLength={100}
                            />
                            {errors.title && <p className="text-vanila_text text-xs font-bold m-1">{errors.title}</p>}
                        </div>
                        <div className="md:max-w-64 w-full">
                            <Select label="Content type" placeholder="Select Category" name="category" size="sm" isRequired
                                value={formFields.category}
                                color={errors.category ? "danger" : "default"}
                                onChange={handleInputChange}>
                                {categories_data.map((category) => (
                                    <SelectItem key={category.name} value={category.name}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </Select>
                            {errors.category && <p className="text-vanila_text text-xs font-bold m-1">{errors.category}</p>}
                        </div>
                    </div>
                    
                    <div>
                        <Textarea className="font-semibold" isRequired label="Summary" placeholder="Post Summary" radius="sm" name="summary"
                            color={errors.summary ? "danger" : "default"}
                            value={formFields.summary}
                            onChange={handleInputChange}
                            maxLength={500}
                        />
                        {errors.summary && <p className="text-vanila_text text-xs font-bold m-1">{errors.summary}</p>}
                    </div>
                    
                    <div>
                        <Textarea className="font-semibold" isRequired radius="sm" label="Description (Markdown supported)" placeholder="Write your content using Markdown..." name="description"
                            color={errors.description ? "danger" : "default"}
                            value={formFields.description}
                            onChange={handleInputChange}
                            maxLength={5000}
                        />
                        {errors.description && <p className="text-vanila_text text-xs font-bold m-1">{errors.description}</p>}
                    </div>

                    <button
                        type="submit"
                        className="font-semibold border-2 border-vanila bg-vanila rounded-full px-5 py-1 text-sm text-vanila_text hover:bg-green_vanila duration-250"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Create Post"}
                    </button>
                </Form>

                <div className="p-4 m-4 rounded-lg shadow-lg text-vanila_text bg-slate-100">
                    <h3 className="font-semibold text-lg">Preview:</h3>
                    <Markdown remarkPlugins={[remarkGfm]}>{formFields.description}</Markdown>
                </div>
            </div>
        </div>
    );
}
