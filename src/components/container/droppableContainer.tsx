import React, { useContext, useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import styled from 'styled-components';
import DraggableTool from '../tool/draggableTool';
import { useCurrentInventoryState } from '@/app/inventory/CurrentInventoryContext';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { SortableContext } from '@dnd-kit/sortable';
import { InventoryActions } from '@/app/inventory/inventoryReducer';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Category, categoryMappings, categoryToColorMapping } from '@/data/constants';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: 'Weight',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const chartDataDefaults = {
    label: 'Weight',
    borderWidth: 1,
}

const ContainerCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid #6f6f6f;
    border-radius: 8px;
    overflow: hidden;
    margin: 10px auto 10px;
    width: 90%;
`;

const ContainerCardContent = styled.div`
    width: 50%;
    padding: 16px;
    display: flex;
    flex-direction: column;
`;

const ChartDedicatedContainer = styled.div`
    width: 300px;
`

const ContainerCardTitle = styled.h2`
    font-size: 9px;
    margin: 0 0 8px;
    color: #000;
`;

const DropZone = styled.div`
    border-radius: 5px;
    height: 50px;
    opacity: 0.40;
    display: flex;
    align-items: center;
`

const DropZoneText = styled.div`
    padding: 0 0 0 10px;
`

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
    const [chartData, setChartData] = useState<ChartData<'doughnut'>>({
        labels: [],
        datasets: [],
    })
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
        let categoryWeights: { [category: string]: number } = {}
        let totalWeight = 0
        currentInventoryContext.currentInventory[id].forEach((tool) => {
            if (tool.category in categoryWeights) {
                categoryWeights[tool.category] += tool.weight
            } else {
                categoryWeights[tool.category] = tool.weight
            }
            totalWeight += tool.weight
        })

        let labels: string[] = []
        let weights: number[] = []
        let backgroundColor: string[] = []
        let borderColor: string[] = []
        let innerCategoryWeights: {[innerCategory: string]: number} = {}

        Object.keys(categoryWeights).sort().forEach((categoryName) => {
            let category = categoryMappings[categoryName as Category].category
            if (category in innerCategoryWeights) {
                innerCategoryWeights[category] += categoryWeights[categoryName]
            } else {
                innerCategoryWeights[category] = categoryWeights[categoryName]
            }
        });
        Object.keys(innerCategoryWeights).forEach((innerCategoryName) => {
            labels.push(innerCategoryName)
            weights.push(innerCategoryWeights[innerCategoryName])
            backgroundColor.push(categoryToColorMapping[innerCategoryName as Category].backgroundColor)
            borderColor.push(categoryToColorMapping[innerCategoryName as Category].borderColor)
        })

        setChartData({
            labels: labels,
            datasets: [
                {
                    data: weights,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    ...chartDataDefaults
                },
            ]
        })
        setWeight(totalWeight)
    }, [currentInventoryContext.currentInventory, id]) // this is very important to render when it changes

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
        <ContainerCardContainer>
            <ContainerCardContent>
                <ContainerTitleContainer
                    onMouseEnter={() => handleMouseEnter(id)}
                    onMouseLeave={handleMouseLeave}
                >
                    <ContainerCardTitle>{title}</ContainerCardTitle>
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
                {id in currentInventoryContext.currentInventory && currentInventoryContext.currentInventory[id].length === 0 &&
                    <DropZone
                        ref={setNodeRef}
                        style={hoverOverStyle}
                    >
                        <DropZoneText>Drop item here to add</DropZoneText>
                    </DropZone>
                }
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
            <ChartDedicatedContainer>
                <Doughnut
                    data={chartData}
                    width={100}
                    height={50}
                />
                <div>weight: {weight}g</div>
            </ChartDedicatedContainer>
        </ContainerCardContainer>
    )
}

export default DroppableContainer;