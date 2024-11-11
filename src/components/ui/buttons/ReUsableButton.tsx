"use client"
import React, {ReactNode} from "react";

import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useConfirm} from "material-ui-confirm";
import {MdSmartButton} from "react-icons/md";
import {toastLoading, toastUpdate} from "@/lib/helper";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@/components/Link";

interface Props {
    onClick?: (callback: (props: { isError: boolean, message?: string | null }) => Promise<void>) => Promise<void>;
    title: string;
    icon?: ReactNode;
    onCancel?: () => Promise<void>;
    confirmText?: string;
    type: "menuItem" | "iconButton" | "linkType";
    href?: string;
}

const ReUsableButton = (
    {
        onClick,
        title,
        icon,
        onCancel,
        confirmText,
        type,
        href="/",
    }: Props) => {
    const confirm = useConfirm()

    const handleClick = () => {
        confirm(
            {'title': confirmText ?? "Do you want to perform this action!?"}
        ).then(async () => {
            const toastId = toastLoading("Please wait!")
            const callback = async (props: { isError: boolean, message?: string | null }) => {
                if (props.isError) {
                    toastUpdate(toastId, props.message ?? "Something went wrong!", 'warning');
                } else {
                    toastUpdate(toastId, props.message ?? "Action successfully done!", 'success');
                }
            }
            if (onClick) await onClick(callback)
        }).catch(async () => {
            if (onCancel) await onCancel()
        })
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

export default ReUsableButton;