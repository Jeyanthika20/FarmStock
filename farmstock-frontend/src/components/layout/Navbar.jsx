import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next'; // Add this
import { 
  Sprout, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  Menu
} from 'lucide-react';
import { getInitials } from '../../utils/helpers';
import LanguageSwitcher from '../common/LanguageSwitcher'; // Add this

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { t } = useTranslation(); // Add this
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          {/* Logo */}
          <Link to={`/${user?.role}/dashboard`} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              {t('common.farmstock')}
            </span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Language Switcher - ADD THIS */}
          <LanguageSwitcher />

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {getInitials(user?.name || 'User')}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  
                  <button className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition w-full text-left">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{t('common.profile')}</span>
                  </button>
                  
                  <button className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition w-full text-left">
                    <Settings className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{t('common.settings')}</span>
                  </button>
                  
                  <hr className="my-2" />
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition w-full text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600">{t('common.logout')}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;