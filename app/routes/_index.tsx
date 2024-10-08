import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    {title: "RemixJS"},
    {name: "description", content:"The Quick Brown Fox Jumps Over the Lazy Dog"}
  ]
}

export default function NewIndex() {
  return (
    <div>
      <div className="text-sm font-semibold p-8">
        <Link to="http://localhost:5173/category" reloadDocument>Click me to load the entire page</Link>
        <p>Using <span className="text-emerald-400 font-bold">Link</span> component in <span className="text-yellow-300 font-bold">Remix&apos;s</span>. The above reloads the entire page, using the prop &apos;reloadDocument&apos;, and the below renders the specific part only.</p>
        {/* to load the entire page, we use reloadDocument */}
        <Link to="http://localhost:5173/category">Click me to load the desired page</Link> 
      </div>
    </div>
  )
}