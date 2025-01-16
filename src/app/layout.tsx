"use client";

import { Inter } from 'next/font/google'
import './globals.css'
import styled from 'styled-components';
import Header from '@/components/header/header';

const inter = Inter({ subsets: ['latin'] })

const Content = styled.div`
  width: 100%;
`;

const PageWithHeader = styled.div`
  display: flex;
  flex-direction: column;
`

const Page = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`

const Item = styled.div`
  width: 250px;
  height: 40px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  background-color: #ffffff;
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" style={{ height: '100%' }} suppressHydrationWarning>
      <body className={inter.className} style={{ height: '100%', margin: 0 }}>
        <PageWithHeader>
          <Header />
          <Page>
            <Content>{children}</Content>
          </Page>
        </PageWithHeader>
      </body>
    </html>
  )
}

