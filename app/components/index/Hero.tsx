import apolo from "public/old_oil_paint.jpg" 
import { Link } from "@remix-run/react";


export default function Hero() {
    return (
      <div className="mx-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 h-full">
          <div className="bg-vanila rounded-2xl row-span-2"></div>
          
          <div className="bg-green_vanila rounded-2xl col-span-2 text-vanila_text">
            <div className="p-6 flex justify-between">
                  <div className="relative w-1/2">
                    <div className="inline-block font-semibold text-lg border-1 border-vanila_text rounded-full px-2">WordSmith</div>
                    <h1 className="my-2 text-2xl font-semibold">The Phoenix of <span className="underline">Forgiveness</span></h1>
                    <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit necessitatibus laudantium saepe illum magnam cupiditate nobis doloremque animi aperiam laborum. Voluptas?</p>
                    <Link to="posts/" className="text-md font-semibold">Visit Now!</Link>
                  </div>
                  <img src={apolo} alt="apolo" className="rounded-xl shadow-xl w-1/2 h-48 object-cover"></img>
            </div>
          </div>
          
          <div className="bg-red_vanila rounded-3xl"></div>
          <div className="bg-skin_vanila rounded-3xl"></div>
        </div>
      </div>
    );
  }


  // https://www.youtube.com/watch?v=-P8rvj8-1_w&ab_channel=CandDev
  // https://www.youtube.com/watch?v=JITwwrVSteE&ab_channel=basarat