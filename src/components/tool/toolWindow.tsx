import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DraggableTool from './draggableTool';
import { TEST_DATA } from '@/data/testData';
import { Category, TOOL_WINDOW_ID } from '@/data/constants';
import { SortableContext } from '@dnd-kit/sortable';
import { useCurrentInventoryState } from '@/app/inventory/CurrentInventoryContext';
import { InventoryActions } from '@/app/inventory/inventoryReducer';
import CustomizedInputBase from './search/searchTextField';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 400px;
    `

const ToolScrollTable = styled.div`
    background-color: #fff;
    width: 80%;
    height: calc(100vh - 91px);
    overflow-y: auto;
    padding: 0 0 0 0;
    box-shadow: 1px 1px 5px 0px rgba(1, 1, 1, 0.05);
`

const ToolContainerHeader = styled.div`
    background-color: #fff;
    display: flex;
    width: 80%;
    box-shadow: 1px 1px 5px 0px rgba(1, 1, 1, 0.05);
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
    containerId: string;
}

const ToolWindow: React.FC = () => {
    const [hoveredRow, setHoveredRow] = useState<string>('');
    const [searchName, setSearchName] = useState<RegExp>(/.*/);
    const [items, setItems] = useState<Data[]>([]);

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
        // is this going to run into error before it's set?
        setItems(currentInventoryContext.currentInventory[TOOL_WINDOW_ID])
    }, [])

    useEffect(() => {
    }, [searchName])

    const deleteClick = (toolId: string) => {
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.REMOVE,
            payload: {
                containerId: TOOL_WINDOW_ID,
                toolId: toolId
            }
        })
    }

    const onChange = (name: string) => {
        const splitName = name.split('').join('.*');
        setSearchName(new RegExp(`.*${splitName}.*`));
    }

    return (
        <Container>
            <ToolContainerHeader>
                {/* planning to be a search bar */}
                <CustomizedInputBase onChange={onChange} />
            </ToolContainerHeader>
            <ToolScrollTable>
                <ToolContainerBody>
                    <SortableContext items={TOOL_WINDOW_ID in currentInventoryContext.currentInventory ? currentInventoryContext.currentInventory[TOOL_WINDOW_ID] : []}>
                        {TOOL_WINDOW_ID in currentInventoryContext.currentInventory && currentInventoryContext.currentInventory[TOOL_WINDOW_ID].filter((item) => searchName.test(item.name.toLowerCase())).map((row) => {
                            return <DraggableTool key={row.id} _data={row} hoveredRow={hoveredRow} setHoveredRow={setHoveredRow} deleteClick={deleteClick} containerId={TOOL_WINDOW_ID} />
                        })}
                    </SortableContext>
                </ToolContainerBody>
            </ToolScrollTable>
        </Container>
    );
};

export default ToolWindow;