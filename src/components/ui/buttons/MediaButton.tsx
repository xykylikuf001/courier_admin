"use client"
import React from "react";
import {MdImage} from "react-icons/md";
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

import Link from '@/components/Link';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const MediaButton = (
    {href, type="menuItem"}: {
        href: string | { pathname: string, query?: { [key: string]: string | number } };
        type?: "menuItem" | "iconButton";
    }) => {
    if (type==="iconButton"){
        return (
            <Tooltip title='Medias' placement="top">
                <Link href={href}>
                    <IconButton aria-label="media">
                        <MdImage/>
                    </IconButton>
                </Link>
            </Tooltip>
        )
    }
    return (
        <Link noLinkStyle href={href}>
            <MenuItem disableRipple>

                <ListItemIcon>
                    <MdImage className="text-xl inline-block"/>
                </ListItemIcon>
                <ListItemText className="text-base">Medias</ListItemText>

            </MenuItem>
        </Link>
    )
}

export default MediaButton;
