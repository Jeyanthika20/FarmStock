import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../hooks/useAuth';
import {
  ShoppingCart,
  Clock,
  CheckCircle,
  Heart,
  Store
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    activeOrders: 5,
    completedOrders: 28,
    totalSpent: 85000,
    savedItems: 12
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}! 🛒
            </h1>
            <p className="text-gray-600 mt-1">Find fresh produce from local farmers</p>
          </div>
          <Link
            to="/buyer/marketplace"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            <Store className="w-5 h-5" />
            <span>Browse Marketplace</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Clock}
            label="Active Orders"
            value={stats.activeOrders}
            color="blue"
          />
          <StatCard
            icon={CheckCircle}
            label="Completed Orders"
            value={stats.completedOrders}
            color="green"
          />
          <StatCard
            icon={ShoppingCart}
            label="Total Spent"
            value={formatCurrency(stats.totalSpent)}
            color="purple"
          />
          <StatCard
            icon={Heart}
            label="Saved Items"
            value={stats.savedItems}
            color="red"
          />
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Start exploring the marketplace!
          </h2>
          <p className="text-gray-600 mb-6">
            Discover fresh produce from local farmers
          </p>
          <Link
            to="/buyer/marketplace"
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            <Store className="w-5 h-5" />
            <span>View Products</span>
          </Link>
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
    red: 'bg-red-100 text-red-600',
  };

  const Icon = icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>

        {Icon ? (
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              colorClasses[color] || ''
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>
        ) : null}
      </div>
    </div>
  );
};


export default BuyerDashboard;