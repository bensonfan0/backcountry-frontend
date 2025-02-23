import { Data } from "@/components/tool/toolWindow"
import { arrayMove } from "@dnd-kit/sortable";
import { TOOL_WINDOW_ID } from "@/data/constants";
import { itemsEqual } from "@dnd-kit/sortable/dist/utilities";
// import { CurrentClicked } from "./CurrentClickedContext";
import { v4 } from "uuid";

export enum InventoryActions {
    REPLACE_TOOL,
    REPLACE_TOOLS,
    ADD_TOOL,
    ADD_TOOLS,
    ADD_CONTAINER,
    REMOVE,
    REMOVE_CONTAINER,
    SPLICE,
    FILTER_FROM_CONTAINERS,
    SORT_ALPHABETICALLY,
}

export interface CurrentInventoryAction {
    type: InventoryActions,
    payload: {
        containerId: string,
        newTool?: Data,
        newTools?: Data[],
        toolId?: string,
        overToolId?: string,
        overContainerId?: string,
        tool?: Data,
        currentClicked?: Data[],
        toBeReplaced?: Data[],
    }
}

function moveMultipleItems(array: Data[], fromIndices: number[], toIndex: number) {
    const itemsToMove = fromIndices.map(index => array[index]);
    const newArray = array.filter((_, index) => !fromIndices.includes(index));

    newArray.splice(toIndex, 0, ...itemsToMove);
    return newArray;
}

function findIndicesOfSubset(container: Data[], subset: Data[]) {
    const subsetSet = new Set(subset.map(item => item.id));
    
    return container.reduce<number[]>((indices, item, index) => {
        if (subsetSet.has(item.id)) {
            indices.push(index);
        }
        return indices;
    }, []);
}

export type CurrentInventory = { [key: string]: Data[] }

export function currentInventoryReducer(state: CurrentInventory, action: CurrentInventoryAction): CurrentInventory {
    switch (action.type) {
        case InventoryActions.SORT_ALPHABETICALLY:
            return {
                ...state,
                [action.payload.containerId]: state[action.payload.containerId].sort((a: Data, b: Data) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                })
            }
        case InventoryActions.REPLACE_TOOL:
            if (action.payload.toolId === undefined || action.payload.newTool === undefined) {
                console.log("Cannot replace tool as toolId or newTool does not exists");
                return state;
            }
            const newTool: Data = action.payload.newTool

            const newItems = state[action.payload.containerId].map(item =>
                item.id === action.payload.toolId ? newTool : item
            );
            return {
                ...state,
                [action.payload.containerId]: newItems
            };
        case InventoryActions.REPLACE_TOOLS:
            if (action.payload.containerId === undefined || action.payload.toBeReplaced === undefined) {
                console.log("Cannot replace tool as containerId or toolId or newTool does not exists");
                return state;
            }
            // remove original items
            let idSet = new Set(action.payload.toBeReplaced.map(tool => tool.id))
            const newTools = state[action.payload.containerId].map(item =>
                idSet.has(item.id) ? {...item, id: v4()} : item
            );

            return {
                ...state,
                [action.payload.containerId]: newTools
            };
        case InventoryActions.ADD_CONTAINER:
            return {
                ...state,
                [action.payload.containerId]: []
            };
        case InventoryActions.ADD_TOOLS:
            if (action.payload.newTools === undefined) {
                console.log("Cannot add new tool as new tool does not exists");
                return state;
            }
            return {
                ...state,
                [action.payload.containerId]: [...action.payload.newTools]
            };
        case InventoryActions.ADD_TOOL:
            // TODO
            if (action.payload.newTool === undefined) {
                console.log("Cannot add new tool as new tool does not exists");
                return state;
            }
            return {
                ...state,
                [action.payload.containerId]: [
                    action.payload.newTool,
                    ...state[action.payload.containerId]
                ]
            };
        case InventoryActions.REMOVE:
            if (action.payload.toolId === undefined) {
                console.log("Cannot remove tool as toolid does not exists");
                return state;
            }
            return {
                ...state,
                [action.payload.containerId]: state[action.payload.containerId].filter(row => row.id !== action.payload.toolId)
            };
        case InventoryActions.REMOVE_CONTAINER:
            delete state[action.payload.containerId];
            return {
                ...state
            };
        case InventoryActions.FILTER_FROM_CONTAINERS:
            if (action.payload.toolId === undefined) {
                console.log("Cannot filter out tool as tool id does not exist")
                return state
            }
            return {
                ...state,
                [action.payload.containerId]: state[action.payload.containerId].filter((item) => item.id !== action.payload.toolId)
            }
        case InventoryActions.SPLICE:
            if (
                action.payload.overContainerId === undefined ||
                action.payload.overToolId === undefined ||
                action.payload.containerId === undefined ||
                action.payload.currentClicked === undefined
            ) {
                console.log("Cannot splice tool as things are undefined");
                return state;
            }
            
            const subset = new Set(action.payload.currentClicked.map(item => item.id));
            
            // Clone the active items
            const activeItems = state[action.payload.containerId]
                .filter(item => subset.has(item.id))
                .map(item => ({ ...item }));
            
            const overItems = state[action.payload.overContainerId];
            const overIndex = overItems.findIndex(item => item.id === action.payload.overToolId);
            
            if (action.payload.currentClicked.length === 0) return state;

            let indices = findIndicesOfSubset(
                state[action.payload.overContainerId],
                action.payload.currentClicked
            )
            
            // Check if dragging over the same container
            if (action.payload.containerId === action.payload.overContainerId) {
                return {
                    ...state,
                    [action.payload.overContainerId]: moveMultipleItems(overItems, indices, overIndex),
                };
            }
            
            // Moving tool from tool window
            if (action.payload.containerId === TOOL_WINDOW_ID) {
                return {
                    ...state,
                    [action.payload.overContainerId]: [
                        ...overItems.slice(0, overIndex),
                        ...activeItems,
                        ...overItems.slice(overIndex),
                    ],
                };
            } else {
                return {
                    ...state,
                    [action.payload.containerId]: state[action.payload.containerId].filter(
                        item => !subset.has(item.id)
                    ),
                    [action.payload.overContainerId]: [
                        ...overItems.slice(0, overIndex),
                        ...activeItems,
                        ...overItems.slice(overIndex),
                    ],
                };
            }
        default:
            throw new Error('Current Inventory Unhandled action type');
    }
}
export const createData = (eventData: any) => {
    const data: Data = {
        name: eventData.name,
        weight: eventData.weight,
        category: eventData.category,
        id: eventData.id,
        containerId: eventData.containerId,
    };
    return data;
};
