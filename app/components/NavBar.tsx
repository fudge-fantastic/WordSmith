import { Link } from "@remix-run/react";

export default function Index() {
    return (
      <div className="flex justify-between items-center px-6 py-5">
          <div className="flex items-center gap-2 ml-1">
            <div className="size-8 rounded-md bg-[#e0d6c2]"></div>
            <Link to = "/"  className="text-2xl font-bold text-vanila font-raleway">Wordsmith</Link>
          </div>
      </div>
    );
  }