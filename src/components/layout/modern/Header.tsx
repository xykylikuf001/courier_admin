"use client"
import React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import DatePicker from '@/components/ui/forms/fields/DatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '@/shared-theme/ColorModeIconDropdown';

import Search from './Search';
// import IconButton from "@mui/material/IconButton";
// import {FaBars, FaWindowClose} from "react-icons/fa";
// import {useThemeContext} from "@/lib/theme-provider";

export default function Header() {
    // const {drawer, toggleDrawer} = useThemeContext()

    return (
        <Stack
            direction="row"
            sx={{
                display: { xs: 'none', md: 'flex' },
                width: '100%',
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                maxWidth: { sm: '100%', md: '1700px' },
                pt: 1.5,
            }}
            spacing={2}
        >

            {/*<IconButton className="mr-2 md:-ml-3" size="small" onClick={toggleDrawer}>*/}
            {/*    {drawer?<FaWindowClose/>:<FaBars/>}*/}
            {/*</IconButton>*/}
            <NavbarBreadcrumbs />
            <Stack direction="row" sx={{ gap: 1 }}>
                <Search />
                <DatePicker />
                <MenuButton showBadge aria-label="Open notifications">
                    <NotificationsRoundedIcon />
                </MenuButton>
                <ColorModeIconDropdown />
            </Stack>
        </Stack>
    );
}