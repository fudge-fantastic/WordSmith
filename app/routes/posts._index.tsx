// posts._index.tsx
import { Link, Outlet, useOutletContext } from "@remix-run/react";
import type { Posts } from "../shared/types";

export default function PostsPage() {
    // const {sharedData}  = useOutletContext() || []; 
    const { sharedData } = useOutletContext<{ sharedData: Posts[] }>() || { sharedData: [] };

    return (
        <div className="mx-auto container min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {sharedData.map((item: Posts) => (
                    <div key={item.id} className="relative flex flex-col justify-between m-3 bg-vanila text-vanila_text p-4 rounded-xl">
                        <div>
                            <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                            <p className="text-sm"> by <span className="font-semibold">{item.author.name}</span> on <span className="font-semibold">{new Date(item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span> </p>
                            <p className="text-justify text-sm my-2 line-clamp-4 tracking-tight">{item.summary}</p>
                        </div>
                        <button className="text-sm font-semibold my-2 mt-2">
                            <Link to={`/posts/${item.slug}`} className="border-2 px-3 py-1 rounded-full border-vanila_text hover:bg-vanila_text hover:text-vanila duration-250">Know more!</Link>
                        </button>
                    </div>
                ))}
            </div>
            <Outlet />
        </div>
    );
}

export function ErrorBoundary({ error }: Readonly<{ error: Error }>) {
    return (
        <div className="p-4 text-center">
            <h2 className="text-2xl font-semibold text-red-600">Error Loading Posts Page</h2>
            <p className="mt-2 text-gray-600">{error.message || "Something went wrong while loading the posts."}</p>
        </div>
    );
}