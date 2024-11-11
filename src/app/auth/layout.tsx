import React from "react";
import {Paper} from '@mui/material'

export default function Layout({children}: { children: React.ReactNode; }) {
    return (
        <Paper sx={{
            display: "flex",
            height: "100vh",
            width: "100%"
        }}>
            {children}
        </Paper>
    )

}