import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import { financeService } from '../../services/financeService';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';

const Finance = () => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [expensesRes, summaryRes] = await Promise.all([
        financeService.getAllExpenses(),
        financeService.getFinancialSummary(),
      ]);

      if (expensesRes.success) setExpenses(expensesRes.data);
      if (summaryRes.success) setSummary(summaryRes.data);
    } catch (error) {
      console.error('Error fetching finance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await financeService.createExpense(formData);
      toast.success('Despesa registrada com sucesso!');
      setShowModal(false);
      setFormData({
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
      });
      fetchData();
    } catch (error) {
      toast.error('Erro ao registrar despesa');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar title="Gestão Financeira" />
        <div className="p-6">
          {/* Financial Summary */}
          {summary && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card">
                <p className="text-gray-600 text-sm mb-2">Receitas</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(summary.totalRevenue)}
                </p>
              </div>
              <div className="card">
                <p className="text-gray-600 text-sm mb-2">Despesas</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(summary.totalExpenses)}
                </p>
              </div>
              <div className="card">
                <p className="text-gray-600 text-sm mb-2">Lucro Líquido</p>
                <p className={`text-2xl font-bold ${summary.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(summary.netProfit)}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Despesas</h2>
            <button onClick={() => setShowModal(true)} className="btn-primary flex items-center">
              <FaPlus className="mr-2" /> Nova Despesa
            </button>
          </div>

          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="card">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Data</th>
                    <th className="text-left py-3 px-4">Descrição</th>
                    <th className="text-left py-3 px-4">Categoria</th>
                    <th className="text-right py-3 px-4">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{formatDate(expense.date)}</td>
                      <td className="py-3 px-4">{expense.description}</td>
                      <td className="py-3 px-4">{expense.category}</td>
                      <td className="py-3 px-4 text-right font-bold text-red-600">
                        {formatCurrency(expense.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h3 className="text-2xl font-bold mb-4">Nova Despesa</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Descrição</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Valor</label>
                    <input
                      type="number"
                      step="0.01"
                      className="input-field"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Categoria</label>
                    <select
                      className="input-field"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="Fornecedores">Fornecedores</option>
                      <option value="Contas">Contas</option>
                      <option value="Salários">Salários</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Data</label>
                    <input
                      type="date"
                      className="input-field"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Finance;
