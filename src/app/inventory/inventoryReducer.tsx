import { Data } from "@/components/tool/toolWindow"
import { arrayMove } from "@dnd-kit/sortable";
import { TOOL_WINDOW_ID } from "@/data/constants";
import { itemsEqual } from "@dnd-kit/sortable/dist/utilities";

export enum InventoryActions {
    REPLACE_TOOL,
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
    }
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
            if (action.payload.overContainerId === undefined ||
                action.payload.toolId === undefined ||
                action.payload.overToolId === undefined
                // || action.payload.tool === undefined
            ) {
                console.log("Cannot splice tool as things are undefined");
                return state;
            }
            const activeItems = state[action.payload.containerId];
            const overItems = state[action.payload.overContainerId];

            const activeIndex = activeItems.findIndex(
                (item) => item.id === action.payload.toolId
            );
            let overIndex = activeItems.findIndex(
                (item) => item.id === action.payload.overToolId
            );

            // if (activeIndex === -1) {
            //     // really not sure how we get to this state where we don't know where the original
            //     return state
            // }

            let data = state[action.payload.containerId][activeIndex]

            // dragging over the same container
            if (activeItems === overItems && activeIndex !== -1) {
                return {
                    ...state,
                    [action.payload.overContainerId]: arrayMove(overItems, activeIndex, overIndex)
                }
            }
            // // WE ARE MOVING TOOL FROM TOOL WINDOW
            if (action.payload.containerId === TOOL_WINDOW_ID) {
                return {
                    ...state,
                    [action.payload.overContainerId]: [
                        ...state[action.payload.overContainerId].slice(0, overIndex),
                        // action.payload.tool,
                        data,
                        ...state[action.payload.overContainerId].slice(
                            overIndex,
                            state[action.payload.overContainerId].length
                        ),
                    ],
                };
            } else {
                return {
                    ...state,
                    [action.payload.containerId]: [
                        ...state[action.payload.containerId].filter(
                            (item) => item.id !== action.payload.toolId
                        ),
                    ],
                    [action.payload.overContainerId]: [
                        ...state[action.payload.overContainerId].slice(0, overIndex),
                        // action.payload.tool,
                        data,
                        ...state[action.payload.overContainerId].slice(
                            overIndex,
                            state[action.payload.overContainerId].length
                        ),
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
    };
    return data;
};
