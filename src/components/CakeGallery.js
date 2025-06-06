import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackDropSection from './BackDropSection';

const CakeGallery = () => {
  const navigate = useNavigate();
  const trendingScrollRef = useRef(null);
  const surpriseScrollRef = useRef(null);
  const bestSellersScrollRef = useRef(null);

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

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  // Sample cake data - replace with your actual data
  const trendingCakes = [
    {
      id: 1,
      name: 'Classic Chocolate Cake',
      price: 825,
      image: "https://bkmedia.bakingo.com/choco-truffle-cake0005choc-a.jpg?tr=w-320,h-320,dpr-1.5,q-70",
      rating: 4.5,
      reviewCount: 128,
      description: 'A rich and moist chocolate cake topped with creamy chocolate frosting.'
    },
    {
      id: 2,
      name: 'Chocolate Truffle Cake',
      price: 530,
      image: "https://bkmedia.bakingo.com/mango-naked-cake-cake4692mang-A_0.jpg?tr=w-320,h-320,dpr-1.5,q-70",
      rating: 4.8,
      reviewCount: 95,
      description: 'Decadent layers of chocolate cake filled with velvety chocolate truffle.'
    },
    {
      id: 3,
      name: 'Chocolate Fudge Cake',
      price: 328,
      image: "https://bkmedia.bakingo.com/choco-vanilla-cake0006chva-AAA.jpg?tr=w-320,h-320,dpr-1.5,q-70",
      rating: 4.3,
      reviewCount: 76,
      description: 'Indulgent fudge cake with a gooey chocolate center and rich ganache topping.'
    },
    {
      id: 4,
      name: 'Chocolate Fudge Cake',
      price: 1228,
      image: "https://bkmedia.bakingo.com/fresh-fruit-cake0014frui-AAA.jpg?tr=w-320,h-320,dpr-1.5,q-70",
      rating: 4.7,
      reviewCount: 112,
      description: 'Soft chocolate sponge filled with fudge layers and topped with glossy glaze.'
    },
    {
      id: 5,
      name: 'Chocolate Fudge Cake',
      price: 1228,
      image: "https://bkmedia.bakingo.com/mango-naked-cake-cake4692mang-A_0.jpg?tr=w-320,h-320,dpr-1.5,q-70",
      rating: 4.7,
      reviewCount: 112,
      description: 'Soft chocolate sponge filled with fudge layers and topped with glossy glaze.'
    }
  ];
  
  const surpriseCakes = [
    {
      id: 1,
      name: 'Classic Chocolate Cake',
      price: 825,
      image: "https://bkmedia.bakingo.com/regular_cake_1.jpg?tr=w-484,dpr-1.5,q-70",
      rating: 4.5,
      reviewCount: 128,
      description: 'A rich and moist chocolate cake topped with creamy chocolate frosting.'
    },
    {
      id: 2,
      name: 'Chocolate Truffle Cake',
      price: 530,
      image: "https://bkmedia.bakingo.com/photo_cake_desktop.jpg?tr=w-484,dpr-1.5,q-70",
      rating: 4.8,
      reviewCount: 95,
      description: 'Decadent layers of chocolate cake filled with velvety chocolate truffle.'
    },
    {
      id: 3,
      name: 'Chocolate Fudge Cake',
      price: 328,
      image: "https://bkmedia.bakingo.com/theme_cake_9.jpg?tr=w-484,dpr-1.5,q-70",
      rating: 4.3,
      reviewCount: 76,
      description: 'Indulgent fudge cake with a gooey chocolate center and rich ganache topping.'
    },
    {
      id: 4,
      name: 'Chocolate Fudge Cake',
      price: 1228,
      image: "https://bkmedia.bakingo.com/mango-naked-cake-cake4692mang-A_0.jpg?tr=w-320,h-320,dpr-1.5,q-70",
      rating: 4.7,
      reviewCount: 112,
      description: 'Soft chocolate sponge filled with fudge layers and topped with glossy glaze.'
    },
    {
      id: 5,
      name: 'Chocolate Fudge Cake',
      price: 1228,
      image: "https://bkmedia.bakingo.com/gourmet_cake_0.jpg?tr=w-484,dpr-1.5,q-70",
      rating: 4.7,
      reviewCount: 112,
      description: 'Soft chocolate sponge filled with fudge layers and topped with glossy glaze.'
    }
  ];
  
  const bestSellers =[
    {
      id: 1,
      name: 'Classic Chocolate Cake',
      price: 825,
      image: "https://bkmedia.bakingo.com/black-forest-cake0001chbl-AAA.jpg?tr=w-320,h-320,dpr-1.5,q-70",
      rating: 4.5,
      reviewCount: 128,
      description: 'A rich and moist chocolate cake topped with creamy chocolate frosting.'
    },
    {
      id: 2,
      name: 'Chocolate Truffle Cake',
      price: 530,
      image: "https://bkmedia.bakingo.com/kitkat-chocolate-cake-cake1119choco-AAA.jpg?tr=w-320,h-320,dpr-1.5,q-70",
      rating: 4.8,
      reviewCount: 95,
      description: 'Decadent layers of chocolate cake filled with velvety chocolate truffle.'
    },
    {
      id: 3,
      name: 'Chocolate Fudge Cake',
      price: 328,
      image: "https://bkmedia.bakingo.com/chocolate-chip-cake0008choc-AAA.jpg?tr=w-320,h-320,dpr-1.5,q-70",
      rating: 4.3,
      reviewCount: 76,
      description: 'Indulgent fudge cake with a gooey chocolate center and rich ganache topping.'
    },
    {
      id: 4,
      name: 'Chocolate Fudge Cake',
      price: 1228,
      image: "https://bkmedia.bakingo.com/heart-shaped-red-velvet-cake-cake1095redv-AAA.jpg?tr=w-320,h-320,dpr-1.5,q-70",
      rating: 4.7,
      reviewCount: 112,
      description: 'Soft chocolate sponge filled with fudge layers and topped with glossy glaze.'
    },
    {
      id: 5,
      name: 'Chocolate Fudge Cake',
      price: 1228,
      image: "https://bkmedia.bakingo.com/fantasy-barbie-cake-them2655flav-A.jpg?tr=w-320,h-320,dpr-1.5,q-70",
      rating: 4.7,
      reviewCount: 112,
      description: 'Soft chocolate sponge filled with fudge layers and topped with glossy glaze.'
    }
  ];;
  

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
          <p className="text-rose-500 font-medium text-sm">₹{cake.price}</p>
          <div className='flex items-center gap-1'>
            <div className="hidden lg:flex">
              {renderStars(cake.rating)}
            </div>
            <div className='block lg:hidden'>
            <svg
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        </div>
            <span className="text-xs text-gray-600">({cake.reviewCount})</span>
          </div>
        </div>
        <h3 className="font-medium text-sm text-gray-800 group-hover:text-rose-500 transition-colors duration-300 mb-2">
          {cake.name}
        </h3>
        <p className="hidden lg:block md:block text-xs text-gray-600 mb-3 line-clamp-2">
          {cake.description}
        </p>
        <div className="flex gap-2">
          <button 
            className="hidden lg:block flex-1 bg-rose-300 hover:bg-rose-400 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic here
            }}
          >
            Add to Cart
          </button>
          <button 
            className="hidden lg:block flex-1 border border-rose-300 text-rose-500 hover:bg-rose-50 px-2 py-1.5 rounded text-xs font-medium transition-colors duration-300"
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

  const CakeSection = ({ title, cakes, backdrop, scrollRef }) => (
    <div className={backdrop ? "mb-8 relative lg:p-6 md:p-2" : "mb-8"}>
      {backdrop && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-pink-100/80 to-rose-200/80 rounded-xl" />
          <svg className="absolute top-4 left-4 w-8 h-8 opacity-30" fill="#e098b0" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <svg className="absolute bottom-4 right-4 w-12 h-12 opacity-20" fill="#e098b0" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-left text-[#1F2937] relative z-10">{title}</h2>
        <div className="flex hidden lg:block md:block gap-2 z-10">
          <button
            onClick={() => scrollLeft(scrollRef)}
            className="p-2 mr-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scrollRight(scrollRef)}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className={backdrop ? "relative z-10" : ""}>
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {cakes.map(cake => (
            <div key={cake.id} className="flex-none w-[280px] md:w-[320px] snap-start">
              <CakeCard cake={cake} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 p-3 lg:p-6">
      <CakeSection title="Our Trending Cakes" cakes={trendingCakes} scrollRef={trendingScrollRef} />
      <CakeSection title="Surprise Your Love" cakes={surpriseCakes} backdrop scrollRef={surpriseScrollRef} />
      <BackDropSection />
      <CakeSection title="Our Best Sellers" cakes={bestSellers} scrollRef={bestSellersScrollRef} />
    </div>
  );
};

export default CakeGallery; 