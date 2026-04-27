'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, TrendingUp, TrendingDown, Minus, 
  BarChart3, WordCloud, Clock, Newspaper, RefreshCw, Loader2
} from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { SentimentPieChart } from '@/components/SentimentPieChart';
import { SourceBarChart } from '@/components/SourceBarChart';
import { WordCloudChart } from '@/components/WordCloudChart';
import { TimelineChart } from '@/components/TimelineChart';
import { ArticleCard } from '@/components/ArticleCard';
import { 
  fetchData, 
  calculateStats, 
  getWordFrequencies, 
  getSourceStats, 
  getTimelineData,
  getRecentArticles 
} from '@/utils/data';
import { SentimentData, SentimentStats, WordFrequency, SourceStats, TimelineData } from '@/types';
import { clsx } from 'clsx';

type TabType = 'overview' | 'sources' | 'words' | 'timeline' | 'articles';

const TABS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'sources', label: 'Sumber Berita', icon: Newspaper },
  { id: 'words', label: 'Word Cloud', icon: WordCloud },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'articles', label: 'Artikel', icon: MessageSquare },
] as const;

export default function Dashboard() {
  const [data, setData] = useState<SentimentData[]>([]);
  const [stats, setStats] = useState<SentimentStats | null>(null);
  const [wordFreq, setWordFreq] = useState<WordFrequency[]>([]);
  const [sourceStats, setSourceStats] = useState<SourceStats[]>([]);
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);
  const [recentArticles, setRecentArticles] = useState<SentimentData[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSentiment, setSelectedSentiment] = useState<string>('All');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const fetchedData = await fetchData();
      if (fetchedData.length === 0) {
        setError('Tidak ada data. Pastikan Google Sheet di-publish.');
      } else {
        setData(fetchedData);
        setStats(calculateStats(fetchedData));
        setWordFreq(getWordFrequencies(fetchedData));
        setSourceStats(getSourceStats(fetchedData));
        setTimelineData(getTimelineData(fetchedData));
        setRecentArticles(getRecentArticles(fetchedData, 15));
      }
    } catch (err) {
      setError('Gagal memuat data. Periksa koneksi internet.');
    } finally {
      setLoading(false);
    }
  }

  const filteredWordFreq = selectedSentiment === 'All' 
    ? wordFreq 
    : getWordFrequencies(data, selectedSentiment);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary-600" />
          <p className="mt-4 text-lg font-medium text-gray-700">Memuat Dashboard...</p>
          <p className="text-sm text-gray-500">Mengambil data dari Google Sheets</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 rounded-full bg-red-100 p-4">
            <TrendingDown className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={loadData}
            className="mt-4 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="gradient-bg text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">📊 Sentiment Analysis Dashboard</h1>
              <p className="mt-1 text-lg opacity-90">Analisis Sentiment Berita Ekonomi Yogyakarta</p>
            </div>
            <button
              onClick={loadData}
              className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium hover:bg-white/30"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={clsx(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'gradient-bg text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && stats && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Articles"
                value={stats.total.toLocaleString()}
                icon={MessageSquare}
                gradient="gradient-bg"
                subtitle="dari Google Sheets"
              />
              <StatCard
                title="Positive"
                value={stats.positive.toLocaleString()}
                icon={TrendingUp}
                gradient="card-gradient-positive"
                subtitle={`${stats.positivePercent}% dari total`}
              />
              <StatCard
                title="Negative"
                value={stats.negative.toLocaleString()}
                icon={TrendingDown}
                gradient="card-gradient-negative"
                subtitle={`${stats.negativePercent}% dari total`}
              />
              <StatCard
                title="Neutral"
                value={stats.neutral.toLocaleString()}
                icon={Minus}
                gradient="card-gradient-neutral"
                subtitle={`${stats.neutralPercent}% dari total`}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Distribusi Sentiment</h3>
                <SentimentPieChart stats={stats} />
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Sumber Berita</h3>
                <SourceBarChart data={sourceStats} />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Word Frequency (All)</h3>
              <WordCloudChart data={wordFreq} sentiment="All" />
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Sentiment per Sumber Berita</h3>
              <SourceBarChart data={sourceStats} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sourceStats.slice(0, 9).map((source) => (
                <div key={source.source} className="rounded-xl border p-4 hover:shadow-md">
                  <h4 className="font-medium text-gray-900 truncate">{source.source}</h4>
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <span className="text-emerald-600">↑ {source.positive}</span>
                    <span className="text-red-600">↓ {source.negative}</span>
                    <span className="text-amber-600">→ {source.neutral}</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                    <div className="flex h-full rounded-full">
                      <div 
                        className="bg-emerald-500" 
                        style={{ width: `${(source.positive / source.total) * 100}%` }} 
                      />
                      <div 
                        className="bg-amber-500" 
                        style={{ width: `${(source.neutral / source.total) * 100}%` }} 
                      />
                      <div 
                        className="bg-red-500" 
                        style={{ width: `${(source.negative / source.total) * 100}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'words' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex gap-2">
              {['All', 'Positive', 'Negative', 'Neutral'].map((sentiment) => (
                <button
                  key={sentiment}
                  onClick={() => setSelectedSentiment(sentiment)}
                  className={clsx(
                    'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                    selectedSentiment === sentiment
                      ? sentiment === 'Positive' ? 'bg-emerald-500 text-white'
                        : sentiment === 'Negative' ? 'bg-red-500 text-white'
                        : sentiment === 'Neutral' ? 'bg-amber-500 text-white'
                        : 'gradient-bg text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  {sentiment}
                </button>
              ))}
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Kata Paling Sering Muncul {selectedSentiment !== 'All' ? `(${selectedSentiment})` : ''}
              </h3>
              <WordCloudChart data={filteredWordFreq} sentiment={selectedSentiment} />
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Tren Sentiment Over Time</h3>
              <TimelineChart data={timelineData} />
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900">Artikel Terbaru</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {recentArticles.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 border-t bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-600">
          <p>Sentiment Analysis Dashboard - Ekonomi Yogyakarta</p>
          <p className="mt-1">Built with Next.js + Tailwind CSS + Recharts</p>
        </div>
      </footer>
    </div>
  );
}