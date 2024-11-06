import { Link } from "@remix-run/react";
import UnderlineLink from "./UnderLineLink";

export default function Hero() {
  return (
    <div className="container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full">
        <div className="bg-vanila group p-4 rounded-3xl md:row-span-2 h-full overflow-hidden">
          <div className="h-full overflow-hidden rounded-b-3xl">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold inline-block font-raleway text-lg border-2 border-vanila_text rounded-full px-4">Discover Latest</div>
                <h2 className="text-xl p-1 font-raleway font-semibold text-vanila_text my-2">Between Earth and Eternity</h2>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden h-full">
              <img src="/watchtower.jpg" className="group-hover:scale-110 duration-700 object-cover object-top h-full " alt="between_earth"></img>
            </div>
          </div>

        </div>

        <div className="bg-green_vanila rounded-3xl md:col-span-2 text-vanila_text group">
          <div className="m-2 p-2 md:flex justify-between">

            <div className="relative md:w-1/2 pr-4">
              <div className="inline-block font-semibold font-raleway text-lg border-2 border-vanila_text rounded-full px-4">
                Creative Corner
              </div>  
              <h2 className="mt-3 mb-3 text-xl font-raleway font-semibold"><div className="text-md"><UnderlineLink href={"/posts"} underlineColor="#342415">Unleash Your Creativity</UnderlineLink></div></h2>
              <p className="text-xs font-semibold uppercase">
                Join a vibrant community of writers and readers on Wordsmith! Unleash your creativity by sharing your ideas, passions, and experiences through engaging blog posts that resonate with others. <br /><br />
                <p className="hidden lg:block">
                  Wordsmith is your platform for self-expression. Dive into a variety of topics, from everyday life to culture and society. Connect with like-minded individuals, spark meaningful conversations, and inspire others with your unique voice. Together, let’s write the world!
                </p>
              </p>
            </div>

            <div className="relative mt-4 md:mt-0 md:w-1/2 rounded-xl overflow-hidden">
              <img
                src="/old_oil_paint.jpg"
                alt="apolo"
                className="group-hover:scale-110 duration-700 object-cover object-top h-full"
              />
            </div>

          </div>
        </div>

        <div className="bg-red_vanila rounded-3xl group">
          <div className="m-2 p-2">
            <div className="overflow-hidden rounded-xl scale-x-[-1]">
              <img src="/portfolio2.jpg" alt="apolo" className="group-hover:scale-110 duration-700 object-cover rounded-xl w-full h-1/2"></img>
            </div>
            <div className="flex justify-between items-center mt-3 mb-2">
              <h2 className="font-raleway font-semibold text-xl"><UnderlineLink underlineColor="#342415">Portfolio</UnderlineLink></h2>
            </div>
            <p className="text-xs font-semibold text-justify uppercase">I’m eagerly preparing to showcase my portfolio, and I can’t wait for you to see it! While you wait, feel free to explore my other projects. Trust me, you won’t want to miss what’s coming next!</p>
          </div>
        </div>


        <div className="bg-skin_vanila rounded-3xl group">
          <div className="m-2 p-2 flex flex-col h-[93%]">
            <div>
              <Link to="https://github.com/fudge-fantastic/WordSmith" className="inline-block font-semibold font-raleway text-lg border-2 border-vanila_text hover:bg-vanila_text  hover:text-skin_vanila duration-250 rounded-full px-4">
                Github
              </Link>
            </div>
            <p className="text-xs font-semibold my-4 uppercase text-justify">This project is a work in progress, and I’d love for you to be part of it! Whether you’re here to give feedback, report bugs, or contribute code, every bit helps.</p>
            <div className="overflow-hidden rounded-xl flex-1">
              <img src="/github.jpg" alt="github_image" className="group-hover:scale-110 h-full duration-700 rounded-xl w-full object-cover"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
