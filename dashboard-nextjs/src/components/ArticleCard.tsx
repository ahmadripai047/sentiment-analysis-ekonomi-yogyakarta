'use client';

import { SentimentData } from '@/types';
import { Calendar, Source, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface ArticleCardProps {
  article: SentimentData;
}

const SENTIMENT_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Positive: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  Negative: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
  },
  Neutral: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
};

export function ArticleCard({ article }: ArticleCardProps) {
  const style = SENTIMENT_STYLES[article.sentiment] || SENTIMENT_STYLES.Neutral;

  return (
    <div className={clsx(
      'rounded-xl border p-4 transition-all hover:shadow-md',
      style.bg,
      style.border
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 line-clamp-2">{article.title}</h4>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            {article.date && (
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(article.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            )}
            {article.source && (
              <span className="flex items-center gap-1">
                <Source size={14} />
                {article.source}
              </span>
            )}
          </div>
        </div>
        <span className={clsx(
          'rounded-full px-3 py-1 text-xs font-semibold',
          style.text,
          style.bg
        )}>
          {article.sentiment}
        </span>
      </div>
      {article.compound_score !== undefined && article.compound_score !== 0 && (
        <div className="mt-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Score:</span>
            <span className={clsx(
              'font-semibold',
              article.compound_score > 0 ? 'text-emerald-600' : 
              article.compound_score < 0 ? 'text-red-600' : 'text-amber-600'
            )}>
              {article.compound_score.toFixed(3)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}