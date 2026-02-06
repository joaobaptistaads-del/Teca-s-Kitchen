import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import MenuSection from '../components/public/MenuSection';

const Menu = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-primary-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">Cardápio Completo</h1>
          </div>
        </div>
        <MenuSection />
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
