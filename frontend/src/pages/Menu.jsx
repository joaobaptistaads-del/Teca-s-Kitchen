import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import MenuSection from '../components/public/MenuSection';

const Menu = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Nosso Cardápio</h1>
          <p className="text-xl">Descubra nossos pratos irresistíveis</p>
        </div>
      </section>

      <MenuSection />
      
      <Footer />
    </div>
  );
};

export default Menu;
