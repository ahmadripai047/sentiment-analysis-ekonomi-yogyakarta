export interface SentimentData {
  title: string;
  date: string;
  source: string;
  content: string;
  cleaned_text: string;
  stemmed_text: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  compound_score: number;
}

export interface SentimentStats {
  total: number;
  positive: number;
  negative: number;
  neutral: number;
  positivePercent: number;
  negativePercent: number;
  neutralPercent: number;
}

export interface WordFrequency {
  word: string;
  count: number;
}

export interface SourceStats {
  source: string;
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

export interface TimelineData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}