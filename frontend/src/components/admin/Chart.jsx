import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const SalesChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="vendas" stroke="#D4AF37" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const ProductsChart = ({ data }) => {
  const COLORS = ['#D4AF37', '#E67E22', '#3498DB', '#E74C3C', '#2ECC71'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantidade" fill="#D4AF37" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const CategoryChart = ({ data }) => {
  const COLORS = ['#D4AF37', '#E67E22', '#3498DB', '#E74C3C', '#2ECC71'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

const Chart = { SalesChart, ProductsChart, CategoryChart };

export default Chart;
