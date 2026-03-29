import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const performanceData = [
  { month: "Oct", dispensed: 4500000, collected: 3800000 },
  { month: "Nov", dispensed: 5200000, collected: 4100000 },
  { month: "Dec", dispensed: 4800000, collected: 4500000 },
  { month: "Jan", dispensed: 6100000, collected: 5200000 },
  { month: "Feb", dispensed: 5500000, collected: 5800000 },
  { month: "Mar", dispensed: 7200000, collected: 6400000 },
];

const portfolioData = [
  { name: "Active", value: 65, color: "#3b82f6" }, 
  { name: "Arrears", value: 15, color: "#f59e0b" }, 
  { name: "Default", value: 5, color: "#ef4444" }, 
  { name: "Paid Off", value: 15, color: "#10b981" },
];

export const LoanVolumeChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart 
          data={performanceData} 
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
            tickFormatter={(value: number) => `${value / 1000000}M`}
          />
          <Tooltip 
            cursor={{ fill: 'var(--bg-tertiary)', opacity: 0.4 }}
            contentStyle={{ 
              backgroundColor: "var(--bg-secondary)", 
              borderColor: "var(--border-color)", 
              borderRadius: "8px",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)"
            }}
          />
          <Bar
            dataKey="dispensed"
            fill="var(--accent-primary)"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
          <Bar
            dataKey="collected"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PortfolioDonutChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={portfolioData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={8}
            dataKey="value"
          >
            {portfolioData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--bg-secondary)", 
              borderColor: "var(--border-color)", 
              borderRadius: "8px",
              color: "var(--text-primary)"
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value: string) => <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
