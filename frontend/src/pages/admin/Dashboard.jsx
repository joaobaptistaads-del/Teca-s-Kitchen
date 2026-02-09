import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import Card from '../../components/admin/Card';
import { SalesChart, ProductsChart } from '../../components/admin/Chart';
import { FaMoneyBillWave, FaShoppingCart, FaChartLine, FaBox } from 'react-icons/fa';
import { salesService } from '../../services/salesService';
import { formatCurrency } from '../../utils/formatters';

const Dashboard = () => {
  const [stats, setStats] = useState({
    todaySales: 0,
    monthSales: 0,
    todayOrders: 0,
    averageTicket: 0
  });
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [todayStats, monthStats, topProds] = await Promise.all([
        salesService.getStats('today'),
        salesService.getStats('month'),
        salesService.getTopProducts(5)
      ]);

      if (todayStats.success) {
        setStats(prev => ({
          ...prev,
          todaySales: todayStats.data.total_sales,
          todayOrders: todayStats.data.sales_count,
          averageTicket: todayStats.data.average_ticket
        }));
      }

      if (monthStats.success) {
        setStats(prev => ({
          ...prev,
          monthSales: monthStats.data.total_sales
        }));
      }

      if (topProds.success) {
        setTopProducts(topProds.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock chart data
  const salesChartData = [
    { name: 'Seg', vendas: 4500 },
    { name: 'Ter', vendas: 3200 },
    { name: 'Qua', vendas: 5800 },
    { name: 'Qui', vendas: 4200 },
    { name: 'Sex', vendas: 7100 },
    { name: 'Sáb', vendas: 9500 },
    { name: 'Dom', vendas: 6800 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="md:ml-64">
        <Navbar />
        <main className="pt-20 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card
                  title="Vendas Hoje"
                  value={formatCurrency(stats.todaySales)}
                  icon={FaMoneyBillWave}
                  color="success"
                />
                <Card
                  title="Vendas do Mês"
                  value={formatCurrency(stats.monthSales)}
                  icon={FaChartLine}
                  color="primary"
                />
                <Card
                  title="Pedidos Hoje"
                  value={stats.todayOrders}
                  icon={FaShoppingCart}
                  color="info"
                />
                <Card
                  title="Ticket Médio"
                  value={formatCurrency(stats.averageTicket)}
                  icon={FaBox}
                  color="warning"
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Vendas da Semana
                  </h3>
                  <SalesChart data={salesChartData} />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Produtos Mais Vendidos
                  </h3>
                  <div className="space-y-4">
                    {topProducts.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="font-bold text-lg text-primary mr-3">
                            #{index + 1}
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">
                              {item.product?.name || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.total_quantity} vendas
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-primary">
                          {formatCurrency(item.total_revenue)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Atividade Recente
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50">
                    <div>
                      <p className="font-medium text-gray-800">Nova venda registrada</p>
                      <p className="text-sm text-gray-500">Há 5 minutos</p>
                    </div>
                    <span className="text-green-600 font-bold">+{formatCurrency(125.50)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50">
                    <div>
                      <p className="font-medium text-gray-800">Produto adicionado</p>
                      <p className="text-sm text-gray-500">Há 1 hora</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border-l-4 border-yellow-500 bg-yellow-50">
                    <div>
                      <p className="font-medium text-gray-800">Configurações atualizadas</p>
                      <p className="text-sm text-gray-500">Há 3 horas</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
