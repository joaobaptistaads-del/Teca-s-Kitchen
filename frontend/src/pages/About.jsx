import { useState, useEffect } from 'react';
import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import { settingsService } from '../services/settingsService';

const About = () => {
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-primary-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">Sobre Nós</h1>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="card">
              <h2 className="text-3xl font-bold mb-6">
                {settings.restaurant_name || 'Teca\'s Kitchen'}
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                {settings.restaurant_description ||
                  'Restaurante especializado em culinária contemporânea com ingredientes selecionados e ambiente acolhedor.'}
              </p>
              <p className="text-gray-600">
                Nossa missão é proporcionar uma experiência gastronômica única, 
                combinando sabores tradicionais com técnicas modernas. Cada prato 
                é cuidadosamente preparado com ingredientes frescos e de alta qualidade.
              </p>
              <p className="text-gray-600 mt-4">
                Venha nos visitar e descubra porque somos uma das melhores opções 
                da região para quem busca uma refeição especial.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
