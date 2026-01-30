import { X, ShoppingCart, Heart, Store, Package } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';

const ProductDetails = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    onAddToCart?.({ ...product, quantity });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left - Image */}
            <div>
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <div className="text-9xl">{product.image || '📦'}</div>
              </div>
              
              {/* Seller Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <Store className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Sold by</p>
                    <p className="font-semibold text-gray-900">{product.seller}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              
              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold text-gray-900">{product.rating}</span>
                  <span className="text-gray-500 text-sm">(128 reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-primary-600 mb-1">
                  {formatCurrency(product.price)}
                  <span className="text-xl text-gray-500">/{product.unit}</span>
                </p>
                <p className="text-sm text-gray-500">Inclusive of all taxes</p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-semibold">In Stock</span>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description || 'Fresh and organic produce directly from the farm. Grown without harmful pesticides and chemicals. Perfect for your daily cooking needs.'}
                  </p>
                </div>
              )}

              {/* Product Details */}
              <div className="mb-6 space-y-2">
                <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-gray-900">{product.category || 'Vegetables'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Unit</span>
                  <span className="font-medium text-gray-900">{product.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Origin</span>
                  <span className="font-medium text-gray-900">Local Farm</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition font-semibold"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold text-gray-900 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition font-semibold"
                  >
                    +
                  </button>
                  <span className="text-gray-600">{product.unit}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;