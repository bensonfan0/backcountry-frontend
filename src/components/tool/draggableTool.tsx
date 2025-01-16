import React, { ChangeEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import styled from 'styled-components';
import { Data } from './toolWindow';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Menu, MenuItem } from '@mui/material';

import { Category, categoryToIconMappings, TOOL_WINDOW_ID } from '@/data/constants';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
    hoveredRow: string;
    containerId: string;
    setHoveredRow: (id: string) => void;
    deleteClick: (id: string) => void;
}

const DraggableTool = ({ _data, hoveredRow, setHoveredRow, deleteClick, containerId }: DraggableComponentProps) => {
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
        setData(newData)
    };

    const handleChangeWeight = (e: ChangeEvent<HTMLInputElement>) => {
        let newData = { ...data }
        newData.weight = Number(e.target.value)
        setData(newData) // this could be a race condition as we wait for the data to change...
    };

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
        setData((prevData) => {
            let newData = { ...prevData }
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
            id={data.id}
            containerId={containerId}
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
                {Object.entries(categoryToIconMappings).map(([_, value]) => (
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
    containerId: string;
    onMouseEnter?: React.MouseEventHandler<HTMLTableRowElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLTableRowElement>;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ data, children, id, onMouseEnter, onMouseLeave, containerId }) => {

    let dataFordndContext = {
        ...data,
        containerId: containerId,
    }

    const { attributes, listeners, setNodeRef, transform, isDragging, setActivatorNodeRef, transition } = useSortable({
        id,
        data: dataFordndContext,
    });

    let style: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: isDragging ? 'rgba(28, 149, 255, 0.806)' : '',
        height: '40px',
        width: '100%',
        backgroundColor: '#fff',
        border: isDragging ? '1px solid rgba(28, 149, 255, 0.806)' : '0.5px solid #6f6f6f',
        borderRadius: '10px',
    };

    const styleSortable: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    if (containerId !== TOOL_WINDOW_ID) {
        // we don't want the sorting animation on tool window
        style = {
            ...style,
            ...styleSortable
        }
    }

    return (
        <div
            style={style}
            ref={setNodeRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
            <IconButton
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f2f2f2'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
            >
                <DragIndicatorIcon
                />
            </IconButton>
        </div>
    );
};

export default DraggableTool;