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

import Draggable from '../dragging/draggable';
import Droppable from '../dragging/droppable';

import { DragOverlay, useDraggable } from '@dnd-kit/core';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const ButtonContainer = styled.div`
    margin-left: auto;
    padding-right: 40px;
    background-color: '#fff';
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
        name: `tool ${i}`,
        category: Category.CLOTHING,
        weight: 100
    })
}

const ToolWindow: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [data, setData] = useState<Data[]>(initData);
    const [hoveredRow, setHoveredRow] = useState<number>(-1);
    const [uniqueId, setUniqueId] = useState<number>(initData.length);

    const containerHeight = isOpen ? '350px' : '0px';
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
            <ButtonContainer>
                <IconButton onClick={addClick} color="primary" aria-label="add-gear">
                    <AddIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <IconButton onClick={closeClick} color="primary" aria-label="open-close">
                    <UnfoldMoreIcon sx={{ fontSize: 40 }} />
                </IconButton>
            </ButtonContainer>
            <TableContainer component={Paper} sx={{ height: containerHeight, zIndex: overlap }}>
                <Table
                // stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {/* this has to be empty for the drag indicator*/}
                            </TableCell>
                            <TableCell>Tool</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>
                                {/* this has to be empty for the delete icon*/}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <DraggableTableRow
                                data={row}
                                key={row.id}
                                onMouseEnter={() => handleMouseEnter(row.id)}
                                onMouseLeave={handleMouseLeave}
                                id={`${row.id}`}
                            >
                                {/* NOTE there is an extra table cell being defined in the draggable table row to indicate draggable */}
                                <TableCell>
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        defaultValue={row.name}
                                        variant="filled"
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <FlatwareIcon />
                                    <CheckroomIcon />
                                    <SoapIcon />
                                    <HandymanIcon />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        defaultValue={row.weight}
                                        variant="filled"
                                        size="small"
                                        sx={{ width: 100 }}
                                    />
                                </TableCell>
                                <TableCell sx={{ width: '100px' }}>
                                    {
                                        hoveredRow === row.id &&
                                        <IconButton onClick={() => deleteClick(row.id)} color="primary" aria-label="open-close">
                                            <ClearIcon sx={{ fontSize: 20, color: "red" }} />
                                        </IconButton>
                                    }
                                </TableCell>
                            </DraggableTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <DragOverlay>
                {activeId ? (
                    <DraggableTableRow id={`Item ${activeId}`} />
                ) : null}
            </DragOverlay> */}
        </Container>
    );
};

interface DraggableTableRowProps {
    data: Data;
    children?: React.ReactNode;
    id: string;
    onMouseEnter?: React.MouseEventHandler<HTMLTableRowElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLTableRowElement>;
}

const DraggableTableRow: React.FC<DraggableTableRowProps> = ({ data, children, id, onMouseEnter, onMouseLeave }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
        data: data
    });

    const style: React.CSSProperties = {
        // transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        // zIndex: isDragging ? 1000 : 'auto',
        // transition: isDragging ? 'transform 0.05s ease, box-shadow 0.05s ease' : 'none',
        // boxShadow: isDragging ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
        backgroundColor: isDragging ? 'rgba(138, 138, 138, 0.2)' : '',
        color: isDragging ? 'rgba(255, 255, 255, 0.2)' : '',
    };

    const defaultStyle = {
        borderRadius: '50px',
        padding: 5,
        fontSize: 40,
    }

    return (
        <TableRow ref={setNodeRef} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <TableCell>
                <DragIndicatorIcon
                    style={defaultStyle}
                    {...attributes}
                    {...listeners}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f2f2f2'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                />
            </TableCell>
            {children}
        </TableRow>
    );
};


export default ToolWindow;