import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/admin/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/admin/products', icon: FaBoxOpen, label: 'Produtos' },
    { path: '/admin/sales', icon: FaShoppingCart, label: 'Vendas' },
    { path: '/admin/finance', icon: FaChartLine, label: 'Finanças' },
    { path: '/admin/settings', icon: FaCog, label: 'Configurações' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Teca's Kitchen</h1>
        <p className="text-sm text-gray-400 mt-1">Painel Administrativo</p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 transition ${
              isActive(item.path)
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <item.icon className="mr-3" size={20} />
            <span>{item.label}</span>
          </Link>
        ))}

        <button
          onClick={logout}
          className="flex items-center w-full px-6 py-3 text-gray-300 hover:bg-gray-800 transition mt-4"
        >
          <FaSignOutAlt className="mr-3" size={20} />
          <span>Sair</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
