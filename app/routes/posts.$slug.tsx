import { useLoaderData, Link } from "@remix-run/react";
import fetchSomeData from "./content_api" 
import { LoaderFunctionArgs } from "@remix-run/node";


// Find similar content from the DB or the data
export async function loader({ params }: LoaderFunctionArgs) {
    const data = await fetchSomeData();
    const slug = params.slug
    const post = data.find((item) => item.slug === slug)
    return [post]

}

export default function SinglePost() {
    const posts = useLoaderData() as Posts[]
    return (
        <div>
            <div className = "m-8">
                {posts.map((item: Posts) => (
                    <div className="text-justify m-4 bg-[#272727] p-6 rounded-xl" key={item.id}>
                        <h1 className="font-bold text-2xl mb-4">{item.title}</h1>
                        <p>{item.title_content}</p> 
                    </div>
                ))}
            </div>

            <div className = "text-center font-semibold mb-4">
                <Link to="http://localhost:5173">Return to <span className="text-blue-400">Home Page</span></Link>
            </div>

        {/* <Outlet /> */}
        </div>
    );
}

interface Posts {
    id: number,
    title: string,
    // title_content_brief: string,
    title_content: string,
    author: string,
    date: number,
    category: string,
    slug: string,
    // bio: string,
    // hobbies: string[],
    // location: string,
  }