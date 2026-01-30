import { ShoppingCart, Heart, Eye, Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';

const ProductCard = ({ 
  product, 
  variant = 'buyer', // 'buyer' or 'farmer'
  onAddToCart,
  onEdit,
  onDelete,
  onView
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group cursor-pointer">
      {/* Make entire card clickable for view */}
      <div 
        className="p-6"
        onClick={() => variant === 'buyer' && onView?.(product)}
      >
        {/* Product Image/Icon and Favorite */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl group-hover:scale-110 transition-transform">{product.image || '📦'}</div>
          
          {variant === 'buyer' && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                setIsFavorite(!isFavorite);
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Heart 
                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
              />
            </button>
          )}
          
          {variant === 'farmer' && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                product.status === 'Active' || product.status === 'In Stock'
                  ? 'bg-green-100 text-green-700'
                  : product.status === 'Low Stock'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {product.status}
            </span>
          )}
        </div>
        
        {/* Product Info */}
        <h3 className="font-semibold text-gray-900 text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3">
          {variant === 'buyer' ? product.seller : product.category}
        </p>
        
        {/* Price and Rating/Stock */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-primary-600">
              {formatCurrency(product.price)}
              <span className="text-sm text-gray-500">/{product.unit}</span>
            </p>
            {variant === 'buyer' && product.rating && (
              <p className="text-xs text-gray-600 mt-1">⭐ {product.rating}</p>
            )}
            {variant === 'farmer' && product.stock !== undefined && (
              <p className="text-xs text-gray-600 mt-1">Stock: {product.stock} {product.unit}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        {variant === 'buyer' ? (
          <div className="space-y-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                onAddToCart?.(product);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-2.5 rounded-lg hover:bg-primary-700 transition font-medium"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                onView?.(product);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(product);
              }}
              className="flex-1 flex items-center justify-center space-x-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition text-sm font-medium"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView?.(product);
              }}
              className="flex items-center justify-center bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(product);
              }}
              className="flex items-center justify-center bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;