import { GoHeartFill } from "react-icons/go";

export default function Footer() {
    return (
        <footer className="flex justify-center mx-4 mt-4 p-4 font-semibold gap-2 text-sm">
            <div>Crafted with Care, Built with passion</div>
            <span><GoHeartFill className="size-6 fill-red-600" /></span> 
            <div>Bluesalt</div>
        </footer>
    )
}