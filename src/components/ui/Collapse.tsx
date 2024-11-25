"use client"
import {ReactNode} from "react";
import MuiCollapse from '@mui/material/Collapse';
import {TransitionProps} from "@mui/material/transitions/transition";

interface Props {
    children: ReactNode;
    expanded?: boolean;
    /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     *
     * Set to 'auto' to automatically calculate transition time based on height.
     * @default duration.standard
     */
    timeout?: TransitionProps['timeout'] | 'auto';
}

const Collapse = ({children, expanded=true, timeout}: Props)=>{
    return (
        <MuiCollapse in={expanded} timeout={timeout} unmountOnExit>
            {children}
        </MuiCollapse>
    )
}

export default Collapse;