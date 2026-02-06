import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Entre em Contato</h2>
          <p className="section-subtitle">
            Estamos prontos para atendê-lo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Phone */}
          <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
            <div className="inline-block p-4 bg-primary bg-opacity-10 rounded-full mb-4">
              <FaPhone className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Telefone</h3>
            <p className="text-gray-600">(11) 98765-4321</p>
          </div>

          {/* Email */}
          <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
            <div className="inline-block p-4 bg-primary bg-opacity-10 rounded-full mb-4">
              <FaEnvelope className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">E-mail</h3>
            <p className="text-gray-600">contato@tecaskitchen.com</p>
          </div>

          {/* Address */}
          <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
            <div className="inline-block p-4 bg-primary bg-opacity-10 rounded-full mb-4">
              <FaMapMarkerAlt className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Endereço</h3>
            <p className="text-gray-600">
              Rua das Flores, 123<br />
              Centro, São Paulo - SP
            </p>
          </div>

          {/* Hours */}
          <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
            <div className="inline-block p-4 bg-primary bg-opacity-10 rounded-full mb-4">
              <FaClock className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Horário</h3>
            <p className="text-gray-600">
              Seg - Sáb: 11h - 23h<br />
              Domingo: 11h - 17h
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0977!2d-46.6333!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjgiUyA0NsKwMzcnNTkuOSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Localização Teca's Kitchen"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
