import React, { ChangeEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import styled, { keyframes } from 'styled-components';
import { Data } from './toolWindow';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Menu, MenuItem } from '@mui/material';

import { Category, categoryMappings, categoryToIconMappingsNew, TOOL_WINDOW_ID } from '@/data/constants';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useCurrentInventoryState } from '@/app/inventory/CurrentInventoryContext';
import { InventoryActions } from '@/app/inventory/inventoryReducer';

const pulse = keyframes`
    0% {
        background-color: rgb(231, 243, 255)
    }
    100% {
        background-color: #ffffff;
    }
`;

const AnimatedBorderElement = styled.div`
    animation: ${pulse} 0.5s forwards;
`;

const ToolName = styled.div`
    font-size: 13px;
    font-weight: 15px;
    max-width: 100%;
    min-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        /* border-color: #b8b8b8;  */
        background-color: #f4f4f4; 
        border-radius: 5px;
    }
`

const ToolWeight = styled.div`
    font-size: 10px;
    min-height: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        /* border-color: #007BFF; */
        background-color: #f4f4f4;
        border-radius: 5px;
    }
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

interface StyledInputProps {
    isvalid?: string
}

const StyledInput = styled.input<StyledInputProps>`
    font-size: inherit;
    color: inherit;
    padding: inherit;
    ${props => props.isvalid !== undefined && !props.isvalid ? 'border: 3px solid red' : ''};
`;

const MenuRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const MenuRowBottomBorder = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 0.5px solid #676767 ;
`

const MenuCategoryDiv = styled.div`
    padding: 0 0 0 10px;
    width: 100px;
`

interface DraggableComponentProps {
    _data: Data;
    containerId: string;
    hoveredRow?: string;
    ishovering?: boolean;
    setHoveredRow?: (id: string) => void;
    deleteClick?: (id: string) => void;
}

const DraggableTool = ({ _data, containerId, hoveredRow = '', setHoveredRow = (id) => { }, deleteClick = (id) => { }, ishovering }: DraggableComponentProps) => {
    const [id, _] = useState<string>(_data.id);
    const [data, setData] = useState<Data>(_data);
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [isEditingWeight, setIsEditingWeight] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedIcon, setSelectedIcon] = useState<JSX.Element>(categoryMappings[_data.category].icon);

    const [isValidWeight, setIsValidWeight] = useState<boolean>(true);

    const currentInventoryContext = useCurrentInventoryState();

    const open = Boolean(anchorEl);

    const handleClickName = () => {
        setIsEditingName(true);
    };

    const handleClickWeight = () => {
        setIsEditingWeight(true);
    };

    const handleBlurName = () => {
        setIsEditingName(false);
    };

    const handleBlurWeight = () => {
        setIsEditingWeight(false);
    }

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        let newTool = { ...data }
        newTool.name = e.target.value
        setData(newTool)
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.REPLACE_TOOL,
            payload: {
                containerId: containerId,
                toolId: id,
                newTool: newTool
            }
        })
    };

    const handleChangeWeight = (e: ChangeEvent<HTMLInputElement>) => {
        if (/^\d*$/.test(e.target.value)) {
            setIsValidWeight(true);
        } else {
            setIsValidWeight(false);
            return;
        }
        let newTool = { ...data }
        newTool.weight = Number(e.target.value)

        setData(newTool) // this could be a race condition as we wait for the data to change...
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.REPLACE_TOOL,
            payload: {
                containerId: containerId,
                toolId: id,
                newTool: newTool
            }
        })
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
        setSelectedIcon(categoryMappings[category].icon)
        let newTool = { ...data }
        newTool.category = category
        setData(newTool)
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.REPLACE_TOOL,
            payload: {
                containerId: containerId,
                toolId: id,
                newTool: newTool
            }
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
            ishovering={ishovering}
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
                {Object.entries(categoryToIconMappingsNew).map(([_, category]) => (
                    <MenuRowBottomBorder
                        key={category.label}
                    >
                        <MenuCategoryDiv>
                            {category.label}
                        </MenuCategoryDiv>
                        <MenuItem
                            onClick={(event) => handleMenuItemClick(event, category.label)}
                        >
                            {category.icon}
                        </MenuItem>
                        <MenuRow style={{ display: 'flex', flexDirection: 'row' }}>
                            {Object.entries(category.subCategories).map(([_, subCategory]) => (
                                <MenuItem
                                    key={subCategory.label}
                                    onClick={(event) => handleMenuItemClick(event, subCategory.label)}
                                >
                                    {subCategory.icon}
                                </MenuItem>
                            ))}
                        </MenuRow>
                    </MenuRowBottomBorder>
                ))}
                {/* {Object.entries(categoryToIconMappings).map(([_, value]) => (
                    <MenuItem
                        key={value.label}
                        onClick={(event) => handleMenuItemClick(event, value.label)}
                    >
                        {value.icon}
                    </MenuItem>
                ))} */}
            </Menu>
            <IconButton onClick={handleClickListItem}>
                {selectedIcon}
            </IconButton>
            <ToolTextContainer>
                <ToolName onClick={handleClickName}>
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
                <ToolWeight onClick={handleClickWeight}>
                    {isEditingWeight ? (
                        <StyledInput
                            isvalid={isValidWeight.toString()}
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
    id: string;
    containerId: string;
    ishovering?: boolean;
    children?: React.ReactNode;
    onMouseEnter?: React.MouseEventHandler<HTMLTableRowElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLTableRowElement>;
}



const DraggableItem: React.FC<DraggableItemProps> = ({ data, children, id, onMouseEnter, onMouseLeave, containerId, ishovering }) => {

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
        height: '40px',
        width: '100%',
        borderRadius: '10px',
    };

    if (ishovering || isDragging) {
        style = {
            ...style,
            color: 'rgba(28, 149, 255, 0.806)',
            backgroundColor: 'rgb(231, 243, 255)',
            border: '1px solid rgba(28, 149, 255, 0.806)',
        }
    }

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
        <AnimatedBorderElement
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
        </AnimatedBorderElement>
    );
};

export default DraggableTool;