'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { WordFrequency } from '@/types';

interface WordCloudChartProps {
  data: WordFrequency[];
  sentiment?: string;
}

const SENTIMENT_COLORS: Record<string, string> = {
  Positive: '#10b981',
  Negative: '#ef4444',
  Neutral: '#f59e0b',
  All: '#667eea',
};

export function WordCloudChart({ data, sentiment = 'All' }: WordCloudChartProps) {
  const topWords = data.slice(0, 15);
  const color = SENTIMENT_COLORS[sentiment] || SENTIMENT_COLORS.All;

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={topWords} layout="horizontal">
          <XAxis 
            dataKey="word" 
            type="category" 
            tick={{ fontSize: 10, angle: -45 }}
            interval={0}
          />
          <YAxis tick={{ fontSize: 11 }} width={40} />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => [`${value} kali`, 'Frekuensi']}
          />
          <Bar dataKey="count" name="Frekuensi" radius={[4, 4, 0, 0]}>
            {topWords.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={color} 
                fillOpacity={1 - (index * 0.04)} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}