import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DraggableTool from './draggableTool';
import { TEST_DATA } from '@/data/testData';
import { Category, TOOL_WINDOW_ID } from '@/data/constants';
import { SortableContext } from '@dnd-kit/sortable';
import { useCurrentInventoryState } from '@/app/inventory/page';
import { InventoryActions } from '@/app/inventory/inventoryReducer';


const Container = styled.div`
    display: flex;
    align-items: flex-start;
    width: 400px;
`

const ToolScrollTable = styled.div`
    width: 80%;
    height: calc(100vh - 40px);
    overflow-y: auto;
    padding: 0 20px 0 0;
    background-color: #fff;
    box-shadow: 1px 1px 5px 0px rgba(1, 1, 1, 0.05);
`

const ToolContainerHeader = styled.div`
    display: flex;
`

const ToolContainerBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    max-width: 100%;
    overflow-y: scroll;
`

export interface Data {
    id: string;
    name: string;
    category: Category;
    weight: number;
}

const ToolWindow: React.FC = () => {
    const [hoveredRow, setHoveredRow] = useState<string>('');

    const currentInventoryContext = useCurrentInventoryState();

    useEffect(() => {
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.ADD_CONTAINER,
            payload: {
                containerId: TOOL_WINDOW_ID
            }
        })
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.ADD_TOOLS,
            payload: {
                containerId: TOOL_WINDOW_ID,
                newTools: TEST_DATA
            }
        })
    }, [])

    const deleteClick = (toolId: string) => {
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.REMOVE,
            payload: {
                containerId: TOOL_WINDOW_ID,
                toolId: toolId
            }
        })
    }

    return (
        <Container>
            <ToolScrollTable>
                <ToolContainerHeader>
                    {/* planning to be a search bar */}
                </ToolContainerHeader>
                <ToolContainerBody>
                    <SortableContext items={TOOL_WINDOW_ID in currentInventoryContext.currentInventory ? currentInventoryContext.currentInventory[TOOL_WINDOW_ID] : []}>
                        {TOOL_WINDOW_ID in currentInventoryContext.currentInventory && currentInventoryContext.currentInventory[TOOL_WINDOW_ID].map((row) => {
                            return <DraggableTool key={row.id} _data={row} hoveredRow={hoveredRow} setHoveredRow={setHoveredRow} deleteClick={deleteClick} containerId={TOOL_WINDOW_ID} />
                        })}
                    </SortableContext>
                </ToolContainerBody>
            </ToolScrollTable>
        </Container>
    );
};

export default ToolWindow;