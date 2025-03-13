import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from './components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'InsureCo - Protecting What Matters Most',
  description: 'Comprehensive insurance solutions for cars, trucks, and health coverage.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
} 