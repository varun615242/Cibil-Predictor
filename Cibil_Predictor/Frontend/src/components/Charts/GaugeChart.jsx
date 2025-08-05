import React from 'react';
import { RadialBarChart, RadialBar, Legend } from 'recharts';

const GaugeChart = ({ score }) => {
  const data = [
    { name: 'CIBIL Score', value: score, fill: '#6B21A8' }
  ];

  return (
    <div className="flex flex-col items-center mb-6">
      <RadialBarChart
        width={250}
        height={250}
        innerRadius="70%"
        outerRadius="100%"
        barSize={20}
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar minAngle={15} background clockWise dataKey="value" />
      </RadialBarChart>
      <p className="text-xl font-semibold text-purple-700">{score} - Excellent</p>
    </div>
  );
};

export default GaugeChart;
