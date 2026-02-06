import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import Hero from '../components/public/Hero';
import MenuSection from '../components/public/MenuSection';
import ContactSection from '../components/public/ContactSection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      {/* About Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">Sobre o Teca's Kitchen</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Há mais de 10 anos trazendo o melhor da gastronomia para você. 
                Nossa paixão é criar experiências únicas através de sabores inesquecíveis.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Cada prato é preparado com ingredientes selecionados e muito carinho, 
                garantindo qualidade e sabor em cada refeição.
              </p>
              <a href="/about" className="btn-primary inline-block">
                Saiba Mais
              </a>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
                alt="Restaurant interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <MenuSection />

      {/* Contact */}
      <ContactSection />
      
      <Footer />
    </div>
  );
};

export default Home;
