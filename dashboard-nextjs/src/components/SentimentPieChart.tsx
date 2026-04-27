'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { SentimentStats } from '@/types';

const COLORS = ['#10b981', '#ef4444', '#f59e0b'];

interface SentimentPieChartProps {
  stats: SentimentStats;
}

export function SentimentPieChart({ stats }: SentimentPieChartProps) {
  const data = [
    { name: 'Positive', value: stats.positive, percent: stats.positivePercent },
    { name: 'Negative', value: stats.negative, percent: stats.negativePercent },
    { name: 'Neutral', value: stats.neutral, percent: stats.neutralPercent },
  ];

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${percent}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number, name: string) => [`${value} articles`, name]}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span style={{ color: '#374151' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}