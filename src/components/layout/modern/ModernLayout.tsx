"use client"
import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SideMenu from "@/components/layout/modern/SideMenu";
import AppNavbar from "@/components/layout/modern/AppNavbar";
import {alpha} from "@mui/material/styles";
import Header from "@/components/layout/modern/Header";
// import MainGrid from "@/components/layout/modern/MainGrid";

const ModernLayout = ({children}: { children: React.ReactNode }) => {
    return (

        <Box sx={{display: 'flex'}}>
            <SideMenu/>
            <AppNavbar/>
            {/* Main content */}
            <Box
                component="main"
                sx={(theme) => ({
                    width: "100%",
                    backgroundColor: alpha(theme.palette.background.default, 1),
                    overflow: 'auto',
                })}
            >

                <Stack
                    spacing={2}
                    sx={{
                        alignItems: 'center',
                        mx: 3,
                        pb: 5,
                        mt: { xs: 8, md: 0 },
                    }}
                >
                    <Header/>
                    {/*<MainGrid/>*/}

                    <Box sx={{
                        width: '100%',
                        my: 5,
                        maxWidth: {sm: '100%', md: '1700px'}
                        }}
                    >
                        {children}
                    </Box>

                </Stack>
            </Box>
        </Box>
    )
}

export default ModernLayout;