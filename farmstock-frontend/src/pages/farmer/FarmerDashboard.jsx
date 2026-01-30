import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../hooks/useAuth';
import {
  Package,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    totalProducts: 24,
    activeOrders: 12,
    totalRevenue: 145000,
    monthlyGrowth: 12.5
  });

  const recentProducts = [
    { id: 1, name: 'Organic Tomatoes', price: 45, stock: 150, unit: 'kg', status: 'In Stock' },
    { id: 2, name: 'Fresh Potatoes', price: 30, stock: 200, unit: 'kg', status: 'In Stock' },
    { id: 3, name: 'Green Chilies', price: 80, stock: 50, unit: 'kg', status: 'Low Stock' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your farm today</p>
          </div>
          <Link
            to="/farmer/add-product"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Package}
            label="Total Products"
            value={stats.totalProducts}
            color="blue"
          />
          <StatCard
            icon={ShoppingCart}
            label="Active Orders"
            value={stats.activeOrders}
            color="green"
          />
          <StatCard
            icon={DollarSign}
            label="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            color="purple"
          />
          <StatCard
            icon={TrendingUp}
            label="Monthly Growth"
            value={`+${stats.monthlyGrowth}%`}
            color="orange"
          />
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatCurrency(product.price)}/{product.unit} • Stock: {product.stock} {product.unit}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'In Stock'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const StatCard = ({ icon, label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };
 const Icon=icon;
 
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;