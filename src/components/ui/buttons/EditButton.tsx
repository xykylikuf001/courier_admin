"use client"
import React from "react";
import {MdEdit} from "react-icons/md";
import ListItemIcon from '@mui/material/ListItemIcon';

import ListItemText from '@mui/material/ListItemText';
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

import Link from '@/components/Link';

const EditButton = (
    {href, type="menuItem"}: {
        href: string | { pathname: string, query?: { [key: string]: string | number } };
        type?: "menuItem" | "iconButton";
    }) => {
    if (type==="iconButton"){
        return (
            <Tooltip title='Edit' placement="top">
                <Link href={href}>
                    <IconButton aria-label="edit">
                        <MdEdit/>
                    </IconButton>
                </Link>
            </Tooltip>
        )
    }
    return (
        <Link noLinkStyle href={href}>
            <MenuItem disableRipple>
                <ListItemIcon>
                    <MdEdit className="text-xl inline-block"/>
                </ListItemIcon>
                <ListItemText className="text-base">Edit</ListItemText>
            </MenuItem>
        </Link>
    )
}

export default EditButton;
