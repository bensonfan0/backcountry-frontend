import React, { useState } from 'react';
import styled from 'styled-components';
import BackpackTwoToneIcon from '@mui/icons-material/BackpackTwoTone';
import IconButton from '@mui/material/IconButton';
import DroppableContainer from './droppableContainer';

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

    const addBackpack = () => {
        let newContainers = [...containers, `backpack ${uniqueId}`]
        setUniqueId(uniqueId + 1)
        setContainers(newContainers)
    }

    const deleteClick = (id: string) => {
        const newContainers: string[] = [];
        containers.forEach((container) => {
            if (container !== id) {
                newContainers.push(container)
            }
        })
        setContainers(newContainers);
    }

    return (
        <ContainerDiv>
            <IconButton onClick={addBackpack} color="primary">
                <BackpackTwoToneIcon />
            </IconButton>
            {containers.map((value) => {
                const id = `${value}`
                return <DroppableContainer key={id} id={id} title={value} hoveredContainer={hoveredContainer} setHoveredContainer={setHoveredContainer} deleteClickContainer={deleteClick} />
            })}
        </ContainerDiv>
    );
};

export default ContainerWindow;