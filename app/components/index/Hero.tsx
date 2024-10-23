import { Link } from "@remix-run/react";
import UnderlineLink from "../UnderLineLink";

export default function Hero() {
  return (
    <div className="mx-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

        <div className="bg-vanila rounded-3xl row-span-2">
          <div className="m-4 p-1">
            <div className="flex justify-between items-center">
              <div>
                <div className="inline-block font-bold font-raleway text-lg border-2 border-vanila_text rounded-full px-2">Discover Latest</div>
                <h1 className="text-2xl p-1 font-raleway font-bold text-vanila_text my-2">Between Earth and Eternity</h1>
              </div>
                <div className="flex items-center flex-col">
                  <div className="size-4 rounded-full bg-vanila_text"></div>
                  <div className="size-4 rounded-full bg-vanila_text"></div>
                  <div className="size-4 rounded-full bg-vanila_text"></div>
                </div>
            </div>
            <img src="/between_earth.jpg" alt="between_earth" className="rounded-xl object-cover h-[400px] w-full"></img>
          </div>

        </div>

        <div className="bg-green_vanila rounded-3xl col-span-2 text-vanila_text">
          <div className="m-5 flex justify-between">

            <div className="relative w-1/2">
              <div className="inline-block font-bold font-raleway text-lg border-2 border-vanila_text rounded-full px-2">
                WordSmith
              </div>
              <h1 className="my-3 text-2xl font-raleway font-bold"><Link to="posts/" className="text-md"><UnderlineLink underlineColor="#342415">Unleash Your Creativity</UnderlineLink></Link></h1>
              <p className="text-sm font-semibold">
              Discover a vibrant community of writers and readers on Wordsmith. Share your ideas, passions, and experiences through engaging blog posts. Explore a diverse range of topics, from personal reflections to global issues.
              </p>
            </div>

            <div className="relative w-1/2">
              <img
                src="/old_oil_paint.jpg"
                alt="apolo"
                className="w-full h-[170px] rounded-xl object-cover"
              />
            </div>

          </div>
        </div>

        <div className="bg-red_vanila rounded-3xl">
          <div className="m-4 p-1">
            <img src="/old_oil_paint.jpg" alt="apolo" className="rounded-xl h-[150px] w-full object-cover"></img>
            <div className="flex justify-between items-center my-4">
              <h1 className="font-raleway font-bold text-2xl"><UnderlineLink underlineColor="#342415">Portfolio</UnderlineLink></h1>
              <div className="flex items-center">
                <div className="size-6 rounded-full bg-vanila_text"></div>
                <div className="size-6 rounded-full bg-vanila_text"></div>
                <div className="size-6 rounded-full bg-vanila_text"></div>
              </div>
            </div>
            <p className="text-sm font-semibold px-1">Check out my portfolio website for updates! Currently a work in progress, but exciting things are coming soon—stay tuned!</p>
          </div>

        </div>


        <div className="bg-skin_vanila rounded-3xl">
          <div className="m-4 p-1">
              <div className="inline-block font-bold font-raleway text-lg border-2 border-vanila_text rounded-full px-2">
                GitHub
              </div>
              <p className="text-sm font-semibold my-4">This project is a work in progress, and I’d love for you to be part of it! Whether you’re here to give feedback, report bugs, or contribute code, every bit helps.</p>
              <img src="/github.jpg" alt="github_image" className="rounded-xl h-[150px] w-full object-cover"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
