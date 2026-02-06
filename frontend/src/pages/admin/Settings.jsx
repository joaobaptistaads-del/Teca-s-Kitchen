import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import { settingsService } from '../../services/settingsService';
import { toast } from 'react-toastify';

const Settings = () => {
  const [settings, setSettings] = useState({
    restaurant_name: '',
    restaurant_description: '',
    restaurant_address: '',
    restaurant_phone: '',
    restaurant_email: '',
    restaurant_hours: '',
    social_instagram: '',
    social_facebook: '',
    social_whatsapp: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsService.getAllSettings();
      if (response.success) {
        setSettings({ ...settings, ...response.data });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await settingsService.updateMultipleSettings(settings);
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar configurações');
    }
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Navbar title="Configurações" />
          <div className="p-6">
            <p>Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar title="Configurações" />
        <div className="p-6">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Configurações do Site</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Restaurant Info */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Informações do Restaurante</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome do Restaurante</label>
                    <input
                      type="text"
                      className="input-field"
                      value={settings.restaurant_name}
                      onChange={(e) => handleChange('restaurant_name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Descrição</label>
                    <textarea
                      className="input-field"
                      rows="3"
                      value={settings.restaurant_description}
                      onChange={(e) => handleChange('restaurant_description', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Endereço</label>
                    <input
                      type="text"
                      className="input-field"
                      value={settings.restaurant_address}
                      onChange={(e) => handleChange('restaurant_address', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Telefone</label>
                      <input
                        type="text"
                        className="input-field"
                        value={settings.restaurant_phone}
                        onChange={(e) => handleChange('restaurant_phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        className="input-field"
                        value={settings.restaurant_email}
                        onChange={(e) => handleChange('restaurant_email', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Horário de Funcionamento</label>
                    <textarea
                      className="input-field"
                      rows="2"
                      value={settings.restaurant_hours}
                      onChange={(e) => handleChange('restaurant_hours', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Instagram</label>
                    <input
                      type="url"
                      className="input-field"
                      placeholder="https://instagram.com/seu-perfil"
                      value={settings.social_instagram}
                      onChange={(e) => handleChange('social_instagram', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Facebook</label>
                    <input
                      type="url"
                      className="input-field"
                      placeholder="https://facebook.com/sua-pagina"
                      value={settings.social_facebook}
                      onChange={(e) => handleChange('social_facebook', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">WhatsApp</label>
                    <input
                      type="url"
                      className="input-field"
                      placeholder="https://wa.me/5511999999999"
                      value={settings.social_whatsapp}
                      onChange={(e) => handleChange('social_whatsapp', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Salvar Configurações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
