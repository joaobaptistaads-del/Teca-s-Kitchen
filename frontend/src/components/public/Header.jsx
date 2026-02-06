import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { settingsService } from '../../services/settingsService';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [restaurantName, setRestaurantName] = useState('Teca\'s Kitchen');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsService.getAllSettings();
        if (response.success && response.data.restaurant_name) {
          setRestaurantName(response.data.restaurant_name);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            {restaurantName}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition">
              Início
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-primary transition">
              Cardápio
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition">
              Sobre
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition">
              Contato
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-primary"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-primary transition"
              onClick={toggleMenu}
            >
              Início
            </Link>
            <Link
              to="/menu"
              className="block py-2 text-gray-700 hover:text-primary transition"
              onClick={toggleMenu}
            >
              Cardápio
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-primary transition"
              onClick={toggleMenu}
            >
              Sobre
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-700 hover:text-primary transition"
              onClick={toggleMenu}
            >
              Contato
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
