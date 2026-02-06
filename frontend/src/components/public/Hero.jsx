import { useState, useEffect } from 'react';
import { settingsService } from '../../services/settingsService';

const Hero = () => {
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
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {settings.restaurant_name || 'Teca\'s Kitchen'}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {settings.restaurant_description || 'Culinária contemporânea com ingredientes selecionados'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#menu" className="btn-primary bg-white text-primary hover:bg-gray-100">
              Ver Cardápio
            </a>
            <a href="#contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              Faça uma Reserva
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
