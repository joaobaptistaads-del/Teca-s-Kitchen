import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import Hero from '../components/public/Hero';
import MenuSection from '../components/public/MenuSection';
import ContactSection from '../components/public/ContactSection';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <MenuSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
