import { Link } from "@remix-run/react";
import UnderlineLink from "./UnderLineLink";

export default function Hero() {
  return (
    <div className="max-h-full container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full">
        <div className="bg-vanila p-4 rounded-3xl md:row-span-2 h-full overflow-hidden">
          <div className="h-full overflow-hidden rounded-b-3xl">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold inline-block font-raleway text-lg border-2 border-vanila_text rounded-full px-2">Discover Latest</div>
                <h1 className="text-2xl p-1 font-raleway font-semibold text-vanila_text my-2">Between Earth and Eternity</h1>
              </div>
            </div>
            <img src="/between_earth.jpg" alt="between_earth" className="rounded-xl object-cover object-top h-full"></img>
          </div>

        </div>

        <div className="bg-green_vanila rounded-3xl md:col-span-2 text-vanila_text">
          <div className="m-5 md:flex justify-between">

            <div className="relative md:w-1/2">
              <div className="inline-block font-semibold font-raleway text-lg border-2 border-vanila_text rounded-full px-2">
                WordSmith
              </div>
              <h1 className="my-3 text-2xl font-raleway font-semibold"><Link to="posts/" className="text-md"><UnderlineLink underlineColor="#342415">Unleash Your Creativity</UnderlineLink></Link></h1>
              <p className="text-sm font-semibold">
                Discover a vibrant community of writers and readers on Wordsmith. Share your ideas, passions, and experiences through engaging blog posts. Explore a diverse range of topics, from personal reflections to global issues.
              </p>
            </div>

            <div className="relative mt-4 md:mt-0 md:w-1/2">
              <img
                src="/old_oil_paint.jpg"
                alt="apolo"
                className="h-full rounded-xl object-cover"
              />
            </div>

          </div>
        </div>

        <div className="bg-red_vanila rounded-3xl">
          <div className="m-4 p-1">
            <img src="/portfolio.jpg" alt="apolo" className="rounded-xl w-full object-cover scale-x-[-1]"></img>
            <div className="flex justify-between items-center my-3">
              <h1 className="font-raleway font-semibold text-3xl"><UnderlineLink underlineColor="#342415">Portfolio</UnderlineLink></h1>
            </div>
            <p className="text-sm font-semibold px-1">I&apos;m excited to share my portfolio with you soon! In the meantime, feel free to explore my other work. Stay tuned!</p>
          </div>

        </div>


        <div className="bg-skin_vanila rounded-3xl">
          <div className="m-4 p-1">
              <Link to="https://github.com/fudge-fantastic/WordSmith" className="inline-block font-semibold font-raleway text-lg border-2 border-vanila_text hover:bg-vanila_text  hover:text-skin_vanila duration-250 rounded-full px-2">
                GitHub
              </Link>
            <p className="text-sm font-semibold my-4">This project is a work in progress, and I’d love for you to be part of it! Whether you’re here to give feedback, report bugs, or contribute code, every bit helps.</p>
            <img src="/github.jpg" alt="github_image" className="rounded-xl  w-full object-cover"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
