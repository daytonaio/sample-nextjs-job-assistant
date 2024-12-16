import React from "react";
import heroImg from "../assets/img/heroImg.png";
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero-container text-black mt-2 mx-4 bg-slate-400 pt-12 pb-12 rounded-3xl flex flex-col lg:flex-row justify-center items-center lg:justify-start lg:items-start">

      {/* Text and Information Section */}
      <div className="pl-12 pt-16 p-8 hero-info flex flex-col md:flex-1 lg:w-1/2 md:justify-center text-center lg:text-left">
        <div className="text-3xl md:text-4xl font-bold">Ex-Cons Thrive</div>
        <div className="pt-6 text-xl sm:text-2xl">Empowering Second Chances</div>
        <div className="pt-4 text-base sm:text-lg">Rebuild, Reinvent, Rediscover your path to success.</div>
        <div className="pt-6">
          <Link to="/services">
            <button className="pl-6 pr-6 p-3 border-none bg-orange-500 text-black rounded-full hover:bg-orange-600">
              Start your Journey <span>&#8594;</span>
            </button>
          </Link>
        </div>
        <div className="flex space-x-8 pt-12 text-lg sm:text-2xl justify-center lg:justify-start">
          <div>
            10K+ <sub className="text-sm">USERS</sub>
          </div>
          <div>
            20K+ <sub className="text-sm">LIKES</sub>
          </div>
          <div>
            12K+ <sub className="text-sm">DOWNLOADS</sub>
          </div>
        </div>
      </div>
      
      {/* Image Section */}
      <div className="heroImg p-8 lg:p-14 flex w-full justify-center">
        <img
          src={heroImg}
          alt="Hero-image"
          className="max-lg:hidden object-contain max-h-[500px] w-auto"
        />
      </div>

    </div>
  );
}

export default Hero;
