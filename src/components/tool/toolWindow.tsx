import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import FlatwareIcon from '@mui/icons-material/Flatware';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SoapIcon from '@mui/icons-material/Soap';
import HandymanIcon from '@mui/icons-material/Handyman';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Input from '@mui/material/Input';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';

import Draggable from '../dragging/draggable';
import Droppable from '../dragging/droppable';

import { useDraggable } from '@dnd-kit/core';


const Container = styled.div`
    display: flex;
    align-items: flex-start;
    /* height: calc(100vh - 40px); // offset by the header */
    width: 350px;
    /* flex-direction: column; */
`

const ToolScrollTable = styled.div`
    width: 80%;
    height: calc(100vh - 40px);
    overflow-y: auto;
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
    background-color: #fff;
    padding: 0 20px 0 0;
    overflow-y: scroll;
`

const ButtonContainer = styled.div`
    padding: 10px 0 0 0;
    width: 20%;
    /* margin-left: auto; */
    /* padding-right: 40px; */
    /* background-color: '#fff'; */
`

const ToolName = styled.div`
    font-size: 13px;
    font-weight: 15px;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ToolWeight = styled.div`
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ToolTextContainer = styled.div`
    padding: 0 0 0 10px;
    display: 'flex';
    flex-direction: 'column';
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

enum Category {
    FOOD,
    CLOTHING,
    HYGIENE,
    GEAR
}

export interface Data {
    id: number;
    name: string;
    category: Category;
    weight: number;
}

let initData: Data[] = []

for (let i = 0; i < 15; i++) {
    initData.push({
        id: i,
        name: `tool dwadwadwadwadwadwadwadwadadwadwadwa ${i}`,
        category: Category.CLOTHING,
        weight: 100
    })
}

const ToolWindow: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [data, setData] = useState<Data[]>(initData);
    const [hoveredRow, setHoveredRow] = useState<number>(-1);
    const [uniqueId, setUniqueId] = useState<number>(initData.length);

    const containerHeight = isOpen ? '100%' : '100%';
    const overlap = isOpen ? 2 : 0;

    const handleMouseEnter = (index: number) => {
        // console.log(index)
        setHoveredRow(index);
    };

    const handleMouseLeave = () => {
        setHoveredRow(-1);
    };

    const closeClick = () => {
        setIsOpen(!isOpen);
    }

    const addClick = () => {
        const newData = [
            {
                id: uniqueId,
                name: '',
                category: Category.CLOTHING,
                weight: 0,
            },
            ...data
        ]
        setUniqueId(uniqueId + 1);
        setData(newData);
    }

    const deleteClick = (id: number) => {
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
                </ToolContainerHeader>
                <ToolContainerBody>
                    {data.map((row, index) => (
                        <DraggableItem
                            data={row}
                            key={row.id}
                            onMouseEnter={() => handleMouseEnter(row.id)}
                            onMouseLeave={handleMouseLeave}
                            id={`${row.id}`}
                        >
                            <IconButton
                                sx={{ visibility: hoveredRow === row.id ? '' : 'hidden' }}
                                onClick={() => deleteClick(row.id)}
                                color="primary"
                                aria-label="open-close"
                            >
                                <ClearIcon sx={{ fontSize: '20px', color: "red" }} />
                            </IconButton>
                            <FlatwareIcon style={{ fontSize: '25px' }} />
                            {/* <CheckroomIcon style={{ fontSize: '20px' }} />
                                <SoapIcon style={{ fontSize: '20px' }} />
                                <HandymanIcon style={{ fontSize: '20px' }} /> */}
                            <ToolTextContainer>
                                <ToolName>
                                    {row.name}
                                </ToolName>
                                <ToolWeight>
                                    {row.weight} g
                                </ToolWeight>
                            </ToolTextContainer>
                            {/* NOTE there is an extra table cell being defined in the draggable table row to indicate draggable */}
                        </DraggableItem>
                    ))}
                </ToolContainerBody>
            </ToolScrollTable>
            <ButtonContainer>
                <IconButton onClick={addClick} color="primary" aria-label="add-gear">
                    <AddIcon sx={{ fontSize: 40 }} />
                </IconButton>
            </ButtonContainer>
        </Container>
    );
};

interface DraggableItemProps {
    data: Data;
    children?: React.ReactNode;
    id: string;
    onMouseEnter?: React.MouseEventHandler<HTMLTableRowElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLTableRowElement>;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ data, children, id, onMouseEnter, onMouseLeave }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
        data: data
    });

    const style: React.CSSProperties = {
        // transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        // zIndex: isDragging ? 1000 : 'auto',
        // transition: isDragging ? 'transform 0.05s ease, box-shadow 0.05s ease' : 'none',
        // boxShadow: isDragging ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isDragging ? 'rgba(138, 138, 138, 0.2)' : '',
        color: isDragging ? 'rgba(255, 255, 255, 0.2)' : '',
        height: '40px',
        width: '100%',
        maxWidth: '100%',
    };

    const defaultStyle = {
        borderRadius: '15px',
        padding: 5,
        fontSize: 30,
        marginLeft: 'auto',
    }

    return (
        <div ref={setNodeRef} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {children}
            <DragIndicatorIcon
                style={defaultStyle}
                {...attributes}
                {...listeners}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f2f2f2'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
            />
        </div>
    );
};


export default ToolWindow;