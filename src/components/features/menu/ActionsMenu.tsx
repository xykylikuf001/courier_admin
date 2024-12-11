"use client"
import {ReactNode} from "react";
import {MdMoreVert} from "react-icons/md";
import {Menu} from "@/components/features/menu/Menu";


const ActionsMenu = (
    {children}: { children: ReactNode; }) => {

    return (
        <Menu label={<MdMoreVert/>}>
            {children}
        </Menu>
    )
}

export default ActionsMenu;
