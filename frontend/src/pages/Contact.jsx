import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import ContactSection from '../components/public/ContactSection';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contato</h1>
          <p className="text-xl">Entre em contato conosco</p>
        </div>
      </section>

      <ContactSection />
      
      <Footer />
    </div>
  );
};

export default Contact;
