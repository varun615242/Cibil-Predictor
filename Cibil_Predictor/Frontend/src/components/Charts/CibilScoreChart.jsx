import React from "react";
import { PieChart, Pie, Cell } from "recharts";

// Score segments: total angle coverage = 180°
const ranges = [
  { label: "Poor", value: 250, color: "#e74c3c" },       // 300–550
  { label: "Average", value: 100, color: "#f39c12" },    // 550–650
  { label: "Good", value: 100, color: "#2ecc71" },       // 650–750
  { label: "Excellent", value: 150, color: "#27ae60" },  // 750–900
];

// Function to convert score to angle for the needle
const getNeedleCoords = (score, cx, cy, radius) => {
  const min = 300;
  const max = 900;
  const clamped = Math.max(min, Math.min(score, max));
  const angle = 180 - ((clamped - min) / (max - min)) * 180;
  const radian = (Math.PI * angle) / 180;

  const x = cx + radius * Math.cos(radian);
  const y = cy - radius * Math.sin(radian);
  return { x, y };
};

const CibilScoreGauge = ({ score }) => {
  const cx = 150; // center x
  const cy = 150; // center y
  const radius = 80; // needle length

  const { x, y } = getNeedleCoords(score, cx, cy, radius);

  return (
    <div className="w-full flex justify-center relative">
      <PieChart width={300} height={180}>
        <Pie
          data={ranges}
          startAngle={180}
          endAngle={0}
          cx={cx}
          cy={cy}
          innerRadius={70}
          outerRadius={100}
          dataKey="value"
        >
          {ranges.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>

        {/* Needle */}
        <g>
          <circle cx={cx} cy={cy} r={6} fill="#000" />
          <line
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="#000"
            strokeWidth={4}
          />
        </g>
      </PieChart>

      {/* Score label below */}
      <div className="absolute bottom-0 text-blue font-bold text-xl">
        CIBIL Score: <span className="text-yellow-300">{score}</span>
      </div>
    </div>
  );
};

export default CibilScoreGauge;
