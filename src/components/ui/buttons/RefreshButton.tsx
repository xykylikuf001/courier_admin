"use client"
import React from "react";

import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {MdRefresh} from "react-icons/md";
import {useConfirm} from "material-ui-confirm";

const RefreshButton = ({onClick}: { onClick: () => void }) => {
    const confirm = useConfirm()

    const handleClick = () => {
        confirm({'title': "Do you want to refresh!?"}).then(async () => onClick())
    }

    return (
        <Tooltip title="Refresh" placement="top">
            <IconButton
                onClick={() => handleClick()} aria-label="refresh">
                <MdRefresh/>
            </IconButton>
        </Tooltip>
    )
}

export default RefreshButton;