import React from 'react';
import { useNavigate } from 'react-router-dom';
import cake from '../assets/cake.jpg';

const CakeGallery = () => {
  const navigate = useNavigate();

  // Sample cake data - replace with your actual data
  const trendingCakes = [
    { id: 1, name: 'Chocolate Cake', price: 25, image: cake },
    { id: 2, name: 'Vanilla Cake', price: 20, image: cake },
    { id: 3, name: 'Strawberry Cake', price: 30, image: cake },
    { id: 4, name: 'Red Velvet Cake', price: 35, image: cake },
  ];

  const surpriseCakes = [
    { id: 5, name: 'Birthday Surprise', price: 40, image: cake },
    { id: 6, name: 'Anniversary Special', price: 45, image: cake },
    { id: 7, name: 'Wedding Cake', price: 50, image: cake },
    { id: 8, name: 'Custom Design', price: 55, image: cake },
  ];

  const bestSellers = [
    { id: 9, name: 'Classic Chocolate', price: 28, image: cake },
    { id: 10, name: 'Carrot Cake', price: 32, image: cake },
    { id: 11, name: 'Cheesecake', price: 38, image: cake },
    { id: 12, name: 'Black Forest', price: 42, image: cake },
  ];

  const CakeCard = ({ cake }) => (
    <div 
      className="bg-[#f5f1f2] rounded-xl shadow-md overflow-hidden flex flex-col items-center p-3 mb-2 transition hover:shadow-lg cursor-pointer"
      onClick={() => navigate(`/cake/${cake.id}`)}
    >
      <div className="w-full aspect-square flex items-center justify-center">
        <img
          src={cake.image}
          alt={cake.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="w-full text-center mt-2">
        <h3 className="font-semibold text-base sm:text-lg mb-1 text-gray-800">{cake.name}</h3>
        <p className="text-gray-600 mb-1 text-sm sm:text-base">${cake.price}</p>
        {/* Buttons only on sm and up */}
        <div className="hidden sm:flex flex-col sm:flex-row gap-2 mt-2">
          <button 
            className="flex-1 bg-rose-300 hover:bg-rose-400 text-white px-4 py-2 rounded transition"
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic here
            }}
          >
            Add to Cart
          </button>
          <button 
            className="flex-1 border border-rose-300 text-rose-400 hover:bg-rose-50 px-4 py-2 rounded transition"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/cake/${cake.id}`);
            }}
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );

  const CakeSection = ({ title, cakes, backdrop }) => (
    <div className={backdrop ? "mb-12 relative lg:p-8 md:p-2" : "mb-12"}>
      {backdrop && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-pink-100/80 to-rose-200/80 rounded-2xl" />
          <svg className="absolute top-4 left-4 w-12 h-12 opacity-30" fill="#e098b0" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <svg className="absolute bottom-4 right-4 w-16 h-16 opacity-20" fill="#e098b0" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      )}
      <h2 className="text-3xl font-bold mb-6 text-left text-[#1F2937] relative z-10">{title}</h2>
      <div className={backdrop ? "relative z-10" : ""}>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {cakes.map(cake => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 p-4 lg:p-8">
      <CakeSection title="Our Trending Cakes" cakes={trendingCakes} />
      <CakeSection title="Surprise Your Love" cakes={surpriseCakes} backdrop />
      <CakeSection title="Our Best Sellers" cakes={bestSellers} />
    </div>
  );
};

export default CakeGallery; 