import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6B21A8', '#FF8042', '#FFBB28', '#00C49F', '#FF6384'];

const AccountMixChart = ({ loans }) => {
  const mix = loans.reduce((acc, loan) => {
    acc[loan.Loan_Type] = (acc[loan.Loan_Type] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(mix).map(([name, value], i) => ({
    name,
    value,
    fill: COLORS[i % COLORS.length]
  }));

  return (
    <div className="flex justify-between items-center">
      <PieChart width={220} height={220}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
      <div>
        <h3 className="text-md font-bold">Account Mix</h3>
        {data.map((d, idx) => (
          <p key={idx} className="text-sm">
            <span style={{ color: d.fill }}>&#9679;</span> {d.name}: {d.value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AccountMixChart;
