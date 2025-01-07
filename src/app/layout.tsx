"use client";

import { useState, createContext, Dispatch, SetStateAction } from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '../components/sidebar/sidebar';
import Breadcrumb from '@/components/breadcrumb/breadcrumb';
import styled from 'styled-components';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { Data } from '@/components/tool/toolWindow';
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

interface DroppedDataContextType {
  data: Data | undefined;
  droppableId: number;
  droppedCount: number; // this can't be the right way to track when something is dropped
}

export const DroppedDataContext = createContext<DroppedDataContextType | undefined>(undefined);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeId, setActiveId] = useState<number>(-1)
  const [droppableId, setDroppableId] = useState<number>(-1)
  const [droppedCount, setDroppedCount] = useState<number>(0)
  const [data, setData] = useState<Data | undefined>(undefined)

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Inventory', path: '/inventory' },
    { label: 'Gear', path: '/inventory/gear' },
  ];

  // console.log(`this is data: ${data}`)

  function handleDragStart(event: DragStartEvent) {
    setData(event.active.data.current as Data);
    setActiveId(Number(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(-1)
    setDroppableId(Number(event.over?.id))
    setDroppedCount(droppedCount + 1)
    // console.log(event.active.data)
  }

  return (
    <html lang="en" style={{ height: '100%' }} suppressHydrationWarning>
      <body className={inter.className} style={{ height: '100%', margin: 0 }}>
        <PageWithHeader>
          <Header />
          <Page>
            <DroppedDataContext.Provider value={{ data, droppableId, droppedCount }}>
              <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <Content>{children}</Content>
                <DragOverlay>
                  {activeId > -1 && <Item>{data?.name} {data?.category} {data?.weight}</Item>}
                </DragOverlay>
              </DndContext>
            </DroppedDataContext.Provider>
          </Page>
        </PageWithHeader>
      </body>
    </html>
  )
}