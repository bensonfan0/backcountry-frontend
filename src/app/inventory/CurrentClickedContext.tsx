"use client";
import { Data } from "@/components/tool/toolWindow";
import { createContext, useContext } from "react";

// there's got to be a better way to do this?
export interface CurrentClicked {
    containerId: string,
    id: string,
}

interface CurrentClickedContextType {
    currentClicked: CurrentClicked[];
    setCurrentClicked: React.Dispatch<React.SetStateAction<CurrentClicked[]>>;
}

export const isClicked = (containerId: string, id: string, currentClicked: CurrentClicked[]) => {
    return -1 !== currentClicked.findIndex((currentClicked: CurrentClicked) => {
        if (currentClicked.containerId === containerId && currentClicked.id === id) return true
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

