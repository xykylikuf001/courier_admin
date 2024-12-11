"use client"

import React from 'react';
import {styled} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, {drawerClasses} from '@mui/material/Drawer';
import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
// import CardAlert from './CardAlert';
// import OptionsMenu from './OptionsMenu';
import UserButton from "./user-button";
import {useAuthContext} from "@/lib/auth/provider";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

export default function SideMenu() {
    const {user} = useAuthContext();
    // const {drawer, toggleDrawer} = useThemeContext()

    return (
        <Drawer
            // open={false}
            // open={drawer}
            variant="permanent"
            sx={{
                display: {xs: 'none', md: 'block'},
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: 'background.paper',
                },
            }}

            // onClose={() => toggleDrawer()}
        >
            {/*<Box*/}
            {/*    sx={{*/}
            {/*        display: 'flex',*/}
            {/*        mt: 'calc(var(--template-frame-height, 0px) + 4px)',*/}
            {/*        p: 1.5,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <SelectContent />*/}
            {/*</Box>*/}
            {/*<Divider />*/}
            <MenuContent/>
            {/*<CardAlert />*/}
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Avatar
                    sizes="small"
                    alt=""
                    sx={{width: 36, height: 36}}
                />
                <Box sx={{mr: 'auto'}}>
                    <Typography variant="body2" sx={{fontWeight: 500, lineHeight: '16px'}}>
                        {user?.name}
                    </Typography>
                    <Typography variant="caption" sx={{color: 'text.secondary'}}>
                        {user?.email}
                    </Typography>
                </Box>
                <UserButton placement="top"/>
            </Stack>
        </Drawer>
    );
}