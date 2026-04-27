import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sentiment Analysis Dashboard - Ekonomi Yogyakarta',
  description: 'Interactive dashboard for sentiment analysis of economic news in Yogyakarta',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}