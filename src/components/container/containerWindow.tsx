import React, { useState } from 'react';
import styled from 'styled-components';
import BackpackTwoToneIcon from '@mui/icons-material/BackpackTwoTone';
import IconButton from '@mui/material/IconButton';
import DroppableContainer from './droppableContainer';
import { useCurrentInventoryState } from '@/app/inventory/page';
import { TOOL_WINDOW_ID } from '@/data/constants';
import { InventoryActions } from '@/app/inventory/inventoryReducer';

interface CardProps {
}

const ContainerDiv = styled.div`
    /* flex: 1; */
    overflow-y: auto;
    height: calc(100vh - 80px);
    margin: 20px 0 0 0;
`

const ContainerWindow = ({ }: CardProps) => {
    const [containers, setContainers] = useState<string[]>([]);
    const [hoveredContainer, setHoveredContainer] = useState<string>('');
    const [uniqueId, setUniqueId] = useState<number>(0);

    const currentInventoryContext = useCurrentInventoryState();

    const addBackpack = () => {
        // let newContainers = [...containers, `backpack ${uniqueId}`]
        setUniqueId(uniqueId + 1)
        // setContainers(newContainers)
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.ADD_CONTAINER,
            payload: {
                containerId: `backpack ${uniqueId}`
            }
        })
    }

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
            <IconButton onClick={addBackpack} color="primary">
                <BackpackTwoToneIcon />
            </IconButton>
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