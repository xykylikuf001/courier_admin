"use client"
import React from "react";
import {MdAdd} from "react-icons/md";
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

import Link from '@/components/Link';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const AddButton = (
    {href, type="menuItem"}: {
        href: string | { pathname: string, query?: { [key: string]: string | number } };
        type?: "menuItem" | "iconButton";
    }) => {
    if (type==="iconButton"){
        return (
            <Tooltip title='Add' placement="top">
                <Link href={href}>
                    <IconButton aria-label="add">
                        <MdAdd/>
                    </IconButton>
                </Link>
            </Tooltip>
        )
    }
    return (
        <Link noLinkStyle href={href}>
            <MenuItem disableRipple>
                <ListItemIcon>
                    <MdAdd className="text-xl inline-block"/>
                </ListItemIcon>
                <ListItemText className="text-base">Add</ListItemText>
            </MenuItem>
        </Link>
    )
}

export default AddButton;
