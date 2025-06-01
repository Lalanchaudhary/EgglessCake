import React from 'react';
import { useNavigate } from 'react-router-dom';
import cake from '../assets/cake.jpg';
import BackDropSection from './BackDropSection';

const CakeGallery = () => {
  const navigate = useNavigate();

  // Helper function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfStar)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      );
    }

    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };
  // Sample cake data - replace with your actual data
  const trendingCakes = [
    {
      id: 1,
      name: 'Classic Chocolate Cake',
      price: 25,
      image: cake,
      rating: 4.5,
      reviewCount: 128,
      description: 'A rich and moist chocolate cake topped with creamy chocolate frosting.'
    },
    {
      id: 2,
      name: 'Chocolate Truffle Cake',
      price: 30,
      image: cake,
      rating: 4.8,
      reviewCount: 95,
      description: 'Decadent layers of chocolate cake filled with velvety chocolate truffle.'
    },
    {
      id: 3,
      name: 'Chocolate Fudge Cake',
      price: 28,
      image: cake,
      rating: 4.3,
      reviewCount: 76,
      description: 'Indulgent fudge cake with a gooey chocolate center and rich ganache topping.'
    },
    {
      id: 4,
      name: 'Chocolate Fudge Cake',
      price: 28,
      image: cake,
      rating: 4.7,
      reviewCount: 112,
      description: 'Soft chocolate sponge filled with fudge layers and topped with glossy glaze.'
    }
  ];
  
  const surpriseCakes = [
    {
      id: 1,
      name: 'Classic Chocolate Cake',
      price: 25,
      image: cake,
      rating: 4.5,
      reviewCount: 128,
      description: 'A rich and moist chocolate cake topped with creamy chocolate frosting.'
    },
    {
      id: 2,
      name: 'Chocolate Truffle Cake',
      price: 30,
      image: cake,
      rating: 4.8,
      reviewCount: 95,
      description: 'Decadent layers of chocolate cake filled with velvety chocolate truffle.'
    },
    {
      id: 3,
      name: 'Chocolate Fudge Cake',
      price: 28,
      image: cake,
      rating: 4.3,
      reviewCount: 76,
      description: 'Indulgent fudge cake with a gooey chocolate center and rich ganache topping.'
    },
    {
      id: 4,
      name: 'Chocolate Fudge Cake',
      price: 28,
      image: cake,
      rating: 4.7,
      reviewCount: 112,
      description: 'Soft chocolate sponge filled with fudge layers and topped with glossy glaze.'
    }
  ];
  
  const bestSellers = [
    {
      id: 1,
      name: 'Classic Chocolate Cake',
      price: 25,
      image: cake,
      rating: 4.5,
      reviewCount: 128,
      description: 'A rich and moist chocolate cake topped with creamy chocolate frosting.'
    },
    {
      id: 2,
      name: 'Chocolate Truffle Cake',
      price: 30,
      image: cake,
      rating: 4.8,
      reviewCount: 95,
      description: 'Decadent layers of chocolate cake filled with velvety chocolate truffle.'
    },
    {
      id: 3,
      name: 'Chocolate Fudge Cake',
      price: 28,
      image: cake,
      rating: 4.3,
      reviewCount: 76,
      description: 'Indulgent fudge cake with a gooey chocolate center and rich ganache topping.'
    },
    {
      id: 4,
      name: 'Chocolate Fudge Cake',
      price: 28,
      image: cake,
      rating: 4.7,
      reviewCount: 112,
      description: 'Soft chocolate sponge filled with fudge layers and topped with glossy glaze.'
    }
  ];
  

  const CakeCard = ({ cake }) => (
    <div 
      className="group bg-white rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/cake/${cake.id}`)}
    >
      <div className="w-full aspect-square relative overflow-hidden p-4 pb-0">
        <img
          src={cake.image}
          alt={cake.name}
          className="w-full h-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="w-full p-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-rose-500 font-medium text-sm">${cake.price}</p>
          <div className='flex items-center gap-1'>
            <div className="flex">
              {renderStars(cake.rating)}
            </div>
            <span className="text-xs text-gray-600">({cake.reviewCount})</span>
          </div>
        </div>
        <h3 className="font-medium text-sm text-gray-800 group-hover:text-rose-500 transition-colors duration-300 mb-2">
          {cake.name}
        </h3>
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {cake.description}
        </p>
        <div className="flex gap-2">
          <button 
            className="flex-1 bg-rose-300 hover:bg-rose-400 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic here
            }}
          >
            Add to Cart
          </button>
          <button 
            className="flex-1 border border-rose-300 text-rose-500 hover:bg-rose-50 px-2 py-1.5 rounded text-xs font-medium transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/cake/${cake.id}`);
            }}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );

  const CakeSection = ({ title, cakes, backdrop }) => (
    <div className={backdrop ? "mb-8 relative lg:p-6 md:p-2" : "mb-8"}>
      {backdrop && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-pink-100/80 to-rose-200/80 rounded-xl" />
          <svg className="absolute top-4 left-4 w-8 h-8 opacity-30" fill="#e098b0" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <svg className="absolute bottom-4 right-4 w-12 h-12 opacity-20" fill="#e098b0" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      )}
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left text-[#1F2937] relative z-10">{title}</h2>
      <div className={backdrop ? "relative z-10" : ""}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
          {cakes.map(cake => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 p-3 lg:p-6">
      <CakeSection title="Our Trending Cakes" cakes={trendingCakes} />
      <CakeSection title="Surprise Your Love" cakes={surpriseCakes} backdrop />
      <BackDropSection />
      <CakeSection title="Our Best Sellers" cakes={bestSellers} />
    </div>
  );
};

export default CakeGallery; 