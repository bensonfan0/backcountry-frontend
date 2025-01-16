import React, { useContext, useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import styled from 'styled-components';
import DraggableTool from '../tool/draggableTool';
import { DroppedDataContext, useCurrentInventoryState } from '@/app/inventory/page';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { SortableContext } from '@dnd-kit/sortable';
import { InventoryActions } from '@/app/inventory/inventoryReducer';


const ContainerCardContainer = styled.div`
    border: 1px solid #6f6f6f;
    border-radius: 8px;
    overflow: hidden;
    margin: 10px auto 10px;
    width: 90%;
`;

const ContainerCardContent = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
`;

const ContainerCardTitle = styled.h2`
    font-size: 1.5em;
    margin: 0 0 8px;
    color: #000;
`;

interface DroppableContainerProps {
    id: string,
    title: string,
    hoveredContainer: string,
    deleteClickContainer: (id: string) => void;
    setHoveredContainer: (id: string) => void;
}

const ContainerTools = styled.div`
    display: flex;
    flex-direction: column;
`

const ContainerTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const DroppableContainer = ({ id, title, hoveredContainer, deleteClickContainer, setHoveredContainer }: DroppableContainerProps) => {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });
    const [hoveredRow, setHoveredRow] = useState<string>('');
    const [weight, setWeight] = useState<number>(0);
    const currentInventoryContext = useCurrentInventoryState();

    useEffect(() => {
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.ADD_CONTAINER,
            payload: {
                containerId: id
            }
        })
    }, [])

    useEffect(() => {
        let newWeight = 0
        currentInventoryContext.currentInventory[id].forEach((tool) => {
            newWeight += tool.weight
        })
        setWeight(newWeight)
    }, [currentInventoryContext.currentInventory]) // this is very important to render when it changes

    const hoverOverStyle: React.CSSProperties = {
        backgroundColor: isOver ? '#e1ffca' : '#fff',
    }

    const deleteClickTools = (toolId: string) => {
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.REMOVE,
            payload: {
                containerId: id,
                toolId: toolId
            }
        })
    }

    const handleMouseEnter = (id: string) => {
        setHoveredContainer(id);
    };

    const handleMouseLeave = () => {
        setHoveredContainer('');
    };

    return (
        <ContainerCardContainer
            ref={setNodeRef}
            style={hoverOverStyle}
        >
            <ContainerCardContent>
                <ContainerTitleContainer
                    onMouseEnter={() => handleMouseEnter(id)}
                    onMouseLeave={handleMouseLeave}
                >
                    <ContainerCardTitle>{title}</ContainerCardTitle>
                    <div>weight: {weight}g</div>
                    <IconButton
                        style={{ height: '30px', width: '30px', justifySelf: 'flex-start' }}
                        sx={{ visibility: hoveredContainer === id ? '' : 'hidden' }}
                        onClick={() => deleteClickContainer(id)}
                        color="primary"
                        aria-label="open-close"
                    >
                        <ClearIcon sx={{ fontSize: '20px', color: 'red' }} />
                    </IconButton>
                </ContainerTitleContainer>
                <ContainerTools>
                        <SortableContext items={id in currentInventoryContext.currentInventory ? currentInventoryContext.currentInventory[id] : []}>
                            {id in currentInventoryContext.currentInventory && currentInventoryContext.currentInventory[id].map((tool) => {
                                return (
                                    <DraggableTool key={tool.id} _data={tool} hoveredRow={hoveredRow} setHoveredRow={setHoveredRow} deleteClick={deleteClickTools} containerId={id} />
                                )
                            })}
                        </SortableContext>
                </ContainerTools>
            </ContainerCardContent>
        </ContainerCardContainer>
    )
}

export default DroppableContainer;