import {
    Bread,
    Pants,
    Sock,
    Boot,
    Tent,
    HandSoap,
    Toolbox,
    Knife,
    Hoodie,
    Watch,
    TShirt,
    CookingPot,
    Shield,
    ToiletPaper,
    Drop,
    FirstAid,
    Towel
} from '@phosphor-icons/react';
import {
    IconShirt,
    IconMeat,
} from '@tabler/icons-react';

export enum Category {
    FOOD = "FOOD",
    MEAT = "MEAT",
    WATER = "WATER",

    CLOTHING = "CLOTHING",
    PANTS = "PANTS",
    SHIRT = "SHIRT",
    ACCESSORIES = "ACCESSORIES",
    JACKET = "JACKET",
    SOCK = "SOCK",
    BOOT = "BOOT",

    GEAR = "GEAR",
    TENT = "TENT",
    COOKWARE = "COOKWARE",
    KNIFE = "KNIFE",
    DEFENCE = "DEFENCE",

    TOILETRIES = "TOILETRIES",
    HYGIENE = "HYGIENE",
    TOILETPAPER = "TOILETPAPER",
    FIRSTAID = "FIRSTAID",
}

export const categoryMappings = {
    // food
    [Category.FOOD]: { icon: <Bread size={25} />, label: Category.FOOD, category: Category.FOOD},
    [Category.MEAT]: { icon: <IconMeat stroke={1.5} size={25} />, label: Category.MEAT, category: Category.FOOD },
    [Category.WATER]: { icon: <Drop size={25} />, label: Category.WATER, category: Category.FOOD },

    // clothing
    [Category.CLOTHING]: { icon: <IconShirt stroke={1.5} size={25} />, label: Category.CLOTHING, category: Category.CLOTHING },
    [Category.PANTS]: { icon: <Pants size={25} />, label: Category.PANTS, category: Category.CLOTHING },
    [Category.SHIRT]: { icon: <TShirt size={25} />, label: Category.SHIRT, category: Category.CLOTHING },
    [Category.ACCESSORIES]: { icon: <Watch size={25} />, label: Category.ACCESSORIES, category: Category.CLOTHING },
    [Category.JACKET]: { icon: <Hoodie size={25} />, label: Category.JACKET, category: Category.CLOTHING },
    [Category.BOOT]: { icon: <Boot size={25} />, label: Category.BOOT, category: Category.CLOTHING },
    [Category.SOCK]: { icon: <Sock size={25} />, label: Category.SOCK, category: Category.CLOTHING },

    // gear
    [Category.GEAR]: { icon: <Toolbox size={25} />, label: Category.GEAR, category: Category.GEAR },
    [Category.TENT]: { icon: <Tent size={25} />, label: Category.TENT, category: Category.GEAR },
    [Category.COOKWARE]: { icon: <CookingPot size={25} />, label: Category.COOKWARE, category: Category.GEAR },
    [Category.KNIFE]: { icon: <Knife size={25} />, label: Category.KNIFE, category: Category.GEAR },
    [Category.DEFENCE]: { icon: <Shield size={25} />, label: Category.DEFENCE, category: Category.GEAR },

    // toiletries
    [Category.TOILETRIES]: { icon: <Towel size={25} />, label: Category.TOILETRIES, category: Category.TOILETRIES },
    [Category.HYGIENE]: { icon: <HandSoap size={25} />, label: Category.HYGIENE, category: Category.TOILETRIES },
    [Category.TOILETPAPER]: { icon: <ToiletPaper size={25} />, label: Category.TOILETPAPER, category: Category.TOILETRIES },
    [Category.FIRSTAID]: { icon: <FirstAid size={25} />, label: Category.FIRSTAID, category: Category.TOILETRIES },
};

export const categoryToIconMappingsNew = {
    // food
    [Category.FOOD]: {
        icon: <Bread size={25} />,
        label: Category.FOOD,
        subCategories: {
            [Category.MEAT]: { icon: <IconMeat stroke={1.5} size={25} />, label: Category.MEAT },
            [Category.WATER]: { icon: <Drop size={25} />, label: Category.WATER },
        }
    },

    // clothing
    [Category.CLOTHING]: {
        icon: <IconShirt stroke={1.5} size={25} />,
        label: Category.CLOTHING,
        subCategories: {
            [Category.PANTS]: { icon: <Pants size={25} />, label: Category.PANTS },
            [Category.SHIRT]: { icon: <TShirt size={25} />, label: Category.SHIRT },
            [Category.ACCESSORIES]: { icon: <Watch size={25} />, label: Category.ACCESSORIES },
            [Category.JACKET]: { icon: <Hoodie size={25} />, label: Category.JACKET },
            [Category.BOOT]: { icon: <Boot size={25} />, label: Category.BOOT },
            [Category.SOCK]: { icon: <Sock size={25} />, label: Category.SOCK },
        }
    },

    // gear
    [Category.GEAR]: {
        icon: <Toolbox size={25} />,
        label: Category.GEAR,
        subCategories: {
            [Category.TENT]: { icon: <Tent size={25} />, label: Category.TENT },
            [Category.COOKWARE]: { icon: <CookingPot size={25} />, label: Category.COOKWARE },
            [Category.KNIFE]: { icon: <Knife size={25} />, label: Category.KNIFE },
            [Category.DEFENCE]: { icon: <Shield size={25} />, label: Category.DEFENCE },
        }
    },

    // toiletries
    [Category.TOILETRIES]: {
        icon: <Towel size={25} />,
        label: Category.TOILETRIES,
        subCategories: {
            [Category.HYGIENE]: { icon: <HandSoap size={25} />, label: Category.HYGIENE },
            [Category.TOILETPAPER]: { icon: <ToiletPaper size={25} />, label: Category.TOILETPAPER },
            [Category.FIRSTAID]: { icon: <FirstAid size={25} />, label: Category.FIRSTAID },
        }
    }
};

