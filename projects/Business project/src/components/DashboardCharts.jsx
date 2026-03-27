import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const COLORS = ['#f97316', '#22c55e', '#6366f1']

export const DashboardCharts = ({ recordData }) => {
  const chartData = recordData.map((item) => ({
    date: item.date,
    income: Number(item.cash) + Number(item.card),
    expenses: Number(item.out) + Number(item.electricity),
    profit:
      Number(item.cash) +
      Number(item.card) -
      Number(item.out) -
      Number(item.electricity),
  }))

  const summaryData = [
    {
      name: 'Income',
      value: chartData.reduce((a, b) => a + b.income, 0),
    },
    {
      name: 'Expenses',
      value: chartData.reduce((a, b) => a + b.expenses, 0),
    },
    {
      name: 'Profit',
      value: chartData.reduce((a, b) => a + b.profit, 0),
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-10">
      
      {/* LINE CHART */}
      <div className="bg-white/25 text-white p-4 rounded-xl shadow-md lg:col-span-2">
        <h3 className="font-semibold mb-4">Income vs Expenses</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART */}
      <div className="bg-white/25 p-4 rounded-xl shadow-md">
        <h3 className="font-semibold mb-4">Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={summaryData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
            >
              {summaryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="bg-white/25 p-4 rounded-xl shadow-md lg:col-span-3">
        <h3 className="font-semibold mb-4">Daily Profit</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="profit" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
