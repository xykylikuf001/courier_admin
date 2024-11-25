"use client"
import React from "react";
import {MdTranslate} from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

import Link from '@/components/Link';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const TranslationButton = (
    {href, type="menuItem"}: {
        href: string | { pathname: string, query?: { [key: string]: string | number } };
        type?: "menuItem" | "iconButton";
    }) => {
    if (type==="iconButton"){
        return (
            <Tooltip title='Translation' placement="top">
                <Link href={href}>
                    <IconButton aria-label="translation">
                        <MdTranslate/>
                    </IconButton>
                </Link>
            </Tooltip>
        )
    }
    return (
        <Link noLinkStyle href={href}>
            <MenuItem disableRipple>
                <ListItemIcon>
                    <MdTranslate className="text-xl inline-block"/>
                </ListItemIcon>
                <ListItemText className="text-base">Translations</ListItemText>
            </MenuItem>
        </Link>
    )
}

export default TranslationButton;
