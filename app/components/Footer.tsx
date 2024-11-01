import { GoHeartFill } from "react-icons/go";

export default function Footer() {
    return (
        <footer className="flex justify-center items-center mx-4 mt-4 p-4 font-semibold gap-2 md:text-sm text-xs text-[#e0d6c2]">
            <div>Crafted with Care, Built with passion</div>
            <span><GoHeartFill className="size-6 fill-red-500" /></span> 
            <div>Bluesalt</div>
        </footer>
    )
}