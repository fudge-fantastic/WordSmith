import { Link, Outlet, useLoaderData} from "@remix-run/react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import fetchSomeData  from "./content_api" 
import { Button } from "@nextui-org/button";

export async function loader() {
    const data = await fetchSomeData();
    console.log(data)
    return data
}

export default function PostsPage() {
    // Access the data using the userLoaderData
    const data: Posts[] = useLoaderData()
    // const matches = useMatches();
    // console.log("matches:", matches)
    // const data = matches[1].data as Posts[];
    // const data: Posts[] = []
    return (
        <div className="m-4 ">
            <div className="flex justify-end m-4">
                <Link to="http://localhost:5173/posts/new_post">
                    <Button variant="flat" radius="sm" className="font-bold">
                        Create Post
                    </Button>
                </Link>
            </div>
            <div className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {data.map((item: Posts) => (
                    <div className="relative flex flex-col justify-between text-sm m-4 bg-slate-50 p-4 rounded-xl shadow-xl border-1 border-slate-100" key={item.id}>
                            <h1 className="font-bold text-lg">{item.title}</h1> 
                            <p className="mb-4 mt-2">by <span className="font-bold">{item.author}</span> on <span className="font-bold">{item.date}</span></p>
                            <p className="mb-3 text-justify">{item.title_content_brief}</p>
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

interface Posts {
    id: number,
    title: string,
    title_content_brief: string,
    title_content: string,
    author: string,
    date: number,
    category: string,
    slug: string,
    // bio: string,
    // hobbies: string[],
    // location: string,
  }