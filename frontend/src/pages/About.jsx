import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import { FaAward, FaHeart, FaUsers } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Sobre Nós</h1>
          <p className="text-xl">Conheça nossa história e valores</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Nossa História</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              O Teca's Kitchen nasceu há mais de uma década do sonho de criar um espaço onde 
              as pessoas pudessem desfrutar de comida excepcional em um ambiente acolhedor. 
              Fundado por Teca, uma apaixonada pela culinária desde criança, nosso restaurante 
              se tornou um marco na região.
            </p>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Começamos como um pequeno restaurante familiar e crescemos através do amor 
              pela gastronomia e do compromisso com a qualidade. Hoje, servimos centenas 
              de clientes semanalmente, mantendo a mesma dedicação e carinho de sempre.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nossa missão é proporcionar experiências gastronômicas memoráveis, utilizando 
              ingredientes frescos e locais sempre que possível, preparados com técnicas 
              tradicionais e um toque de inovação.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="inline-block p-6 bg-primary bg-opacity-10 rounded-full mb-4">
                <FaAward className="text-5xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Qualidade</h3>
              <p className="text-gray-600">
                Comprometidos com a excelência em cada prato, utilizando apenas 
                ingredientes selecionados e de primeira qualidade.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="inline-block p-6 bg-primary bg-opacity-10 rounded-full mb-4">
                <FaHeart className="text-5xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Paixão</h3>
              <p className="text-gray-600">
                Cada receita é preparada com amor e dedicação, transformando 
                refeições em experiências memoráveis.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="inline-block p-6 bg-primary bg-opacity-10 rounded-full mb-4">
                <FaUsers className="text-5xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Comunidade</h3>
              <p className="text-gray-600">
                Valorizamos as relações com nossos clientes e fornecedores locais, 
                construindo uma comunidade forte e unida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Nossa Equipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
                  alt="Teca"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Teca Silva</h3>
              <p className="text-primary font-medium mb-2">Chef & Fundadora</p>
              <p className="text-gray-600">
                30 anos de experiência em gastronomia internacional
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
                  alt="Chef"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">João Santos</h3>
              <p className="text-primary font-medium mb-2">Sous Chef</p>
              <p className="text-gray-600">
                Especialista em culinária contemporânea
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400"
                  alt="Manager"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Maria Costa</h3>
              <p className="text-primary font-medium mb-2">Gerente</p>
              <p className="text-gray-600">
                Garantindo a melhor experiência para nossos clientes
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
