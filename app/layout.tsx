import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trenches HQ',
  description: 'P2P Gift Card Trading & Social Platform',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
