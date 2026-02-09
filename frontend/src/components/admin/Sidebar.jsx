import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBoxes, FaChartLine, FaWallet, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/admin/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/admin/products', icon: FaBoxes, label: 'Produtos' },
    { path: '/admin/sales', icon: FaChartLine, label: 'Vendas' },
    { path: '/admin/finance', icon: FaWallet, label: 'Finanças' },
    { path: '/admin/settings', icon: FaCog, label: 'Configurações' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-secondary text-white shadow-lg z-40">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-primary">Teca's Kitchen</h1>
          <p className="text-sm text-gray-400 mt-1">Painel Admin</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="mr-3 text-xl" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
          >
            <FaSignOutAlt className="mr-3 text-xl" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
