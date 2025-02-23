"use client";
import { Data } from "@/components/tool/toolWindow";
import { createContext, useContext } from "react";

// there's got to be a better way to do this?
export interface _ {
    containerId: string,
    id: string,
}

interface CurrentClickedContextType {
    currentClicked: Data[];
    setCurrentClicked: React.Dispatch<React.SetStateAction<Data[]>>;
}

export const isClicked = (id: string, currentClicked: Data[]) => {
    return -1 !== currentClicked.findIndex((currentClicked: Data) => {
        if (currentClicked.id === id) return true
    })
}

export const CurrentClickedContext = createContext<CurrentClickedContextType | undefined>(undefined);

export const useCurrentClickedState = () => {
    const context = useContext(CurrentClickedContext);
    if (context === undefined) {
        throw new Error('useCurrentClickedState must be used within a CountProvider');
    }
    return context;
};

