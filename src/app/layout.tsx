import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Header } from './components/header';
import './styles.scss';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CyprisLite',
  description: 'R&D insights platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
