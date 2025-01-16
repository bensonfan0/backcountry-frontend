import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useCurrentInventoryState } from '@/app/inventory/page';
import { InventoryActions } from '@/app/inventory/inventoryReducer';
import { Category, TOOL_WINDOW_ID } from '@/data/constants';
import { v4 } from 'uuid';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Package } from '@phosphor-icons/react';

const ActionsHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
`;


const ListItem = styled.div`
    padding: 10px 10px 0 10px; 
    cursor: pointer;
`;

const ActionsHeader: React.FC = () => {
    const currentInventoryContext = useCurrentInventoryState()

    const addClick = () => {
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.ADD_TOOL,
            payload: {
                newTool: {
                    id: String(v4()),
                    name: '',
                    category: Category.CLOTHING,
                    weight: 0,
                },
                containerId: TOOL_WINDOW_ID,
            }
        })
    }

    const addBackpack = () => {
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.ADD_CONTAINER,
            payload: {
                containerId: `backpack ${v4()}`
            }
        })
    }

    return (
        <ActionsHeaderContainer>
            <ListItem>
                <IconButton onClick={addClick} color="primary" aria-label="add-gear">
                    <AddIcon />
                </IconButton>
            </ListItem>
            <ListItem>
                <IconButton onClick={addBackpack} color="primary">
                    <Package />
                </IconButton>
            </ListItem>
        </ActionsHeaderContainer>
    );
};

export default ActionsHeader;
