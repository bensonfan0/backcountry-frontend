import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { ChangeEvent, KeyboardEvent } from 'react';
import { FunnelSimple } from '@phosphor-icons/react';
import { useCurrentInventoryState } from '@/app/inventory/CurrentInventoryContext';
import { InventoryActions } from '@/app/inventory/inventoryReducer';
import { TOOL_WINDOW_ID } from '@/data/constants';

interface SearchInputType {
    onChange: (name: string) => void
}

export default function SearchInput({ onChange }: SearchInputType) {
    const currentInventoryContext = useCurrentInventoryState()

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }
    
    const sortAlphabetically = () => {
        currentInventoryContext.currentInventoryDispatcher({
            type: InventoryActions.SORT_ALPHABETICALLY,
            payload: {
                containerId: TOOL_WINDOW_ID
            }
        })
    }
    return (
        <div
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', padding: '10px 10px 0 10px', }}
        >
            <IconButton onClick={sortAlphabetically}>
                <FunnelSimple size={25} />
            </IconButton>
            <InputBase
                sx={{ width: '280px', padding: '0 0 0 10px' }}
                placeholder="search items..."
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={handleOnChange}
            />
            <SearchIcon />
        </div>
    );
}