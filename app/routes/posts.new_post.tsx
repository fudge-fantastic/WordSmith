// Imports
import { Input, Textarea } from "@nextui-org/input";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { json } from "@remix-run/node";
import categories_data from "./../shared/categories_data";
import { Form, useNavigation } from "@remix-run/react";
import { useState } from "react";
import {createPost} from "../db/query";

// slug logic
function slugify(title: string) {
    return title.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove non-word characters, spaces, and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/^-|-$/g, ''); // Remove leading and trailing hyphens
}

// date logic
export function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[today.getMonth()];
    const day = today.getDate();
    return `${day}-${month}-${year}`;
}

export async function action({ request }: { request: Request }) {
    console.log("Action method works");
    const body = await request.formData();
    const userId = Number(body.get('userId'));
    const postId = Number(body.get('postId'));
    const title = body.get('title') as string;
    const summary = body.get('summary') as string;
    const description = body.get('description') as string;
    const author = body.get('author') as string;
    const category = body.get('category') as string;
    // const date = getCurrentDate();
    const slug = slugify(title);

    // throw error in console if any field is empty
    if (!author || !title || !summary || !description || !category) {
        return json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        const result = await createPost(userId, postId, title, slug, summary, description, category)
        console.log(result);
    } catch (error) {
        console.log("Error writing to file:", error);
        return json({ error: "Error writing to file" }, { status: 500 });
    }

    return json({ success: true });
}

export default function CreatePosts() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    // State for form validation
    const [formFields, setFormFields] = useState({
        author: "",
        title: "",
        summary: "",
        description: "",
        category: ""
    });

    const [errors, setErrors] = useState<{[key: string]: string}>({
        author: "",
        title: "",
        summary: "",
        description: "",
        category: ""
    });

    // Handle form field change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value
        });

        // Clear errors when the field is filled
        setErrors({
            ...errors,
            [name]: value ? "" : errors[name]
        });
    };

    interface Errors {
        [key: string]: string;
    }

    // Handle form submission validation
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const newErrors: Errors = {};

        // Validation logic
        Object.keys(formFields).forEach((field) => {
            if (!formFields[field as keyof typeof formFields]) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            e.preventDefault(); // Prevent form submission
            setErrors(newErrors); // Set errors to show in the form
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center">
            <h1 className="text-2xl font-semibold">Oh boi, here we go!</h1>
            <div className="bg-green_vanila w-4/5 min-h-auto m-6 rounded-xl shadow-xl">
                <Form method="post" className="relative m-6 rounded-xl space-y-5" onSubmit={handleSubmit}>
                    <div className="flex justify-between gap-5">
                        <Input
                            isRequired
                            description={errors.author}
                            size="sm"
                            color={errors.author ? "danger" : "default"}
                            label="Your Name"
                            placeholder="Enter your name here"
                            // className={"w-full font-semibold"}
                            className={`w-full font-semibold rounded-sm bg-green_vanila ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
                            radius="sm"
                            variant="flat"
                            name="author"
                            value={formFields.author}
                            onChange={handleInputChange}
                        />
                        <Input
                            isRequired
                            size="sm"
                            description={errors.title}
                            color={errors.title ? "danger" : "default"}
                            label="Title"
                            placeholder="Enter your title here"
                            className="w-full"
                            radius="sm"
                            variant="flat"
                            name="title"
                            value={formFields.title}
                            onChange={handleInputChange}
                        />
                        <Select
                            label="Content type"
                            placeholder="Select Category"
                            className="max-w-64"
                            name="category"
                            isRequired
                            size="sm"
                            value={formFields.category}
                            onChange={handleInputChange}
                        >
                            {categories_data.map((category: { id: number, name: string }) => (
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
                    />
                    <Textarea
                        className="font-semibold"
                        isRequired
                        radius="sm"
                        label="Description"
                        placeholder="Post Content"
                        name="description"
                        color={errors.description ? "danger" : "default"}
                        description={errors.description}
                        value={formFields.description}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        variant="shadow"
                        radius="sm"
                        className="font-bold"
                        isDisabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Create Post"}
                    </Button>
                </Form>
            </div>
        </div>
    );
}
