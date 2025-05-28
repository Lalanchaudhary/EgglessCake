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
        { id: 1, name: 'Classic Chocolate Cake', price: 25, image: cake },
        { id: 2, name: 'Chocolate Truffle Cake', price: 30, image: cake },
        { id: 3, name: 'Chocolate Fudge Cake', price: 28, image: cake },
        { id: 4, name: 'Chocolate Fudge Cake', price: 28, image: cake },
      ]
    },
    vanilla: {
      title: "Vanilla Classics",
      description: "Timeless vanilla cakes with a modern twist",
      cakes: [
        { id: 4, name: 'Classic Vanilla Cake', price: 22, image: cake },
        { id: 5, name: 'Vanilla Bean Cake', price: 26, image: cake },
        { id: 6, name: 'Vanilla Cream Cake', price: 24, image: cake },
      ]
    },
    fruit: {
      title: "Fruit Favorites",
      description: "Fresh and fruity cakes bursting with natural flavors",
      cakes: [
        { id: 7, name: 'Strawberry Delight', price: 28, image: cake },
        { id: 8, name: 'Mixed Fruit Cake', price: 32, image: cake },
        { id: 9, name: 'Berry Blast Cake', price: 30, image: cake },
      ]
    }
  };

  const categories = [
    { id: 'all', name: 'All Cakes' },
    { id: 'chocolate', name: 'Chocolate' },
    { id: 'vanilla', name: 'Vanilla' },
    { id: 'fruit', name: 'Fruit' }
  ];

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
                  <div key={cake.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative aspect-square">
                      <img
                        src={cake.image}
                        alt={cake.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{cake.name}</h3>
                      <p className="text-gray-600 mb-3">${cake.price}</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button className="flex-1 bg-rose-300 hover:bg-rose-400 text-white px-4 py-2 rounded transition">
                          Add to Cart
                        </button>
                        <button 
                          onClick={() => navigate(`/cake/${cake.id}`)}
                          className="flex-1 border border-rose-300 text-rose-400 hover:bg-rose-50 px-4 py-2 rounded transition"
                        >
                          More Details
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
                <div key={cake.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square">
                    <img
                      src={cake.image}
                      alt={cake.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{cake.name}</h3>
                    <p className="text-gray-600 mb-3">${cake.price}</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button className="flex-1 bg-rose-300 hover:bg-rose-400 text-white px-4 py-2 rounded transition">
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => navigate(`/cake/${cake.id}`)}
                        className="flex-1 border border-rose-300 text-rose-400 hover:bg-rose-50 px-4 py-2 rounded transition"
                      >
                        More Details
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