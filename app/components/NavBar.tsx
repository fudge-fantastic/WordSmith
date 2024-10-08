import { Link } from "@remix-run/react";
import NavData from "~/components/NavData";

export default function Index() {
    return (
      <div className="flex justify-between items-center px-6 py-4 m-2">
          <h1 className="text-xl font-semibold">Remix<span className="text-yellow-300">JS</span></h1>
          <ul className="flex items-center gap-8 font-semibold text-sm max-lg:hidden">
                {NavData.map((item) => {
                  return (
                  <li key={item.name}>
                    <Link className='hover:text-sky-300 duration-200' to={item.href}>{item.name}</Link>
                  </li>)
                })}
          </ul>
      </div>
    );
  }