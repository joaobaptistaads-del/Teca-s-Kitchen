import { useAuth } from '../../hooks/useAuth';
import { FaUser } from 'react-icons/fa';

const Navbar = ({ title = 'Dashboard' }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      
      <div className="flex items-center">
        <FaUser className="text-gray-600 mr-2" />
        <span className="text-gray-700 font-medium">{user?.name || 'Admin'}</span>
      </div>
    </div>
  );
};

export default Navbar;
