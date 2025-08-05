// components/Charts/EMIBarChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const EMIBarChart = ({ loans }) => {
  const data = loans.map((loan) => ({
    name: loan.Loan_Company,
    EMI: Math.round((loan.Loan_Amount_Approved - loan.Amount_Repaid) / loan.EMIs_Left || 1),
  }));

  return (
    <div className="w-full h-64 mb-6">
      <h3 className="text-center font-bold mb-2">Monthly EMI Burden</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="EMI" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EMIBarChart;
