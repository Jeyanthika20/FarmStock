import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProductFilters from '../../components/products/ProductFilters';
import ProductCard from '../../components/products/ProductCard';
import ProductDetails from '../../components/products/ProductDetails';
import toast from 'react-hot-toast';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceSort, setPriceSort] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Dairy'];

  // Sample products data
  const allProducts = [
    { 
      id: 1, 
      name: 'Organic Tomatoes', 
      seller: 'Krishna Farms', 
      price: 45, 
      unit: 'kg', 
      rating: 4.5, 
      image: '🍅', 
      category: 'Vegetables',
      description: 'Fresh organic tomatoes grown without harmful pesticides. Perfect for cooking, salads, and sauces. Harvested daily to ensure maximum freshness and taste.'
    },
    { 
      id: 2, 
      name: 'Fresh Potatoes', 
      seller: 'Green Valley', 
      price: 30, 
      unit: 'kg', 
      rating: 4.8, 
      image: '🥔', 
      category: 'Vegetables',
      description: 'High-quality potatoes ideal for all your cooking needs. Sourced from local farms with sustainable farming practices.'
    },
    { 
      id: 3, 
      name: 'Green Chilies', 
      seller: 'Spice Garden', 
      price: 80, 
      unit: 'kg', 
      rating: 4.3, 
      image: '🌶️', 
      category: 'Vegetables',
      description: 'Premium green chilies with the perfect balance of heat and flavor. Great for cooking authentic Indian dishes.'
    },
    { 
      id: 4, 
      name: 'Red Onions', 
      seller: 'Harvest Hub', 
      price: 35, 
      unit: 'kg', 
      rating: 4.6, 
      image: '🧅', 
      category: 'Vegetables',
      description: 'Fresh red onions with a sweet and mild flavor. Essential ingredient for everyday cooking.'
    },
    { 
      id: 5, 
      name: 'Fresh Apples', 
      seller: 'Mountain Orchards', 
      price: 120, 
      unit: 'kg', 
      rating: 4.7, 
      image: '🍎', 
      category: 'Fruits',
      description: 'Crisp and juicy apples from the mountain orchards. Rich in nutrients and perfect for healthy snacking.'
    },
    { 
      id: 6, 
      name: 'Bananas', 
      seller: 'Tropical Farms', 
      price: 50, 
      unit: 'dozen', 
      rating: 4.4, 
      image: '🍌', 
      category: 'Fruits',
      description: 'Premium quality bananas rich in potassium and energy. Perfect for breakfast and smoothies.'
    },
    { 
      id: 7, 
      name: 'Basmati Rice', 
      seller: 'Golden Harvest', 
      price: 80, 
      unit: 'kg', 
      rating: 4.9, 
      image: '🌾', 
      category: 'Grains',
      description: 'Premium aged basmati rice with authentic aroma and long grains. Perfect for biryanis and pulao.'
    },
    { 
      id: 8, 
      name: 'Wheat Flour', 
      seller: 'Mill Masters', 
      price: 40, 
      unit: 'kg', 
      rating: 4.5, 
      image: '🌾', 
      category: 'Grains',
      description: 'Freshly ground whole wheat flour. Ideal for making rotis, parathas, and healthy breads.'
    },
    { 
      id: 9, 
      name: 'Toor Dal', 
      seller: 'Pulse Paradise', 
      price: 120, 
      unit: 'kg', 
      rating: 4.6, 
      image: '🫘', 
      category: 'Pulses',
      description: 'High-quality toor dal (pigeon peas) with excellent taste and nutritional value. Essential for dal preparations.'
    },
    { 
      id: 10, 
      name: 'Moong Dal', 
      seller: 'Pulse Paradise', 
      price: 110, 
      unit: 'kg', 
      rating: 4.7, 
      image: '🫘', 
      category: 'Pulses',
      description: 'Premium moong dal rich in protein. Perfect for dal, khichdi, and various Indian dishes.'
    },
    { 
      id: 11, 
      name: 'Turmeric Powder', 
      seller: 'Spice Masters', 
      price: 250, 
      unit: 'kg', 
      rating: 4.8, 
      image: '🧂', 
      category: 'Spices',
      description: 'Pure turmeric powder with natural color and aroma. Known for its health benefits and flavor.'
    },
    { 
      id: 12, 
      name: 'Red Chili Powder', 
      seller: 'Spice Masters', 
      price: 200, 
      unit: 'kg', 
      rating: 4.5, 
      image: '🌶️', 
      category: 'Spices',
      description: 'Authentic red chili powder with perfect heat level. Adds color and spice to your dishes.'
    },
  ];

  // Filter products based on search, category, and price sort
  const getFilteredProducts = () => {
    let filtered = allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Apply price sorting
    if (priceSort === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Handle add to cart
  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart!`);
    // Close modal if open
    if (selectedProduct) {
      setSelectedProduct(null);
    }
  };

  // Handle view product details
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-1">Browse fresh produce from local farmers</p>
        </div>

        {/* Filters */}
        <ProductFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          showPriceSort={true}
          priceSort={priceSort}
          onPriceSortChange={setPriceSort}
        />

        {/* Products Count */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
            </p>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="buyer"
                onAddToCart={handleAddToCart}
                onView={handleViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setPriceSort('');
              }}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </DashboardLayout>
  );
};

export default Marketplace;