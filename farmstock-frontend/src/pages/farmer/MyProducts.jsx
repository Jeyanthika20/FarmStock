import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next'; 
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';

const MyProducts = () => {
   useAuth();
  const { t } = useTranslation(); 
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, name: 'Organic Tomatoes', category: 'Vegetables', price: 45, stock: 150, unit: 'kg', status: 'Active', image: '🍅' },
    { id: 2, name: 'Fresh Potatoes', category: 'Vegetables', price: 30, stock: 200, unit: 'kg', status: 'Active', image: '🥔' },
    { id: 3, name: 'Green Chilies', category: 'Vegetables', price: 80, stock: 50, unit: 'kg', status: 'Active', image: '🌶️' },
    { id: 4, name: 'Red Onions', category: 'Vegetables', price: 35, stock: 180, unit: 'kg', status: 'Active', image: '🧅' },
    { id: 5, name: 'Fresh Carrots', category: 'Vegetables', price: 40, stock: 120, unit: 'kg', status: 'Active', image: '🥕' },
    { id: 6, name: 'Cauliflower', category: 'Vegetables', price: 25, stock: 90, unit: 'kg', status: 'Low Stock', image: '🥦' },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('products.myProducts')}</h1>
            <p className="text-gray-600 mt-1">{t('products.manageInventory')}</p>
          </div>
          <Link
            to="/farmer/add-product"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            <Plus className="w-5 h-5" />
            <span>{t('products.addProduct')}</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('products.searchProducts')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{product.image}</div>
                  
                  {/* STATUS BADGE */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : product.status === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {/* HERE IS THE STATUS TRANSLATION */}
                    {product.status === 'Active' 
                      ? t('products.inStock') 
                      : product.status === 'Low Stock' 
                      ? t('products.lowStock') 
                      : t('products.outOfStock')
                    }
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-primary-600">
                      {formatCurrency(product.price)}
                      <span className="text-sm text-gray-500">/{product.unit}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('products.stock')}: {product.stock} {product.unit}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition text-sm">
                    <Edit className="w-4 h-4" />
                    <span>{t('common.edit')}</span>
                  </button>
                  <button className="flex items-center justify-center bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="flex items-center justify-center bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State*/}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('products.noProductsFound')}</h3>
            <p className="text-gray-600 mb-6">{t('products.tryAdjusting')}</p>
            <Link
              to="/farmer/add-product"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              <Plus className="w-5 h-5" />
              <span>{t('products.addProduct')}</span>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyProducts;