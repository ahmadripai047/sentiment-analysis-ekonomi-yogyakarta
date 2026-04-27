import { SentimentData, SentimentStats, WordFrequency, SourceStats, TimelineData } from '@/types';

const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQICRrjoFuVVAPIrUiRslJq-D6AhgLnSj8LcrsCTP-3Ld7R9KJ7QQE7VGSeK4WanLdpCl6Mo8wCAmZd/pub?output=csv';

export async function fetchData(): Promise<SentimentData[]> {
  try {
    const response = await fetch(GOOGLE_SHEETS_CSV_URL);
    const csvText = await response.text();
    const rows = csvText.split('\n').filter(row => row.trim());
    
    if (rows.length < 2) return [];
    
    const headers = rows[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    const data: SentimentData[] = [];
    
    for (let i = 1; i < rows.length; i++) {
      const values = parseCSVRow(rows[i]);
      if (values.length >= headers.length) {
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        
        data.push({
          title: row.title || row.Title || '',
          date: row.date || row.Date || row.publish_date || '',
          source: row.source || row.Source || '',
          content: row.content || row.Content || '',
          cleaned_text: row.cleaned_text || row.Cleaned_Text || row.text_clean || '',
          stemmed_text: row.stemmed_text || row.Stemmed_Text || row.text_stemmed || '',
          sentiment: normalizeSentiment(row.sentiment || row.Sentiment || ''),
          compound_score: parseFloat(row.compound_score || row.Compound_Score || row.compound || '0'),
        });
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function parseCSVRow(row: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

function normalizeSentiment(sentiment: string): 'Positive' | 'Negative' | 'Neutral' {
  const s = sentiment.toLowerCase().trim();
  if (s === 'positive' || s === 'positif') return 'Positive';
  if (s === 'negative' || s === 'negatif') return 'Negative';
  return 'Neutral';
}

export function calculateStats(data: SentimentData[]): SentimentStats {
  const total = data.length;
  const positive = data.filter(d => d.sentiment === 'Positive').length;
  const negative = data.filter(d => d.sentiment === 'Negative').length;
  const neutral = data.filter(d => d.sentiment === 'Neutral').length;
  
  return {
    total,
    positive,
    negative,
    neutral,
    positivePercent: total > 0 ? Math.round((positive / total) * 100) : 0,
    negativePercent: total > 0 ? Math.round((negative / total) * 100) : 0,
    neutralPercent: total > 0 ? Math.round((neutral / total) * 100) : 0,
  };
}

export function getWordFrequencies(data: SentimentData[], sentiment?: string): WordFrequency[] {
  const filteredData = sentiment 
    ? data.filter(d => d.sentiment === sentiment)
    : data;
  
  const text = filteredData
    .map(d => d.stemmed_text || d.cleaned_text || d.content)
    .join(' ')
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  const wordCounts: Record<string, number> = {};
  text.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  
  return Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 50);
}

export function getSourceStats(data: SentimentData[]): SourceStats[] {
  const sourceMap: Record<string, { positive: number; negative: number; neutral: number; total: number }> = {};
  
  data.forEach(item => {
    const source = item.source || 'Unknown';
    if (!sourceMap[source]) {
      sourceMap[source] = { positive: 0, negative: 0, neutral: 0, total: 0 };
    }
    sourceMap[source][item.sentiment.toLowerCase() as keyof typeof sourceMap[string]]++;
    sourceMap[source].total++;
  });
  
  return Object.entries(sourceMap)
    .map(([source, stats]) => ({ source, ...stats }))
    .sort((a, b) => b.total - a.total);
}

export function getTimelineData(data: SentimentData[]): TimelineData[] {
  const dateMap: Record<string, { positive: number; negative: number; neutral: number }> = {};
  
  data.forEach(item => {
    const date = item.date ? item.date.split('T')[0].split(' ')[0] : 'Unknown';
    if (!dateMap[date]) {
      dateMap[date] = { positive: 0, negative: 0, neutral: 0 };
    }
    dateMap[date][item.sentiment.toLowerCase() as keyof typeof dateMap[string]]++;
  });
  
  return Object.entries(dateMap)
    .map(([date, stats]) => ({ date, ...stats }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getRecentArticles(data: SentimentData[], limit: number = 10): SentimentData[] {
  return [...data]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}