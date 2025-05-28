import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cake from '../assets/cake.jpg';

const CakeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');

  // Sample cake data - replace with your actual data
  const cakeData = {
    id: 1,
    name: 'Classic Chocolate Cake',
    price: 25,
    image: cake,
    description: 'A rich and moist chocolate cake made with premium cocoa and the finest ingredients. Perfect for any celebration.',
    sizes: [
      { id: 'small', name: 'Small', price: 20, serves: '4-6' },
      { id: 'medium', name: 'Medium', price: 25, serves: '8-10' },
      { id: 'large', name: 'Large', price: 35, serves: '12-15' }
    ],
    ingredients: [
      'Premium Cocoa Powder',
      'Organic Flour',
      'Fresh Dairy',
      'Natural Sweeteners',
      'Pure Vanilla Extract'
    ],
    allergens: ['Dairy', 'Gluten'],
    nutritionInfo: {
      calories: '350 per slice',
      protein: '5g',
      carbs: '45g',
      fat: '18g'
    },
    reviews: [
      {
        id: 1,
        name: 'Sarah Johnson',
        rating: 5,
        comment: 'The best chocolate cake I\'ve ever had! Moist and delicious.',
        date: '2024-02-15'
      },
      {
        id: 2,
        name: 'Mike Brown',
        rating: 4,
        comment: 'Great taste and perfect texture. Will order again!',
        date: '2024-02-10'
      }
    ]
  };

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', {
      cake: cakeData.name,
      size: selectedSize,
      quantity: quantity
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Cakes
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Left Column - Image */}
            <div className="relative aspect-square">
              <img
                src={cakeData.image}
                alt={cakeData.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {cakeData.name}
                </h1>
                <p className="text-gray-600">{cakeData.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Select Size</h3>
                <div className="grid grid-cols-3 gap-4">
                  {cakeData.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedSize === size.id
                          ? 'border-rose-300 bg-rose-50'
                          : 'border-gray-200 hover:border-rose-200'
                      }`}
                    >
                      <div className="font-medium">{size.name}</div>
                      <div className="text-sm text-gray-600">Serves {size.serves}</div>
                      <div className="text-rose-500 font-semibold">${size.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="w-16 text-center border-x py-2"
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-rose-300 hover:bg-rose-400 text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>

              {/* Additional Information */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {cakeData.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Allergens */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Allergens</h3>
                    <div className="flex flex-wrap gap-2">
                      {cakeData.allergens.map((allergen, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {cakeData.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{review.name}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeDetails; 