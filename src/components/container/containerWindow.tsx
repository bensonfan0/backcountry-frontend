import React, { useState } from 'react';
import styled from 'styled-components';
import DroppableContainer from './droppableContainer';
import { useCurrentInventoryState } from '@/app/inventory/page';
import { TOOL_WINDOW_ID } from '@/data/constants';
import { InventoryActions } from '@/app/inventory/inventoryReducer';

interface CardProps {
}

const ContainerDiv = styled.div`
    overflow-y: auto;
    height: calc(100vh - 160px); // two bars (top and action bar)
    margin: 20px 0 0 0;
`

const ContainerWindow = ({ }: CardProps) => {
    const [hoveredContainer, setHoveredContainer] = useState<string>('');

    const currentInventoryContext = useCurrentInventoryState();

    const deleteClick = (id: string) => {
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.REMOVE_CONTAINER,
            payload: {
                containerId: id
            }
        })
    }

    return (
        <ContainerDiv>
            {
                Object.keys(currentInventoryContext.currentInventory).map((value) => {
                    if (value === TOOL_WINDOW_ID) return
                    const id = `${value}`
                    return <DroppableContainer key={id} id={id} title={value} hoveredContainer={hoveredContainer} setHoveredContainer={setHoveredContainer} deleteClickContainer={deleteClick} />
                })
            }
        </ContainerDiv>
    );
};

export default ContainerWindow;