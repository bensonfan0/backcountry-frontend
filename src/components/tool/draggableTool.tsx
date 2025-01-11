import React, { ChangeEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import styled from 'styled-components';
import { Data } from './toolWindow';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useDraggable } from '@dnd-kit/core';
import { Menu, MenuItem } from '@mui/material';

import FlatwareIcon from '@mui/icons-material/Flatware';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SoapIcon from '@mui/icons-material/Soap';
import HandymanIcon from '@mui/icons-material/Handyman';
import { Category } from '@/data/constants';


const ToolName = styled.div`
    font-size: 13px;
    font-weight: 15px;
    max-width: 100%;
    min-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ToolWeight = styled.div`
    font-size: 10px;
    min-height: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ToolTextContainer = styled.div`
    width: 100%;
    margin: 0 0 0 10px;
    display: 'flex';
    flex-direction: 'column';
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const StyledInput = styled.input`
    font-size: inherit;
    color: inherit;
    padding: inherit;
    border: inherit;
    /* Add any other styles */
`;

interface DraggableComponentProps {
    _data: Data;
    hoveredRow: string
    setHoveredRow: (id: string) => void;
    deleteClick: (id: string) => void;
    setTools?: React.Dispatch<React.SetStateAction<Data[]>>;
}

const categoryToIconMappings = {
    [Category.FOOD]: { icon: <FlatwareIcon />, label: Category.FOOD },
    [Category.CLOTHING]: { icon: <CheckroomIcon />, label: Category.CLOTHING },
    [Category.HYGIENE]: { icon: <SoapIcon />, label: Category.HYGIENE },
    [Category.GEAR]: { icon: <HandymanIcon />, label: Category.GEAR }
};

const iconList = [
    { icon: <FlatwareIcon />, label: Category.FOOD },
    { icon: <CheckroomIcon />, label: Category.CLOTHING },
    { icon: <SoapIcon />, label: Category.HYGIENE },
    { icon: <HandymanIcon />, label: Category.GEAR }
];

const DraggableTool = ({ _data, hoveredRow, setHoveredRow, deleteClick, setTools }: DraggableComponentProps) => {
    const [id, _] = useState<string>(_data.id);
    const [data, setData] = useState<Data>(_data);
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [isEditingWeight, setIsEditingWeight] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedIcon, setSelectedIcon] = useState<JSX.Element>(categoryToIconMappings[_data.category].icon);

    const open = Boolean(anchorEl);

    const handleDoubleClickName = () => {
        setIsEditingName(true);
    };

    const handleDoubleClickWeight = () => {
        setIsEditingWeight(true);
    };

    const handleBlurName = () => {
        setIsEditingName(false);
    };

    const handleBlurWeight = () => {
        setIsEditingWeight(false);
    }

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        let newData = { ...data }
        newData.name = e.target.value
        handleChange(newData)
        setData(newData)
    };

    const handleChangeWeight = (e: ChangeEvent<HTMLInputElement>) => {
        let newData = { ...data }
        newData.weight = Number(e.target.value)
        handleChange(newData)
        setData(newData) // this could be a race condition as we wait for the data to change...
    };

    const handleChange = (newData: Data) => {
        if (!setTools) return;
        setTools((prevTools: Data[]) => {
            let newTools: Data[] = []
            prevTools.forEach((tool) => {
                if (id === tool.id) {
                    tool = newData
                }
                newTools.push(tool)
            })
            return newTools
        })
    }

    const handleMouseEnter = (id: string) => {
        setHoveredRow(id);
    };

    const handleMouseLeave = () => {
        setHoveredRow('');
    };

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        category: Category,
    ) => {
        setSelectedIcon(categoryToIconMappings[category].icon)
        setData((prevData)  => {
            let newData = {...prevData}
            newData.category = category
            return newData
        })
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <DraggableItem
            data={data}
            key={data.id}
            onMouseEnter={() => handleMouseEnter(data.id)}
            onMouseLeave={handleMouseLeave}
            id={`${data.name} ${data.id}`}
        >
            <IconButton
                sx={{ visibility: hoveredRow === data.id ? '' : 'hidden' }}
                onClick={() => deleteClick(data.id)}
                color="primary"
                aria-label="open-close"
            >
                <ClearIcon sx={{ fontSize: '20px', color: 'red' }} />
            </IconButton>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {Object.entries(categoryToIconMappings).map(([_, value], index) => (
                    <MenuItem
                        key={value.label}
                        onClick={(event) => handleMenuItemClick(event, value.label)}
                    >
                        {value.icon}
                    </MenuItem>
                ))}
            </Menu>
            <IconButton onClick={handleClickListItem}>
                {selectedIcon}
            </IconButton>
            <ToolTextContainer>
                <ToolName onDoubleClick={handleDoubleClickName}>
                    {isEditingName ? (
                        <StyledInput
                            type="text"
                            value={data.name}
                            onChange={handleChangeName}
                            onBlur={handleBlurName}
                            autoFocus
                        />
                    ) :
                        data.name
                    }
                </ToolName>
                <ToolWeight onDoubleClick={handleDoubleClickWeight}>
                    {isEditingWeight ? (
                        <StyledInput
                            type="text"
                            value={data.weight}
                            onChange={handleChangeWeight}
                            onBlur={handleBlurWeight}
                            autoFocus
                        />
                    ) :
                        data.weight
                    } g
                </ToolWeight>
            </ToolTextContainer>
        </DraggableItem>
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: isDragging ? 'rgba(28, 149, 255, 0.806)' : '',
        height: '40px',
        width: '100%',
        maxWidth: '100%',
        backgroundColor: '#fff',
    };

    const defaultStyle = {
        borderRadius: '15px',
        padding: '5px',
        fontSize: 30,
        marginLeft: 'auto',
        zIndex: 3,
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

export default DraggableTool;