import React from "react";
import cake from '../assets/cake.jpg'
import CakeGallery from './CakeGallery';
import BackDropSection from "./BackDropSection";
import Carousel from "./Carousel";

const HeroSection = () => {
  let Heroimages = [
    {
      image: "https://images.bewakoof.com/uploads/grid/app/1x1-common-1709616659.gif",
    },
    {
      image: "https://images.bewakoof.com/uploads/grid/app/Boyfriend-Tshirt-Women-1x1-banner--2--1709483581.jpg",
    },
    {
      image: "https://images.bewakoof.com/uploads/grid/app/EOSS-1X1-top-corner-unit-copy-ezgif-com-optimize-1709535154.gif",
    },
    {
      image: "https://images.bewakoof.com/uploads/grid/app/1x1-Banner-Graphic-Printed-Oversized-Tshirts-Common--2--1709734299.gif"
    }
  ]
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-rose-50 to-amber-50 p-8 md:p-16 min-h-screen">
        
        {/* Left Content */}
        <div className="max-w-xl mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Delightfully <span className="text-rose-400">Eggless</span>,<br />
            Perfectly Crafted Cakes
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Experience the joy of exquisite eggless cakes, baked with the finest ingredients and a dash of love. Find your perfect slice for any occasion.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-rose-300 hover:bg-rose-400 text-white font-semibold px-6 py-3 rounded shadow transition">
              Explore Our Cakes
            </button>
            <button className="bg-amber-100 hover:bg-amber-200 text-gray-800 font-medium px-6 py-3 rounded shadow transition">
              Get Inspired
            </button>
          </div>
        </div>

        {/* Right Image Placeholder */}
        <div className="w-full md:w-[800px] max-w-[800px]">
          <div className="aspect-[4/3] bg-gray-300 rounded-xl flex items-center justify-center text-4xl text-gray-500 shadow-lg">
            <img src={cake} alt="cake" className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>
      </div>
      <Carousel data={Heroimages} height="534" width="534" show={3} />
      <CakeGallery />
    </>
  );
};

export default HeroSection;
