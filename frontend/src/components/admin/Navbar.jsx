import { useState } from 'react';
import { FaBell, FaUser, FaBars } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const Navbar = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white shadow-md z-30 flex items-center justify-between px-6">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuToggle}
        className="md:hidden text-gray-600 hover:text-gray-900"
      >
        <FaBars className="text-xl" />
      </button>

      {/* Search or Title */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-800">
          Bem-vindo, {user?.name || 'Admin'}!
        </h2>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900">
          <FaBell className="text-xl" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <FaUser className="text-white text-sm" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">
              {user?.name || 'Admin'}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Perfil
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Configurações
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
