"use client"

import {Stack, Toolbar, Box} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {MdBrightness4, MdBrightness7} from "react-icons/md";
import {FaBars} from 'react-icons/fa';

import Link from "@/components/Link";
import {useThemeContext} from "@/lib/theme-provider";
import {PROJECT_NAME} from "@/lib/constants";
import AppSettings from "../AppSettings";

import {StyledAppBar, StyledPaper, StyledIconButton, StyledTitle} from "./styled";


const Header = () => {
    const {mode, toggleTheme, toggleDrawer} = useThemeContext()
    return (
        <StyledAppBar position="fixed" elevation={0}>
            <StyledPaper>
                <Toolbar>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton className="mr-2 md:-ml-3" size="small" onClick={toggleDrawer}>
                            <FaBars/>
                        </IconButton>
                        <Link href="/dashboard" passHref>
                            <StyledTitle variant="h6">
                                {PROJECT_NAME}
                            </StyledTitle>
                        </Link>
                    </Stack>
                    <Box component="div" sx={{flexGrow: 1}}/>
                    <Stack>
                        <IconButton sx={{ml: 1}} onClick={toggleTheme} color="inherit">
                            {mode === 'dark' ? <MdBrightness7/> : <MdBrightness4/>}
                        </IconButton>
                    </Stack>
                    <Stack direction="row" alignItems="center" style={{marginLeft: 10}}>
                        <AppSettings/>
                    </Stack>
                </Toolbar>
            </StyledPaper>
        </StyledAppBar>
    )
}

export default Header;