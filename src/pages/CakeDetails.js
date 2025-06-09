import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import cake from '../assets/cake.jpg';
import { useCart } from '../context/CartContext';
import { getCakeById, addReview } from '../services/cakeServices';
import { toast } from 'react-toastify';

const CakeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [cakeData, setCakeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');
  const { addToCart } = useCart();
  const scrollContainerRef = useRef(null);
  // New state for review form and modal
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    name: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  // Fetch cake data if not available from location state
  useEffect(() => {
    const fetchCakeData = async () => {
      if (!location.state?.cake) {
        try {
          setLoading(true);
          const data = await getCakeById(id);
          setCakeData(data);
          setError(null);
        } catch (err) {
          console.error('Error fetching cake:', err);
          setError('Failed to fetch cake details. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCakeData();
  }, [id, location.state]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  // Sample cake data - replace with your actual data
  // const cakeData = {
  //   id: 1,
  //   name: 'Classic Chocolate Cake',
  //   price: 25,
  //   image: cake,
  //   description: 'A rich and moist chocolate cake made with premium cocoa and the finest ingredients. Perfect for any celebration.',
  //   sizes: [
  //     { id: 'small', name: 'Small', price: 20, serves: '4-6' },
  //     { id: 'medium', name: 'Medium', price: 25, serves: '8-10' },
  //     { id: 'large', name: 'Large', price: 35, serves: '12-15' }
  //   ],
  //   ingredients: [
  //     'Premium Cocoa Powder',
  //     'Organic Flour',
  //     'Fresh Dairy',
  //     'Natural Sweeteners',
  //     'Pure Vanilla Extract'
  //   ],
  //   allergens: ['Dairy', 'Gluten'],
  //   nutritionInfo: {
  //     calories: '350 per slice',
  //     protein: '5g',
  //     carbs: '45g',
  //     fat: '18g'
  //   },
  //   reviews: [
  //     {
  //       id: 1,
  //       name: 'Sarah Johnson',
  //       rating: 5,
  //       comment: 'The best chocolate cake I\'ve ever had! Moist and delicious.',
  //       date: '2024-02-15'
  //     },
  //     {
  //       id: 2,
  //       name: 'Mike Brown',
  //       rating: 4,
  //       comment: 'Great taste and perfect texture. Will order again!',
  //       date: '2024-02-10'
  //     }
  //   ]
  // };


  // Sample related cakes data
  const relatedCakes = [
    {
      id: 2,
      name: 'Vanilla Dream Cake',
      price: 23,
      image: cake,
      description: 'Light and fluffy vanilla cake with buttercream frosting'
    },
    {
      id: 3,
      name: 'Red Velvet Delight',
      price: 28,
      image: cake,
      description: 'Classic red velvet with cream cheese frosting'
    },
    {
      id: 4,
      name: 'Carrot Cake Special',
      price: 26,
      image: cake,
      description: 'Moist carrot cake with walnuts and cream cheese frosting'
    },
        {
      id: 2,
      name: 'Vanilla Dream Cake',
      price: 23,
      image: cake,
      description: 'Light and fluffy vanilla cake with buttercream frosting'
    },
    {
      id: 3,
      name: 'Red Velvet Delight',
      price: 28,
      image: cake,
      description: 'Classic red velvet with cream cheese frosting'
    },
    {
      id: 4,
      name: 'Carrot Cake Special',
      price: 26,
      image: cake,
      description: 'Moist carrot cake with walnuts and cream cheese frosting'
    },
      {
      id: 5,
      name: 'Vanilla Dream Cake',
      price: 23,
      image: cake,
      description: 'Light and fluffy vanilla cake with buttercream frosting'
    },
    {
      id: 6,
      name: 'Red Velvet Delight',
      price: 28,
      image: cake,
      description: 'Classic red velvet with cream cheese frosting'
    },
    {
      id: 7,
      name: 'Carrot Cake Special',
      price: 26,
      image: cake,
      description: 'Moist carrot cake with walnuts and cream cheese frosting'
    }
  ];

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!cakeData) return;
    
    const selectedSizeData = cakeData.sizes.find(size => size.id === selectedSize);
    const cartItem = {
      ...cakeData,
      selectedSize: selectedSizeData,
      quantity: quantity
    };
    
    addToCart(cartItem);
    const token=localStorage.getItem("token");
    if(token){
      toast.success('Added to cart successfully!');
    }

  };

  // Updated review submission handler
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.comment || !newReview.name) {
      toast.error('Please fill in all fields and select a rating');
      return;
    }

    try {
      setSubmittingReview(true);
      const reviewData = {
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment
      };

      console.log('====================================');
      console.log("cake id",id);
      console.log('====================================');
      const updatedCake = await addReview(id, reviewData);
      setCakeData(updatedCake);
      
      // Reset form and close modal
      setNewReview({
        rating: 0,
        comment: '',
        name: ''
      });
      setIsReviewModalOpen(false);
      toast.success('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again later.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cake details...</p>
        </div>
      </div>
    );
  }

  if (error || !cakeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Cake not found'}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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
                      <div className="text-rose-500 font-semibold">₹{size.price}</div>
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

              {/* Reviews Section */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="bg-rose-300 hover:bg-rose-400 text-white font-semibold px-4 py-2 rounded-lg transition"
                  >
                    Write a Review
                  </button>
                </div>

                {/* Existing Reviews */}
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

        {/* Related Cakes Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
            <div className="flex gap-2">
              <button
                onClick={scrollLeft}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {relatedCakes.map((cake) => (
              <div
                key={cake.id}
                className="flex-none w-[280px] md:w-[320px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer snap-start"
                onClick={() => navigate(`/cake/${cake.id}`)}
              >
                <div className="aspect-square">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">{cake.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{cake.description}</p>
                  <p className="text-rose-500 font-semibold">${cake.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Write a Review</h3>
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={submittingReview}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({...newReview, rating: star})}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none"
                      >
                        <svg
                          className={`w-8 h-8 ${
                            star <= (hoveredRating || newReview.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                    rows="4"
                    placeholder="Share your experience with this cake..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    disabled={submittingReview}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-rose-300 hover:bg-rose-400 text-white font-semibold px-6 py-2 rounded-lg transition flex items-center gap-2"
                    disabled={submittingReview}
                  >
                    {submittingReview ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CakeDetails; 