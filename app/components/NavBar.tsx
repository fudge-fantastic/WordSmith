import { Link } from "@remix-run/react";

export default function Index({isLoggedIn}) {
  return (
    <div className="flex justify-between items-center py-2 container mx-auto px-4 md:px-0">
      <div className="flex items-center gap-2">
        <Link to="/" className="rounded-full bg-[#343124] px-8 py-1 text-xl font-semibold text-vanila font-raleway">WordSmith</Link>
      </div>

      <div className="flex md:gap-4 gap-2 text-vanila font-raleway items-center">
        {!isLoggedIn ? (
          <>
            <Link to="/login"><button className="font-semibold text-md">Login</button></Link>
            <Link to="/login"><button className="font-semibold border-2 border-vanila rounded-full px-3 py-[2px] hover:bg-vanila hover:text-dark_vanila duration-250 text-md">Sign Up</button></Link>
          </>
        ) : (
          <Link to="/logout" className="font-semibold border-2 border-vanila rounded-full px-3 py-[2px] hover:bg-vanila hover:text-dark_vanila duration-250 text-md">Log Out</Link>
        )}
      </div>
    </div>
  );
}
