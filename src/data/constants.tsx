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
    FirstAid
} from '@phosphor-icons/react';
import {
    IconShirt,
    IconBaguette,
    IconMeat,
    IconSock,
    IconTent,
} from '@tabler/icons-react';

export enum Category {
    FOOD,
    MEAT,
    WATER,

    CLOTHING,
    PANTS,
    SHIRT,
    ACCESSORIES,
    JACKET,
    SOCK,
    BOOT,

    GEAR,
    TENT,
    COOKWARE,
    KNIFE,
    DEFENCE,

    HYGIENE,
    TOILETPAPER,
    FIRSTAID,
}

export const categoryToIconMappings = {
    [Category.FOOD]: { icon: <Bread size={25} />, label: Category.FOOD },
    [Category.MEAT]: { icon: <IconMeat stroke={1.5} size={25} />, label: Category.MEAT },
    [Category.WATER]: { icon: <Drop size={25} />, label: Category.WATER },

    [Category.CLOTHING]: { icon: <IconShirt stroke={1.5} size={25} />, label: Category.CLOTHING },
    [Category.PANTS]: { icon: <Pants size={25} />, label: Category.PANTS },
    [Category.SHIRT]: { icon: <TShirt size={25} />, label: Category.SHIRT },
    [Category.ACCESSORIES]: { icon: <Watch size={25} />, label: Category.ACCESSORIES },
    [Category.JACKET]: { icon: <Hoodie size={25} />, label: Category.JACKET },
    [Category.BOOT]: { icon: <Boot size={25} />, label: Category.BOOT },
    [Category.SOCK]: { icon: <Sock size={25} />, label: Category.SOCK },

    [Category.GEAR]: { icon: <Toolbox size={25} />, label: Category.GEAR },
    [Category.TENT]: { icon: <Tent size={25} />, label: Category.TENT },
    [Category.COOKWARE]: { icon: <CookingPot size={25} />, label: Category.COOKWARE },
    [Category.KNIFE]: { icon: <Knife size={25} />, label: Category.KNIFE },
    [Category.DEFENCE]: { icon: <Shield size={25} />, label: Category.DEFENCE },

    [Category.HYGIENE]: { icon: <HandSoap size={25} />, label: Category.HYGIENE },
    [Category.TOILETPAPER]: { icon: <ToiletPaper size={25} />, label: Category.TOILETPAPER },
    [Category.FIRSTAID]: { icon: <FirstAid size={25} />, label: Category.FIRSTAID },
};