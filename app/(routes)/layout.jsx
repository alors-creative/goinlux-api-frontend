import { Montserrat } from 'next/font/google';
import '@/app/_styles/globals.scss';
import Sidebar from '@/app/_components/sidebar/Sidebar';
import styles from '@/app/(routes)/layout.module.scss';

export const dynamic = 'force-dynamic';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'GoinLux API Frontend',
  description: 'Create villas and amenities for the GoinLux API',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/uge8arq.css" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={montserrat.className}>
        <main className={styles.main}>
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
