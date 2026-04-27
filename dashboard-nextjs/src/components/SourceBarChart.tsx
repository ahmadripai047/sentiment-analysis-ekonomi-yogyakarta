'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SourceStats } from '@/types';

interface SourceBarChartProps {
  data: SourceStats[];
}

export function SourceBarChart({ data }: SourceBarChartProps) {
  const topSources = data.slice(0, 8);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={topSources} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis 
            dataKey="source" 
            type="category" 
            tick={{ fontSize: 11 }} 
            width={100}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend />
          <Bar dataKey="positive" name="Positive" fill="#10b981" stackId="a" radius={[0, 0, 0, 0]} />
          <Bar dataKey="neutral" name="Neutral" fill="#f59e0b" stackId="a" radius={[0, 0, 0, 0]} />
          <Bar dataKey="negative" name="Negative" fill="#ef4444" stackId="a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}