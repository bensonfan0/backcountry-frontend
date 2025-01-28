"use client";
import { Data } from "@/components/tool/toolWindow";
import { createContext, useContext } from "react";
import { CurrentInventory, CurrentInventoryAction } from "./inventoryReducer";

interface DroppedDataContextType {
    data: Data | undefined;
    droppableId: string;
    droppedCount: number; // this can't be the right way to track when something is dropped
}
interface CurrentInventoryContextType {
    currentInventory: CurrentInventory;
    currentInventoryDispatcher: React.Dispatch<CurrentInventoryAction>;
}

export const DroppedDataContext = createContext<DroppedDataContextType | undefined>(undefined);

export const CurrentInventoryContext = createContext<CurrentInventoryContextType | undefined>(undefined);export const useCurrentInventoryState = () => {
    const context = useContext(CurrentInventoryContext);
    if (context === undefined) {
        throw new Error('useCurrentInventoryState must be used within a CountProvider');
    }
    return context;
};

