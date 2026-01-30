import ProductCard from './ProductCard';

const ProductList = ({ 
  products, 
  variant = 'buyer',
  onAddToCart,
  onEdit,
  onDelete,
  onView,
  emptyMessage = 'No products found'
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-5xl mb-4">📦</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-600">
          {variant === 'buyer' 
            ? 'Try adjusting your search or filters'
            : 'Add your first product to get started'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={variant}
          onAddToCart={onAddToCart}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default ProductList;