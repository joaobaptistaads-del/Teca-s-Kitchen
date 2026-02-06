import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1
              className={`text-2xl font-bold ${
                isScrolled ? 'text-primary' : 'text-white'
              }`}
            >
              Teca's Kitchen
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium hover:text-primary transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`font-medium hover:text-primary transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Cardápio
            </Link>
            <Link
              to="/about"
              className={`font-medium hover:text-primary transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Sobre
            </Link>
            <Link
              to="/contact"
              className={`font-medium hover:text-primary transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Contato
            </Link>
            <Link
              to="/admin/login"
              className="btn-primary text-sm"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden text-2xl ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Cardápio
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <Link
              to="/admin/login"
              className="block px-4 py-2 text-primary font-medium hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
