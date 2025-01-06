import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DroppedDataContext } from '@/app/layout';
import { Data } from '../tool/toolWindow';
import { useDroppable } from '@dnd-kit/core';

interface CardProps {
    id: number;
    title: string;
    content: string;
    imageUrl?: string;
}

const ContainerDiv = styled.div`
    flex: 1;
    overflow-y: auto;
`

const ContainerCardContainer = styled.div`
    border: 1px solid #6f6f6f;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 auto 0;
    width: 90%;
`;

const ContainerCardImage = styled.img`
    width: 100%;
    height: auto;
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

const ContainerCardText = styled.p`
    font-size: 1em;
    color: #000;
`;

const ContainerTools = styled.div`
    display: flex;
    flex-direction: column;
`

const ContainerCard = ({ id, title, content, imageUrl }: CardProps) => {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });
    const [tools, setTools] = useState<Data[]>([])

    const droppedData = useContext(DroppedDataContext)

    useEffect(() => {
        console.log(droppedData?.droppableId)
        console.log('what')
        if (droppedData?.droppableId === Number(id) && droppedData.data) { // is this still going to register as true when the context changes?
            console.log(droppedData.data)
            let newTools = [...tools, droppedData.data]
            setTools(newTools)
        }
    }, [droppedData?.droppedCount])

    const hoverOverStyle: React.CSSProperties = {
        backgroundColor: isOver ? '#e1ffca' : undefined,
    }

    return (
        <ContainerDiv>

            {/* This needs to be a map of container backpacks */}
            <ContainerCardContainer ref={setNodeRef} style={hoverOverStyle}>
                {imageUrl && <ContainerCardImage src={imageUrl} alt={title} />}
                <ContainerCardContent>
                    <ContainerCardTitle>{title}</ContainerCardTitle>
                    <ContainerCardText>{content}</ContainerCardText>
                    <ContainerTools>
                        {tools.map((tool) => {
                            return (
                                <div>
                                    {tool.name} {tool.category} {tool.weight}
                                </div>
                            )
                        })}
                    </ContainerTools>
                </ContainerCardContent>
            </ContainerCardContainer>
        </ContainerDiv>
    );
};

export default ContainerCard;