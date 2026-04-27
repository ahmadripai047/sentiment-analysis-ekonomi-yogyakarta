'use client';

import { clsx } from 'clsx';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: number;
  gradient: string;
  subtitle?: string;
}

export function StatCard({ title, value, icon: Icon, trend, gradient, subtitle }: StatCardProps) {
  return (
    <div className={clsx(
      'rounded-2xl p-6 text-white shadow-lg transition-transform hover:scale-105',
      gradient
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="mt-2 text-4xl font-bold">{value}</p>
          {subtitle && <p className="mt-1 text-xs opacity-75">{subtitle}</p>}
          {trend !== undefined && (
            <div className="mt-2 flex items-center gap-1 text-sm">
              {trend > 0 ? (
                <>
                  <TrendingUp size={16} />
                  <span>+{trend}%</span>
                </>
              ) : trend < 0 ? (
                <>
                  <TrendingDown size={16} />
                  <span>{trend}%</span>
                </>
              ) : (
                <>
                  <Minus size={16} />
                  <span>0%</span>
                </>
              )}
            </div>
          )}
        </div>
        <div className="rounded-full bg-white/20 p-3">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}