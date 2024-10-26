import { Link } from "@remix-run/react";

export default function Index() {
    return (
      <div className="flex justify-between items-center py-5 container mx-auto  px-4 md:px-0">
          <div className="flex items-center gap-2 ml-1">
            <div className="size-8 rounded-md bg-vanila"></div>
            <Link to = "/"  className="text-2xl font-semibold text-vanila font-raleway">Wordsmith</Link>
          </div>
          <div className="flex md:gap-4 gap-2 text-vanila font-raleway items-center">
            <Link to="/login"><button className="font-semibold text-md">Login</button></Link>
            <Link to="/login"><button className="inline-block font-semibold border-2 border-vanila rounded-full px-3 py-1 hover:bg-vanila hover:text-dark_vanila duration-250 text-md">SignUp</button></Link>
          </div>
      </div>
    );
  }