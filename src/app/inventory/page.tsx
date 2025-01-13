"use client";

import ContainerWindow from '@/components/container/containerWindow';
import DraggableTool from '@/components/tool/draggableTool';
import ToolWindow, { Data } from '@/components/tool/toolWindow';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { createContext, useState } from 'react';
import styled from 'styled-components';

const ToolContainer = styled.div`
    width: 25%;
    /* margin-top: auto; */
    /* flex-grow: 0; */
`

const PackContainer = styled.div`
    width: 25%;
`

const Page = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100vh - 40px);
`


interface DroppedDataContextType {
    data: Data | undefined;
    droppableId: string;
    droppedCount: number; // this can't be the right way to track when something is dropped
}

export const DroppedDataContext = createContext<DroppedDataContextType | undefined>(undefined);

function Inventory() {

    const [activeId, setActiveId] = useState<string>('')
    const [droppableId, setDroppableId] = useState<string>('')
    const [droppedCount, setDroppedCount] = useState<number>(0)
    const [data, setData] = useState<Data | undefined>(undefined)

    function createData(eventData: any) {
        const data: Data = {
            name: eventData.name,
            weight: eventData.weight,
            category: eventData.category,
            id: eventData.id,
        };
        return data;
    }

    function handleDragStart(event: DragStartEvent) {
        // TODO: This should be a constructor, and data should at this point be a class of its own
        const data: Data | undefined = createData(event.active.data.current);
        if (data === undefined) return
        setData(data);
        setActiveId(String(event.active.id))
    }

    function handleDragEnd(event: DragEndEvent) {
        setActiveId('')
        setDroppableId(String(event.over?.id))
        setDroppedCount(droppedCount + 1)

        swapActiveToOver(event)
    }

    function handleDragOver(event: DragOverEvent) {
        console.log(event)
        swapActiveToOver(event)
    }

    function swapActiveToOver(event: { active: any; over: any; }) {
        // CAVEAT you only get the id's in sortable.items, NOT the element itself


        // TODO: I have to have a data object in context that is always up to date with the most recent state of all data objects
        // Then I can simply slice the active element inside the over container


        const { active, over } = event;
        if (active && over && active.data.current && active.id !== over.id) {
            const setItems: React.Dispatch<React.SetStateAction<Data[]>> = active.data.current.setTools
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                if (oldIndex === -1 || newIndex == -1) {
                    // different containers
                    const data = createData(event.active.data.current)
                    const newArr = [
                        ...items.slice(0, oldIndex),
                        createData(active),
                        ...items.slice(0, oldIndex),
                    ]
                    return items
                }
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <Page>
            <DroppedDataContext.Provider value={{ data, droppableId, droppedCount }}>
                <DndContext
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                >
                    <ToolContainer>
                        <ToolWindow />
                    </ToolContainer>
                    <PackContainer>
                        <ContainerWindow />
                    </PackContainer>

                    <DragOverlay>
                        {activeId !== '' && data && <DraggableTool _data={data} hoveredRow={''} setHoveredRow={(id: string) => { }} deleteClick={(id: string) => { }} />}
                    </DragOverlay>
                </DndContext>
            </DroppedDataContext.Provider>
        </Page>
    )
}


export default Inventory;
