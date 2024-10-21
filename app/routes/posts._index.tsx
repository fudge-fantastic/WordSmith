import { Link, Outlet, useMatches} from "@remix-run/react";
import { FaArrowLeftLong, FaArrowUpRightFromSquare } from "react-icons/fa6";
// import { Button } from "@nextui-org/button";
import { Posts } from "../shared/types";

export default function PostsPage() {
    const matches = useMatches();
    const data = matches[1].data as Posts[];
    // Here, We're fetching the entire data! 
    console.log("Comming from post_index:", data)

    // console.log("matches:", matches)
    // const posts = matches[1]?.data?.posts || [];
    // console.log("Matches_data:", data)
    return (
        <div className="mx-3 min-h-screen">
            <div className="flex justify-end gap-4 mx-4">
                <Link to="http://localhost:5173/posts/new_post" className="px-3 rounded-xl bg-[#e0d6c2] flex justify-center items-center hover:bg-skin_vanila duration-200 text-sm font-semibold">Create Post</Link>
                <Link to="/" className="size-9 rounded-xl bg-[#e0d6c2] flex justify-center items-center hover:bg-skin_vanila duration-200"> <FaArrowLeftLong className="size-5 fill-vanila_text" /></Link>
            </div>
            <div className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {data.map((item) => (
                    <div className="relative flex flex-col justify-between text-sm m-4 bg-vanila text-dark_vanila p-4 rounded-xl shadow-xl border-1 border-slate-100" key={item.id}>
                            <h1 className="font-bold text-lg">{item.title}</h1> 
                            <p className="mb-4 mt-2">by <span className="font-bold">{item.user.name}</span> on <span className="font-bold">{new Date(item.date).toLocaleDateString("en-US", {day: "numeric",month: "long",year: "numeric",})}</span></p>
                            <p className="mb-3 text-justify">{item.summary}</p>
                            <button className="flex-1 flex flex-col justify-end"><Link to={`/posts/${item.slug}`} className="font-bold flex gap-2 items-center mt-1 hover:text-slate-600 duration-200">Know more! <FaArrowUpRightFromSquare /></Link></button>
                    </div>
                ))}
            </div>

            <div className = "text-center font-semibold my-6">
                <Link to="/">Return <span className="hover:text-blue-400 duration-200" >Home</span></Link>
            </div>

        <Outlet />
        </div>
    )
}

