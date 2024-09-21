import { LoaderFunctionArgs } from "@remix-run/node"

export default function Category() {
    return (
        <div>
            <h1>If you're seeing this, it means you have lost in the categories section</h1>
        </div>
    )
}

export const loader = ({params}: LoaderFunctionArgs) => {
    const slug = params["*"]
    console.log("params:", slug)
    return slug
}