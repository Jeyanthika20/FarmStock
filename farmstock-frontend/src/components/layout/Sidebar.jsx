import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Plus,
  BarChart3,
  MessageSquare,
  FileText,
  Settings,
  Store,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const farmerMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/farmer/dashboard' },
    { icon: Package, label: 'My Products', path: '/farmer/products' },
    { icon: Plus, label: 'Add Product', path: '/farmer/add-product' },
    { icon: ShoppingCart, label: 'Orders', path: '/farmer/orders' },
    { icon: BarChart3, label: 'Analytics', path: '/farmer/analytics' },
    { icon: MessageSquare, label: 'Messages', path: '/farmer/messages' },
  ];

  const buyerMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/buyer/dashboard' },
    { icon: Store, label: 'Marketplace', path: '/buyer/marketplace' },
    { icon: ShoppingCart, label: 'My Orders', path: '/buyer/orders' },
    { icon: Package, label: 'Wishlist', path: '/buyer/wishlist' },
    { icon: MessageSquare, label: 'Messages', path: '/buyer/messages' },
  ];

  const supplierMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/supplier/dashboard' },
    { icon: Package, label: 'My Supplies', path: '/supplier/supplies' },
    { icon: Plus, label: 'Add Supply', path: '/supplier/add-supply' },
    { icon: ShoppingCart, label: 'Orders', path: '/supplier/orders' },
    { icon: BarChart3, label: 'Analytics', path: '/supplier/analytics' },
  ];

  const menuItems = 
    user?.role === 'farmer' ? farmerMenuItems :
    user?.role === 'buyer' ? buyerMenuItems :
    supplierMenuItems;

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button (Mobile) */}
          <div className="lg:hidden flex justify-end p-4">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-primary-50 rounded-lg p-4">
              <p className="text-sm font-semibold text-primary-900 mb-1">
                Need Help?
              </p>
              <p className="text-xs text-primary-700 mb-3">
                Contact our support team
              </p>
              <button className="text-xs bg-primary-600 text-white px-3 py-1.5 rounded-lg hover:bg-primary-700 transition w-full">
                Get Support
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;