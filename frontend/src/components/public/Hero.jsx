import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920)',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Bem-vindo ao <span className="text-primary">Teca's Kitchen</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Uma experiência gastronômica única com os melhores sabores
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/menu" className="btn-primary text-lg">
            Ver Cardápio
          </Link>
          <Link to="/contact" className="btn-outline text-lg bg-white bg-opacity-10 backdrop-blur-sm">
            Fale Conosco
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
