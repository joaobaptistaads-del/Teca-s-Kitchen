import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { settingsService } from '../../services/settingsService';

const ContactSection = () => {
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
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Entre em Contato</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            {settings.restaurant_address && (
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-primary text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Endereço</h3>
                  <p className="text-gray-600">{settings.restaurant_address}</p>
                </div>
              </div>
            )}

            {settings.restaurant_phone && (
              <div className="flex items-start">
                <FaPhone className="text-primary text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Telefone</h3>
                  <p className="text-gray-600">{settings.restaurant_phone}</p>
                </div>
              </div>
            )}

            {settings.restaurant_email && (
              <div className="flex items-start">
                <FaEnvelope className="text-primary text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-gray-600">{settings.restaurant_email}</p>
                </div>
              </div>
            )}

            {settings.restaurant_hours && (
              <div className="flex items-start">
                <FaClock className="text-primary text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Horário de Funcionamento</h3>
                  <p className="text-gray-600 whitespace-pre-line">{settings.restaurant_hours}</p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="card">
            <h3 className="text-2xl font-bold mb-4">Envie uma Mensagem</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input type="text" className="input-field" placeholder="Seu nome" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="input-field" placeholder="seu@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mensagem</label>
                <textarea
                  className="input-field"
                  rows="4"
                  placeholder="Sua mensagem"
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
