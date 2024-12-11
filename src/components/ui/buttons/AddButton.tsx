"use client"
import React from "react";
import {MdAdd} from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import Link, {NextLinkComposed} from '@/components/Link';
import {MenuItem} from "@/components/features/menu/Menu";

const AddButton = (
    {href, type="menuItem"}: {
        href: string | { pathname: string, query?: { [key: string]: string | number } };
        type?: "menuItem" | "iconButton";
    }) => {
    if (type==="iconButton"){
        return (
            <Tooltip title='Add' placement="top">
                <Link noLinkStyle href={href}>
                    <IconButton size="small" aria-label="add">
                        <MdAdd/>
                    </IconButton>
                </Link>
            </Tooltip>
        )
    }
    return (
        <MenuItem label="Add" component={NextLinkComposed} to={href}/>

        // <Link noLinkStyle href={href}>
        //     <MenuItem disableRipple>
        //         <ListItemIcon>
        //             <MdAdd className="text-xl inline-block"/>
        //         </ListItemIcon>
        //         <ListItemText className="text-base">Add</ListItemText>
        //     </MenuItem>
        // </Link>
    )
}

export default AddButton;
