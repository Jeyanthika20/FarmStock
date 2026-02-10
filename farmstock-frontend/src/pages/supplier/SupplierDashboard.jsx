import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next'; // Add this
import {
  Package,
  Truck,
  DollarSign,
  Users
} from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const SupplierDashboard = () => {
  const { user } = useAuth();
  const { t } = useTranslation(); // Add this
  const [stats] = useState({
    totalSupplies: 18,
    activeDeliveries: 8,
    totalRevenue: 125000,
    totalCustomers: 45
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('dashboard.welcomeBack')}, {user?.name}! 🚚
          </h1>
          <p className="text-gray-600 mt-1">{t('dashboard.supplierGreeting')}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Package}
            label={t('dashboard.totalSupplies')}
            value={stats.totalSupplies}
            color="blue"
          />
          <StatCard
            icon={Truck}
            label={t('dashboard.activeDeliveries')}
            value={stats.activeDeliveries}
            color="orange"
          />
          <StatCard
            icon={DollarSign}
            label={t('dashboard.totalRevenue')}
            value={formatCurrency(stats.totalRevenue)}
            color="purple"
          />
          <StatCard
            icon={Users}
            label={t('dashboard.totalCustomers')}
            value={stats.totalCustomers}
            color="green"
          />
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

export default SupplierDashboard;