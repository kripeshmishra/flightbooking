import React from 'react';
import type { Metadata } from 'next'
import '../../public/css/styles.css';
import Header from '@/components/Header';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import useDeviceDetect from '@/utilty/useDeviceDetect'
import MobileHeader from '@/components/mobile/MobileHeader';
import MobileFooter from '@/components/mobile/MobileFooter';
import BottomNav from '@/components/mobile/BottomNav';

export const metadata: Metadata = {
  title: "Fly States",
  description: "Fly States",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile: boolean = useDeviceDetect();

  return (
    <html lang="en">
      <ThemeRegistry>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          {
            isMobile && (
              <link rel="stylesheet" href="/css/mobile.css" />
            )
          }
        </head>
        <body className={isMobile ? 'mobilebody' : 'bg-lightgrey'}>
          {isMobile ? <MobileHeader /> : <Header />}
          {children}
          <Newsletter />
          {
            !isMobile && (
              <Footer />
            )
          }
          {isMobile && (
            <>
              <MobileFooter />
              <BottomNav />
            </>
          )}
        </body>
      </ThemeRegistry>
    </html>
  );
}