export const categoryToColorMapping = {
    // food
    [Category.FOOD]: { 
        backgroundColor: 'rgba(255, 223, 186, 0.5)', // light orange
        borderColor: 'rgba(255, 165, 0, 1)' // orange
    },
    [Category.MEAT]: { 
        backgroundColor: 'rgba(255, 204, 204, 0.5)', // light red
        borderColor: 'rgba(255, 99, 71, 1)' // tomato
    },
    [Category.WATER]: { 
        backgroundColor: 'rgba(173, 216, 230, 0.5)', // light blue
        borderColor: 'rgba(0, 191, 255, 1)' // deep sky blue
    },

    // clothing
    [Category.CLOTHING]: { 
        backgroundColor: 'rgba(240, 240, 240, 0.5)', // light grey
        borderColor: 'rgba(169, 169, 169, 1)' // dark grey
    },
    [Category.PANTS]: { 
        backgroundColor: 'rgba(192, 192, 192, 0.5)', // silver
        borderColor: 'rgba(128, 128, 128, 1)' // grey
    },
    [Category.SHIRT]: { 
        backgroundColor: 'rgba(255, 228, 225, 0.5)', // misty rose
        borderColor: 'rgba(255, 105, 180, 1)' // hot pink
    },
    [Category.ACCESSORIES]: { 
        backgroundColor: 'rgba(255, 239, 213, 0.5)', // papaya whip
        borderColor: 'rgba(255, 215, 0, 1)' // gold
    },
    [Category.JACKET]: { 
        backgroundColor: 'rgba(211, 211, 211, 0.5)', // light grey
        borderColor: 'rgba(105, 105, 105, 1)' // dim grey
    },
    [Category.BOOT]: { 
        backgroundColor: 'rgba(210, 180, 140, 0.5)', // tan
        borderColor: 'rgba(139, 69, 19, 1)' // saddle brown
    },
    [Category.SOCK]: { 
        backgroundColor: 'rgba(245, 245, 245, 0.5)', // white smoke
        borderColor: 'rgba(169, 169, 169, 1)' // dark grey
    },

    // gear
    [Category.GEAR]: { 
        backgroundColor: 'rgba(200, 200, 200, 0.5)', // light grey
        borderColor: 'rgba(128, 128, 128, 1)' // grey
    },
    [Category.TENT]: { 
        backgroundColor: 'rgba(144, 238, 144, 0.5)', // light green
        borderColor: 'rgba(34, 139, 34, 1)' // forest green
    },
    [Category.COOKWARE]: { 
        backgroundColor: 'rgba(255, 250, 205, 0.5)', // lemon chiffon
        borderColor: 'rgba(255, 215, 0, 1)' // gold
    },
    [Category.KNIFE]: { 
        backgroundColor: 'rgba(192, 192, 192, 0.5)', // silver
        borderColor: 'rgba(169, 169, 169, 1)' // dark grey
    },
    [Category.DEFENCE]: { 
        backgroundColor: 'rgba(220, 220, 220, 0.5)', // gainsboro
        borderColor: 'rgba(105, 105, 105, 1)' // dim grey
    },

    // toiletries
    [Category.TOILETRIES]: { 
        backgroundColor: 'rgba(255, 239, 213, 0.5)', // papaya whip
        borderColor: 'rgba(255, 222, 173, 1)' // navajo white
    },
    [Category.HYGIENE]: { backgroundColor: 'rgba(224, 255, 255, 0.5)', // light cyan
        borderColor: 'rgba(0, 255, 255, 1)' // cyan
    },
    [Category.TOILETPAPER]: { 
        backgroundColor: 'rgba(245, 245, 245, 0.5)', // white smoke
        borderColor: 'rgba(211, 211, 211, 1)' // light grey
    },
    [Category.FIRSTAID]: { 
        backgroundColor: 'rgba(255, 182, 193, 0.5)', // light pink
        borderColor: 'rgba(255, 20, 147, 1)' // deep pink
    },
}

export const TOOL_WINDOW_ID = 'window-tool'