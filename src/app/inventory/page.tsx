"use client";

import ContainerWindow from '@/components/container/containerWindow';
import DraggableTool from '@/components/tool/draggableTool';
import ToolWindow, { Data } from '@/components/tool/toolWindow';
import { Category, TOOL_WINDOW_ID } from '@/data/constants';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState, useReducer } from 'react';
import styled from 'styled-components';
import { createData, currentInventoryReducer, InventoryActions } from './inventoryReducer';
import { v4 } from 'uuid';
import ActionsHeader from '@/components/actionsHeader/actionsHeader';
import { CurrentInventoryContext, DroppedDataContext } from './CurrentInventoryContext';
import { CurrentClicked, CurrentClickedContext, useCurrentClickedState } from './CurrentClickedContext';

const ToolContainer = styled.div`
    width: 25%;
    /* margin-top: auto; */
    /* flex-grow: 0; */
`

const PackContainer = styled.div`
    width: 60%;
`

const Page = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100vh - 40px);
`

function Inventory() {
    const [activeId, setActiveId] = useState<string>('')
    const [hoverContainerId, setHoverContainerId] = useState<string>('')
    const [droppableId, setDroppableId] = useState<string>('')
    const [droppedCount, setDroppedCount] = useState<number>(0)
    const [data, setData] = useState<Data>({ id: "this_is_empty", category: Category.ACCESSORIES, weight: 0, name: '' })
    const [currentInventory, currentInventoryDispatcher] = useReducer(currentInventoryReducer, {});

    // TODO:
    // show user which item is selected
    // implement the same tab grouping feature on browsers
    // let users shift or ctrl to select multiple items
    // items will be grouped (shows up the same in the the droppable container)
    // group items MUST be next to each other
    // there should be one title that users can interact with to change the name of the group
    const [currentClicked, setCurrentClicked] = useState<CurrentClicked[]>([])

    function handleDragStart(event: DragStartEvent) {
        const containerId = event.active.data.current?.containerId
        // TODO: This should be a constructor, and data should at this point be a class of its own
        const data: Data | undefined = createData(event.active.data.current);
        if (containerId && containerId === TOOL_WINDOW_ID) { // create a new guy
            data.id = `${data.name}-${v4()}`
        }
        if (data === undefined) return
        setData(data);
        setHoverContainerId(containerId)
        setActiveId(String(event.active.id))

        // TODO: check if shift is being clicked?
        // setCurrentClicked([
        //     {
        //         containerId: containerId,
        //         id: String(event.active.id)
        //     }
        // ])
    }

    function handleDragEnd(event: DragEndEvent) {
        // const data: Data | undefined = createData(event.active.data.current);
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
        setData({ id: "this_is_empty", category: Category.ACCESSORIES, weight: 0, name: '' })
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
                    // tool: data
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
        } else if (active && active.data.current && (over === null || over.data.current === undefined)) {
            if (active.data.current.containerId === TOOL_WINDOW_ID) return // we came from gear window, do nothing
        }
    }

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5
            }
        }),
    );

    return (
        <Page>
            <CurrentClickedContext.Provider value={{ currentClicked, setCurrentClicked }}>
                <CurrentInventoryContext.Provider value={{ currentInventory, currentInventoryDispatcher }}>
                    <DroppedDataContext.Provider value={{ data, droppableId, droppedCount }}>
                        <DndContext
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            sensors={sensors}
                        >
                            <ToolContainer>
                                <ToolWindow />
                            </ToolContainer>
                            <PackContainer>
                                <ActionsHeader />
                                <ContainerWindow />
                            </PackContainer>

                            <DragOverlay>
                                {currentClicked.map((currentClicked: CurrentClicked, index) => {
                                    let _data = currentInventory[currentClicked.containerId].find(data => data.id === currentClicked.id)
                                    return <DraggableTool key={index} _data={_data ? _data : data} ishovering={true} containerId={hoverContainerId} />
                                })}
                                {/* {activeId !== '' && data && <DraggableTool _data={data} ishovering={true} containerId={hoverContainerId} />} */}
                            </DragOverlay>
                        </DndContext>
                    </DroppedDataContext.Provider>
                </CurrentInventoryContext.Provider>
            </CurrentClickedContext.Provider>
        </Page>
    )
}


export default Inventory;
