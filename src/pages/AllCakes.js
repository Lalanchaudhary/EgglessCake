import React, { useState } from 'react';
import CakeGallery from '../components/CakeGallery';
import cake from '../assets/cake.jpg';
import { useNavigate } from 'react-router-dom';

const AllCakes = () => {
  const [activeSection, setActiveSection] = useState('all');
  const navigate = useNavigate();

  // Sample cake data organized by category
  const cakeCategories = {
    chocolate: {
      title: "Chocolate Delights",
      description: "Rich, decadent chocolate cakes that will satisfy your sweet tooth",
      cakes: [
        { id: 1, name: 'Classic Chocolate Cake', price: 25, image: cake, rating: 4.5, reviewCount: 128 },
        { id: 2, name: 'Chocolate Truffle Cake', price: 30, image: cake, rating: 4.8, reviewCount: 95 },
        { id: 3, name: 'Chocolate Fudge Cake', price: 28, image: cake, rating: 4.3, reviewCount: 76 },
        { id: 4, name: 'Chocolate Fudge Cake', price: 28, image: cake, rating: 4.7, reviewCount: 112 },
      ]
    },
    vanilla: {
      title: "Vanilla Classics",
      description: "Timeless vanilla cakes with a modern twist",
      cakes: [
        { id: 4, name: 'Classic Vanilla Cake', price: 22, image: cake, rating: 4.6, reviewCount: 89 },
        { id: 5, name: 'Vanilla Bean Cake', price: 26, image: cake, rating: 4.4, reviewCount: 67 },
        { id: 6, name: 'Vanilla Cream Cake', price: 24, image: cake, rating: 4.2, reviewCount: 54 },
      ]
    },
    fruit: {
      title: "Fruit Favorites",
      description: "Fresh and fruity cakes bursting with natural flavors",
      cakes: [
        { id: 7, name: 'Strawberry Delight', price: 28, image: cake, rating: 4.9, reviewCount: 156 },
        { id: 8, name: 'Mixed Fruit Cake', price: 32, image: cake, rating: 4.7, reviewCount: 98 },
        { id: 9, name: 'Berry Blast Cake', price: 30, image: cake, rating: 4.5, reviewCount: 82 },
      ]
    }
  };

  const categories = [
    { id: 'all', name: 'All Cakes' },
    { id: 'chocolate', name: 'Chocolate' },
    { id: 'vanilla', name: 'Vanilla' },
    { id: 'fruit', name: 'Fruit' }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Cake Collection
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover our wide range of delicious eggless cakes, each crafted with love and the finest ingredients.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveSection(category.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === category.id
                  ? 'bg-rose-300 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-rose-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Cake Sections */}
        {activeSection === 'all' ? (
          // Show all categories
          Object.entries(cakeCategories).map(([category, data]) => (
            <div key={category} className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {data.title}
                </h2>
                <p className="text-gray-600">{data.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.cakes.map(cake => (
                  <div 
                    key={cake.id} 
                    className="group bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate(`/cake/${cake.id}`)}
                  >
                    <div className="w-full aspect-square relative overflow-hidden p-4 pb-0">
                      <img
                        src={cake.image}
                        alt={cake.name}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="w-full p-4">
                      <div className="flex items-center gap-2 justify-between">
                      <p className="text-rose-500 font-medium mb-3">${cake.price}</p>
                      <div className='flex'>
                        <div className="flex">
                          {renderStars(cake.rating)}
                        </div>
                        <span className="text-sm text-gray-600">({cake.reviewCount})</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-1 text-gray-800 group-hover:text-rose-500 transition-colors duration-300">{cake.name}</h3>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button 
                          className="flex-1 bg-rose-300 hover:bg-rose-400 text-white px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add to cart logic here
                          }}
                        >
                          Add to Cart
                        </button>
                        <button 
                          className="flex-1 border border-rose-300 text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
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
                ))}
              </div>
            </div>
          ))
        ) : (
          // Show selected category
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {cakeCategories[activeSection].title}
              </h2>
              <p className="text-gray-600">{cakeCategories[activeSection].description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cakeCategories[activeSection].cakes.map(cake => (
                <div 
                  key={cake.id} 
                  className="group bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  onClick={() => navigate(`/cake/${cake.id}`)}
                >
                  <div className="w-full aspect-square relative overflow-hidden">
                    <img
                      src={cake.image}
                      alt={cake.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="w-full p-4">
                    <h3 className="font-semibold text-lg mb-1 text-gray-800 group-hover:text-rose-500 transition-colors duration-300">{cake.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {renderStars(cake.rating)}
                      </div>
                      <span className="text-sm text-gray-600">({cake.reviewCount})</span>
                    </div>
                    <p className="text-rose-500 font-medium mb-3">${cake.price}</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button 
                        className="flex-1 bg-rose-300 hover:bg-rose-400 text-white px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to cart logic here
                        }}
                      >
                        Add to Cart
                      </button>
                      <button 
                        className="flex-1 border border-rose-300 text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCakes; 