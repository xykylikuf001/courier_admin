"use client"
import React, {ReactNode} from "react";

import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {MdSmartButton} from "react-icons/md";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Link from "@/components/Link";

interface Props {
    onClick?: () => void;
    title: string;
    icon?: ReactNode;
    confirmText?: string;
    type: "menuItem" | "iconButton" | "linkType";
    href?: string;
}

const SimpleButton = (
    {
        onClick,
        title,
        icon,
        type,
        href="/",
    }: Props) => {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    }

    if (type === 'iconButton') {
        return (
            <Tooltip title={title} placement="top">
                <IconButton
                    onClick={() => handleClick()} aria-label="button">
                    {icon ? icon : <MdSmartButton/>}
                </IconButton>
            </Tooltip>
        )
    } else if (type === "linkType") {
        return (
            <Link noLinkStyle href={href}>
                <MenuItem disableRipple>
                    <ListItemIcon>
                        {icon ? icon : <MdSmartButton />}
                    </ListItemIcon>
                    <ListItemText className="text-base">{title}</ListItemText>
                </MenuItem>
            </Link>
        )
    }
    return (
        <MenuItem disableRipple onClick={handleClick}>
            <ListItemIcon className="text-xl">
                {icon ? icon : <MdSmartButton className="text-xl inline-block"/>}
            </ListItemIcon>
            <ListItemText className="text-base">{title}</ListItemText>
        </MenuItem>
    );

}

export default SimpleButton;