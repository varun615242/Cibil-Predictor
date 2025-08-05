// components/Charts/LoanTypePieChart.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F", "#AA66CC"];

const LoanTypePieChart = ({ loans }) => {
  const typeMap = {};
  loans.forEach((loan) => {
    typeMap[loan.Loan_Type] = (typeMap[loan.Loan_Type] || 0) + 1;
  });

  const data = Object.entries(typeMap).map(([name, value]) => ({ name, value }));

  return (
    <div className="w-full h-64 mb-6">
      <h3 className="text-center font-bold mb-2">Loan Type Distribution</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80} label>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoanTypePieChart;
