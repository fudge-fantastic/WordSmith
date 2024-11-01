import { Link, Outlet, useMatches} from "@remix-run/react";
// import { Button } from "@nextui-org/button";
import { Posts } from "../shared/types";

export default function PostsPage() {
    const matches = useMatches();
    const data = matches[1].data as Posts[];
    // Here, We're fetching the entire data! 
    console.log("Comming from post_index:", data[0])
    return (
        <div className="mx-3 min-h-[75vh]">
            <div className="flex justify-end gap-4 mx-4">
                <Link to="/posts/new_post" className="py-2 px-3 inline-block rounded-full bg-vanila hover:bg-dark_vanila hover:text-vanila hover:border-vanila duration-200 border-2 text-sm font-semibold">Create Post</Link>
            </div>
            <div className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {data.map((item) => (
                    <div className="relative flex flex-col justify-between text-sm m-4 bg-vanila text-dark_vanila p-4 rounded-xl shadow-xl border-1 border-slate-100" key={item.id}>
                            <h1 className="font-semibold text-lg">{item.title}</h1> 
                            <p className="mb-4 mt-2">by <span className="font-semibold">{item.user.name}</span> on <span className="font-semibold">{new Date(item.date).toLocaleDateString("en-US", {day: "numeric",month: "long",year: "numeric",})}</span></p>
                            <p className="mb-3 text-justify">{item.summary}</p>
                            <button className="flex-1 flex flex-col justify-end"><Link to={`/posts/${item.slug}`} className="font-semibold flex gap-2 items-center mt-1 hover:text-slate-600 duration-200">Know more!</Link></button>
                    </div>
                ))}
            </div>
        <Outlet />
        </div>
    )
}

