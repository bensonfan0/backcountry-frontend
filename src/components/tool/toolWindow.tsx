import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DraggableTool from './draggableTool';
import { TEST_DATA } from '@/data/testData';
import { Category, TOOL_WINDOW_ID } from '@/data/constants';
import { SortableContext } from '@dnd-kit/sortable';


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

const ButtonContainer = styled.div`
    padding: 10px 0 0 0;
    width: 20%;
`

export interface Data {
    id: string;
    name: string;
    category: Category;
    weight: number;
}

let initData: Data[] = TEST_DATA

const ToolWindow: React.FC = () => {
    const [data, setData] = useState<Data[]>(initData);
    const [hoveredRow, setHoveredRow] = useState<string>('');
    const [uniqueId, setUniqueId] = useState<number>(initData.length);

    const addClick = () => {
        const newData = [
            {
                id: String(uniqueId),
                name: '',
                category: Category.CLOTHING,
                weight: 0,
            },
            ...data
        ]
        setUniqueId(uniqueId + 1);
        setData(newData);
    }

    const deleteClick = (id: string) => {
        const newData: Data[] = [];
        data.forEach((row) => {
            if (row.id !== id) {
                newData.push(row)
            }
        })
        setData(newData);
    }

    return (
        <Container>
            <ToolScrollTable>
                <ToolContainerHeader>
                    {/* planning to be a search bar */}
                </ToolContainerHeader>
                <ToolContainerBody>
                    <SortableContext id={TOOL_WINDOW_ID} items={data}>
                        {data.map((row) => (
                            <DraggableTool key={row.id} _data={row} hoveredRow={hoveredRow} setHoveredRow={setHoveredRow} deleteClick={deleteClick} setTools={setData} />
                        ))}
                    </SortableContext>
                </ToolContainerBody>
            </ToolScrollTable>
            <ButtonContainer>
                <IconButton onClick={addClick} color="primary" aria-label="add-gear">
                    <AddIcon />
                </IconButton>
            </ButtonContainer>
        </Container>
    );
};

export default ToolWindow;