"use client";

import ContainerWindow from '@/components/container/containerWindow';
import DraggableTool from '@/components/tool/draggableTool';
import ToolWindow, { Data } from '@/components/tool/toolWindow';
import { Category, TOOL_WINDOW_ID } from '@/data/constants';
import { TEST_DATA } from '@/data/testData';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { unique } from 'next/dist/build/utils';
import { createContext, useState, useReducer, useContext } from 'react';
import styled from 'styled-components';
import { CurrentInventory, CurrentInventoryAction, currentInventoryReducer, InventoryActions } from './inventoryReducer';
import { v4 } from 'uuid';
import ActionsHeader from '@/components/actionsHeader/actionsHeader';

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

interface CurrentInventoryContextType {
    currentInventory: CurrentInventory;
    currentInventoryDispatcher: React.Dispatch<CurrentInventoryAction>;
}

export const DroppedDataContext = createContext<DroppedDataContextType | undefined>(undefined);

export const CurrentInventoryContext = createContext<CurrentInventoryContextType | undefined>(undefined);

export const useCurrentInventoryState = () => {
    const context = useContext(CurrentInventoryContext);
    if (context === undefined) {
        throw new Error('useCurrentInventoryState must be used within a CountProvider');
    }
    return context;
};

export function createData(eventData: any) {
    const data: Data = {
        name: eventData.name,
        weight: eventData.weight,
        category: eventData.category,
        id: eventData.id,
    };
    return data;
}


function Inventory() {
    const [activeId, setActiveId] = useState<string>('')
    const [hoverContainerId, setHoverContainerId] = useState<string>('')
    const [droppableId, setDroppableId] = useState<string>('')
    const [droppedCount, setDroppedCount] = useState<number>(0)
    const [data, setData] = useState<Data>({id: "none", category: Category.ACCESSORIES, weight: 0, name: ''})
    const [currentInventory, currentInventoryDispatcher] = useReducer(currentInventoryReducer, {});

    function handleDragStart(event: DragStartEvent) {
        // TODO: This should be a constructor, and data should at this point be a class of its own
        const containerId = event.active.data.current?.containerId
        const data: Data | undefined = createData(event.active.data.current);
        if (containerId && containerId === TOOL_WINDOW_ID) { // create a new guy
            data.id = `${data.name}-${v4()}`
        }
        if (data === undefined) return
        setData(data);
        setHoverContainerId(containerId)
        setActiveId(String(event.active.id))
    }

    function handleDragEnd(event: DragEndEvent) {
        const data: Data | undefined = createData(event.active.data.current);
        if (!data || event.over === undefined || event.over === null) return
        if (event.over.data.current?.containerId === TOOL_WINDOW_ID) {
            return // do nothing
        }
        // need to check if it is over a container
        if (!(event.over.id in currentInventory)) return
        const newData: Data = {
            ...data,
            id: `${data.name}-${v4()}` // overwrite id
        }
        currentInventoryDispatcher({
            type: InventoryActions.ADD_TOOL,
            payload: {
                newTool: newData,
                containerId: String(event.over.id)
            }
        })
        setActiveId('')
        setHoverContainerId('')
    }

    function handleDragOver(event: DragOverEvent) {
        swapActiveToOver(event)
    }

    function swapActiveToOver(event: { active: any; over: any; }) {
        const { active, over } = event;
        if (active && over && active.data.current && over.data.current && active.id !== over.id) {
            if (over.data.current.containerId === TOOL_WINDOW_ID) return // do nothing
            currentInventoryDispatcher({
                type: InventoryActions.SPLICE,
                payload: {
                    toolId: active.data.current.id,
                    containerId: active.data.current.containerId,
                    overToolId: over.data.current.id,
                    overContainerId: over.data.current.containerId,
                }
            })
            currentInventoryDispatcher({
                type: InventoryActions.REPLACE_TOOL,
                payload: {
                    containerId: TOOL_WINDOW_ID,
                    toolId: active.data.current.id,
                    newTool: {
                        ...data,
                        id: v4()
                    }
                }
            })
        }
    }

    // console.log(currentInventory)

    return (
        <Page>
            <CurrentInventoryContext.Provider value={{ currentInventory, currentInventoryDispatcher }}>
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
                            <ActionsHeader />
                            <ContainerWindow />
                        </PackContainer>

                        <DragOverlay>
                            {activeId !== '' && data && <DraggableTool _data={data} ishovering={true} containerId={hoverContainerId} />}
                        </DragOverlay>
                    </DndContext>
                </DroppedDataContext.Provider>
            </CurrentInventoryContext.Provider>
        </Page>
    )
}


export default Inventory;
