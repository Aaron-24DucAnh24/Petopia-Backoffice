import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/general/Header';
import { Footer } from '@/components/general/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quản trị viên - Petopia',
  description: 'Nền tảng nhận nuôi thú cưng trực tuyến',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="mt-20 mx-1 md:mx-4">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
