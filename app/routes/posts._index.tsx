import { Link, Outlet, useLoaderData } from "@remix-run/react";
// Importing loader from the content_api.js
import fetchSomeData  from "./content_api" 
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export async function loader() {
    const data = await fetchSomeData();
    return data
}

export default function Posts() {
    // Access the data using the userLoaderData
    const data: Posts[] = useLoaderData()
    // const data:any[] = []
    return (
        <div>
            <div className = "m-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {data.map((item: Posts) => (
                    <div className="relative flex flex-col justify-between text-sm m-4 bg-[#272727] p-4 rounded-xl" key={item.id}>
                            <h1 className="font-bold text-lg">{item.title}</h1> 
                            <p className="mb-4 mt-2">by <span className="text-yellow-300 font-semibold">{item.author}</span> on <span className="text-green-400 font-semibold">{item.date}</span></p>
                            <p className="mb-3 text-justify">{item.title_content_brief}</p>
                            <button className="flex-1 flex flex-col justify-end"><Link to={`/posts/${item.slug}`} className="font-bold flex gap-2 items-center mt-1 hover:text-yellow-300 duration-200">Know more! <FaArrowUpRightFromSquare /></Link></button>
                    </div>
                ))}
            </div>

            <div className = "text-center font-semibold mb-4">
                <Link to="http://localhost:5173">Return to <span className="text-blue-400">Home Page</span></Link>
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