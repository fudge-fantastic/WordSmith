import { Link, Outlet, useLoaderData } from "@remix-run/react";
// Importing loader from the content_api.js
import { loader as fetchSomeData } from "./content_api" 

export const loader = fetchSomeData;

export default function Posts() {
    // Access the data using the userLoaderData
    const data: User[] = useLoaderData()
    // const data:any[] = []
    return (
        <div>
            <div className = "text-center font-semibold">
                <Link to="http://localhost:5173">Return to Home Page</Link>
            </div>

            <div className = "p-8">
                <h1 className="text-3xl font-semibold">People's Information</h1>
                {data.map((item: User) => (
                    <div className="p-6" key={item.id}>
                            <span className= "font-bold">Name:</span> {item.name}
                            <br />
                            <span className= "font-bold">Occupation:</span> {item.occupation}
                            <br />
                            <span className= "font-bold">Bio:</span> {item.bio}
                            <br />
                            <span className= "font-bold">Location:</span> {item.location}

                    </div>
                ))}
            </div>
        <Outlet />
        </div>
    )
}

interface User {
    id: number,
    name: string,
    age: number,
    occupation: string,
    bio: string,
    hobbies: string[],
    location: string,
  }