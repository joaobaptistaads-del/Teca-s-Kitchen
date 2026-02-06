import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import { salesService } from '../../services/salesService';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await salesService.getAllSales();
      if (response.success) {
        setSales(response.data);
      }
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar title="Gestão de Vendas" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Histórico de Vendas</h2>

          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="card">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Data/Hora</th>
                    <th className="text-left py-3 px-4">Valor Total</th>
                    <th className="text-left py-3 px-4">Forma de Pagamento</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{formatDateTime(sale.created_at)}</td>
                      <td className="py-3 px-4 font-bold">{formatCurrency(sale.total_amount)}</td>
                      <td className="py-3 px-4">{sale.payment_method}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sales;
