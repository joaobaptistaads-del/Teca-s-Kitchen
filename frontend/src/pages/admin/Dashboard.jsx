import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import Card from '../../components/admin/Card';
import { FaDollarSign, FaShoppingCart, FaChartLine, FaBoxOpen } from 'react-icons/fa';
import { salesService } from '../../services/salesService';
import { financeService } from '../../services/financeService';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    todaySales: 0,
    monthSales: 0,
    todayOrders: 0,
    averageTicket: 0,
  });
  const [topProducts, setTopProducts] = useState([]);
  const [financialSummary, setFinancialSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [todayStats, monthStats, topProds, financial] = await Promise.all([
        salesService.getSalesStats('today'),
        salesService.getSalesStats('month'),
        salesService.getTopProducts(5),
        financeService.getFinancialSummary(),
      ]);

      if (todayStats.success) {
        setStats((prev) => ({
          ...prev,
          todaySales: todayStats.data.totalSales,
          todayOrders: todayStats.data.totalOrders,
          averageTicket: todayStats.data.averageTicket,
        }));
      }

      if (monthStats.success) {
        setStats((prev) => ({
          ...prev,
          monthSales: monthStats.data.totalSales,
        }));
      }

      if (topProds.success) {
        setTopProducts(topProds.data);
      }

      if (financial.success) {
        setFinancialSummary(financial.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Navbar title="Dashboard" />
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
        <Navbar title="Dashboard" />
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card
              title="Vendas Hoje"
              value={formatCurrency(stats.todaySales)}
              icon={FaDollarSign}
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
              value={formatNumber(stats.todayOrders)}
              icon={FaShoppingCart}
              color="info"
            />
            <Card
              title="Ticket Médio"
              value={formatCurrency(stats.averageTicket)}
              icon={FaDollarSign}
              color="warning"
            />
          </div>

          {/* Charts and Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Summary */}
            {financialSummary && (
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Resumo Financeiro</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Receitas:</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(financialSummary.totalRevenue)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Despesas:</span>
                    <span className="font-bold text-red-600">
                      {formatCurrency(financialSummary.totalExpenses)}
                    </span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-gray-800 font-bold">Lucro Líquido:</span>
                    <span className={`font-bold text-xl ${financialSummary.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(financialSummary.netProfit)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Top Products */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Produtos Mais Vendidos</h3>
              <div className="space-y-3">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                        {index + 1}
                      </span>
                      <span className="font-medium">{product.name}</span>
                    </div>
                    <span className="text-gray-600">
                      {formatNumber(product.totalQuantity)} un.
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
