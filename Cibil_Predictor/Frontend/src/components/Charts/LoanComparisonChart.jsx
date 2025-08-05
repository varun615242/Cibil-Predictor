// components/Charts/LoanComparisonChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const LoanComparisonChart = ({ loans }) => {
  const data = loans.map((loan) => ({
    name: loan.Loan_Company,
    Approved: loan.Loan_Amount_Approved,
    Repaid: loan.Amount_Repaid,
  }));

  return (
    <div className="w-full h-64 mb-6">
      <h3 className="text-center font-bold mb-2">Loan Comparison</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Approved" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Repaid" stackId="a" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoanComparisonChart;
