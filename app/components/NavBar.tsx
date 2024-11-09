import { Link, useLocation } from "@remix-run/react";
import { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

export default function Index({ isLoggedIn }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isPostPage = location.pathname === "/posts";

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Close the mobile menu when resizing to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-between items-center py-2 container mx-auto px-4 md:px-0">
      <div className="flex items-center gap-2">
        <Link to="/" className="rounded-full bg-[#343124] px-8 py-1 text-xl font-semibold text-vanila font-raleway">
          WordSmith
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-4 text-vanila font-raleway items-center">
        {!isLoggedIn ? (
          <>
            <Link to="/login"><button className="font-semibold text-md">Login</button></Link>
            <Link to="/login"><button className="font-semibold border-2 border-vanila rounded-full px-3 py-[2px] hover:bg-vanila hover:text-dark_vanila duration-250 text-md">Sign Up</button></Link>
          </>
        ) : (
          <>
            {isPostPage && (
              <Link to="/posts/new_post">
                <button className="font-semibold border-2 border-vanila rounded-full px-3 py-[2px] hover:bg-vanila hover:text-dark_vanila duration-250 text-md">
                  Create Post
                </button>
              </Link>
            )}
            <Link to="/logout" className="font-semibold border-2 border-vanila rounded-full px-3 py-[2px] hover:bg-vanila hover:text-dark_vanila duration-250 text-md">
              Log Out
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Icon with transition */}
      <div className="md:hidden flex items-center bg-[#343124] p-1.5 rounded-full">
        <button onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <IoClose size={28} className="text-vanila transition-opacity duration-700 opacity-100" />
          ) : (
            <IoMenu size={28} className="text-vanila transition-opacity duration-700 opacity-100" />
          )}
        </button>
      </div>

      {/* Mobile Menu with Transition */}
      <div
        className={`absolute top-16 right-6 bg-dark_vanila rounded-lg shadow-lg p-4 z-50 flex flex-col gap-3 text-vanila font-raleway duration-300 transform transition-all ease-in-out ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {!isLoggedIn ? (
          <>
            <Link to="/login" onClick={toggleMobileMenu}><button className="font-semibold border-2 border-vanila rounded-full px-5 py-[2px] hover:bg-vanila hover:text-dark_vanila duration-250 text-md">Login</button></Link>
            <Link to="/login" onClick={toggleMobileMenu}><button className="font-semibold border-2 border-vanila rounded-full px-3 py-[2px] hover:bg-vanila hover:text-dark_vanila duration-250 text-md">Sign Up</button></Link>
          </>
        ) : (
          <>
            {isPostPage && (
              <Link to="/posts/new_post" onClick={toggleMobileMenu}>
                <button className="font-semibold border-2 border-vanila rounded-full px-3 py-[2px] hover:bg-vanila hover:text-dark_vanila duration-250 text-md text-center">
                  Create Post
                </button>
              </Link>
            )}
            <Link to="/logout" onClick={toggleMobileMenu} className="font-semibold border-2 border-vanila rounded-full px-3 py-[2px] hover:bg-vanila hover:text-dark_vanila duration-250 text-md text-center">
              Log Out
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
