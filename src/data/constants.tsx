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

export const categoryToIconMappings = {
    // food
    [Category.FOOD]: { icon: <Bread size={25} />, label: Category.FOOD },
    [Category.MEAT]: { icon: <IconMeat stroke={1.5} size={25} />, label: Category.MEAT },
    [Category.WATER]: { icon: <Drop size={25} />, label: Category.WATER },

    // clothing
    [Category.CLOTHING]: { icon: <IconShirt stroke={1.5} size={25} />, label: Category.CLOTHING },
    [Category.PANTS]: { icon: <Pants size={25} />, label: Category.PANTS },
    [Category.SHIRT]: { icon: <TShirt size={25} />, label: Category.SHIRT },
    [Category.ACCESSORIES]: { icon: <Watch size={25} />, label: Category.ACCESSORIES },
    [Category.JACKET]: { icon: <Hoodie size={25} />, label: Category.JACKET },
    [Category.BOOT]: { icon: <Boot size={25} />, label: Category.BOOT },
    [Category.SOCK]: { icon: <Sock size={25} />, label: Category.SOCK },

    // gear
    [Category.GEAR]: { icon: <Toolbox size={25} />, label: Category.GEAR },
    [Category.TENT]: { icon: <Tent size={25} />, label: Category.TENT },
    [Category.COOKWARE]: { icon: <CookingPot size={25} />, label: Category.COOKWARE },
    [Category.KNIFE]: { icon: <Knife size={25} />, label: Category.KNIFE },
    [Category.DEFENCE]: { icon: <Shield size={25} />, label: Category.DEFENCE },

    // toiletries
    [Category.TOILETRIES]: { icon: <Towel size={25} />, label: Category.TOILETRIES },
    [Category.HYGIENE]: { icon: <HandSoap size={25} />, label: Category.HYGIENE },
    [Category.TOILETPAPER]: { icon: <ToiletPaper size={25} />, label: Category.TOILETPAPER },
    [Category.FIRSTAID]: { icon: <FirstAid size={25} />, label: Category.FIRSTAID },
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

export const TOOL_WINDOW_ID = 'window-tool'