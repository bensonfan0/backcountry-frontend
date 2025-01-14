import React, { useContext, useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import styled from 'styled-components';
import DraggableTool from '../tool/draggableTool';
import { Data } from '../tool/toolWindow';
import { DroppedDataContext } from '@/app/inventory/page';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { SortableContext } from '@dnd-kit/sortable';


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
    const [tools, setTools] = useState<Data[]>([]);
    const [hoveredRow, setHoveredRow] = useState<string>('');
    const [uniqueId, setUniqueId] = useState<number>(1000000); // definitely not bulletproof
    const [weight, setWeight] = useState<number>(0);

    const droppedData = useContext(DroppedDataContext)

    useEffect(() => {
        if (droppedData?.data && droppedData.droppableId === id) { // is this still going to register as true when the context changes?
            let droppedDataCopy = { ...droppedData.data }
            droppedDataCopy.id = `${id}-${String(uniqueId)}`
            let newTools = [...tools, droppedDataCopy]
            setTools(newTools)
            setUniqueId(uniqueId + 1)
        }
    }, [droppedData?.droppedCount])

    useEffect(() => {
        let newWeight = 0
        tools.forEach((tool) => {
            newWeight += tool.weight
        })
        setWeight(newWeight)
    }, [tools])

    const hoverOverStyle: React.CSSProperties = {
        backgroundColor: isOver ? '#e1ffca' : '#fff',
    }

    const deleteClickTools = (id: string) => {
        const newTools: Data[] = [];
        tools.forEach((row) => {
            if (row.id !== id) {
                newTools.push(row)
            }
        })
        setTools(newTools);
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
                    <SortableContext items={tools}>
                        {tools.map((tool) => {
                            return (
                                <DraggableTool key={tool.id} _data={tool} hoveredRow={hoveredRow} setHoveredRow={setHoveredRow} deleteClick={deleteClickTools} setTools={setTools} />
                            )
                        })}
                    </SortableContext>
                </ContainerTools>
            </ContainerCardContent>
        </ContainerCardContainer>
    )
}

export default DroppableContainer;