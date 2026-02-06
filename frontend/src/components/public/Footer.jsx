import { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { settingsService } from '../../services/settingsService';

const Footer = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsService.getAllSettings();
        if (response.success) {
          setSettings(response.data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {settings.restaurant_name || 'Teca\'s Kitchen'}
            </h3>
            <p className="text-gray-400">
              {settings.restaurant_description || 'Restaurante especializado em culinária contemporânea'}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="text-gray-400 space-y-2">
              {settings.restaurant_address && (
                <p>{settings.restaurant_address}</p>
              )}
              {settings.restaurant_phone && (
                <p>Tel: {settings.restaurant_phone}</p>
              )}
              {settings.restaurant_email && (
                <p>Email: {settings.restaurant_email}</p>
              )}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              {settings.social_instagram && (
                <a
                  href={settings.social_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaInstagram size={24} />
                </a>
              )}
              {settings.social_facebook && (
                <a
                  href={settings.social_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaFacebook size={24} />
                </a>
              )}
              {settings.social_whatsapp && (
                <a
                  href={settings.social_whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaWhatsapp size={24} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings.restaurant_name || 'Teca\'s Kitchen'}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
