"use client"

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import React from "react";
import Link from '@/components/Link'
import VisibilityIcon from "@mui/icons-material/Visibility";
import {MenuItem} from "@/components/features/menu/Menu";
import {NextLinkComposed} from "@/components/Link";

const ViewButton = (
    {href, type = "menuItem", title}: {
        href: string | { pathname: string, query?: { [key: string]: string | number } };
        type?: "menuItem" | "iconButton";
        title?: string;
    }) => {
    if (type === "iconButton") {
        return (
            <Tooltip title='View' placement="top">
                <Link noLinkStyle href={href}>
                    <IconButton size="small" aria-label="view">
                        <VisibilityIcon/>
                    </IconButton>
                </Link>
            </Tooltip>
        )
    }
    return (
        // <Link noLinkStyle href={href}>
        <MenuItem label={title ?? "View"} component={NextLinkComposed} to={href}/>
        //     {/*<ListItemIcon>*/}
        //     {/*    <VisibilityIcon className="text-xl inline-block"/>*/}
        //     {/*</ListItemIcon>*/}
        //     {/*<ListItemText className="text-base">{title ?? "View"}</ListItemText>*/}
        // {/*</MenuItem>*/}
        // </Link>
    )
}

export default ViewButton;