// posts._index.tsx
import { Link, Outlet, useOutletContext} from "@remix-run/react";
import type { Posts } from "../shared/types";

export default function PostsPage() {
    // const {sharedData}  = useOutletContext() || []; 
    const { sharedData } = useOutletContext<{ sharedData: Posts[] }>() || { sharedData: [] };

    return (
        <div className="mx-4 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {sharedData.map((item: Posts) => (
                    <div key={item.id} className="relative flex flex-col justify-between m-4 bg-vanila text-vanila_text p-4 rounded-xl">
                        <h1 className="font-semibold text-lg">{item.title}</h1>
                        <p className="text-sm"> by <span className="font-semibold">{item.author.name}</span> on <span className="font-semibold">{new Date(item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span> </p>
                        <p className="text-justify text-sm my-2 line-clamp-4">{item.summary}</p>
                        <button className="text-sm font-semibold my-2">
                            <Link to={`/posts/${item.slug}`} className="border-2 px-3 py-1 rounded-full border-vanila_text hover:bg-vanila_text hover:text-vanila duration-200">Know more!</Link>
                        </button>
                    </div>
                ))}
            </div>
            <Outlet />
        </div>
    );
}
