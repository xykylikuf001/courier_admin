"use client"

import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";

import React from "react";
import Link from '@/components/Link'
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ViewButton = (
    {href, type="menuItem", title}: {
        href: string | { pathname: string, query?: { [key: string]: string | number } };
        type?: "menuItem" | "iconButton";
        title?: string;
    }) => {
    if (type==="iconButton"){
        return (
            <Tooltip title='View' placement="top">
                <Link href={href}>
                    <IconButton aria-label="view">
                        <VisibilityIcon/>
                    </IconButton>
                </Link>
            </Tooltip>
        )
    }
    return (
        <Link noLinkStyle href={href}>
            <MenuItem disableRipple>
                <ListItemIcon>
                    <VisibilityIcon className="text-xl inline-block"/>
                </ListItemIcon>
                <ListItemText className="text-base">{title??"View"}</ListItemText>
            </MenuItem>
        </Link>
    )
}

export default ViewButton;