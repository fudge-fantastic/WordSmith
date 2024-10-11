// https://colorhunt.co/palette/faf7f0d8d2c2b174574a4947
import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    {title: "RemixJS"},
    {name: "description", content:"The Quick Brown Fox Jumps Over the Lazy Dog"}
  ]
}

export default function NewIndex() {
  return (
    // Remove this later
    <div className="min-h-screen">
      <div className="text-sm font-semibold p-8">
        <p>Using <span className="text-emerald-400 font-bold">Link</span> component in <span className="text-red-500 font-bold">Remix&apos;s</span>. The above reloads the entire page, <br/> using the prop &apos;reloadDocument&apos;, and the below renders the specific part only.</p>
        <p className="mt-4"><Link className="hover:text-emerald-400 duration-200" to="http://localhost:5173/category" reloadDocument>Click me</Link> to load the entire page</p>
        {/* to load the entire page, we use reloadDocument */}
        <p className=""><Link className="hover:text-emerald-400 duration-200" to="http://localhost:5173/category">Click me</Link> to load the desired page</p> 
      </div>
    </div>
  )
}