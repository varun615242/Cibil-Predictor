// components/Charts/DebtPieChart.jsx
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#FF8042"];

const DebtPieChart = ({ open, closed }) => {
  const data = [
    { name: "Open Loans", value: open },
    { name: "Closed Loans", value: closed },
  ];

  return (
    <div className="w-full h-64 mb-6">
      <h3 className="text-center font-bold mb-2">Debt Profile</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DebtPieChart;
