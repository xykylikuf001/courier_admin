"use client"

import React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import Box from '@mui/material/Box';
import {Menu, MenuItem} from "@/components/features/menu/Menu";

import { useColorScheme } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

export default function ColorModeIconDropdown({className=""}: {className?: string}) {
    const { mode, systemMode, setMode } = useColorScheme();
    const handleMode = (targetMode: 'system' | 'light' | 'dark') => () => {
        setMode(targetMode);
    };
    if (!mode) {
        return (
            <Box
                data-screenshot="toggle-mode"
                sx={(theme: Theme) => ({
                    verticalAlign: 'bottom',
                    display: 'inline-flex',
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: theme.shape.borderRadius,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                })}
            />
        );
    }
    const resolvedMode = (systemMode || mode) as 'light' | 'dark';
    const icon = {
        light: <LightModeIcon />,
        dark: <DarkModeIcon />,
    }[resolvedMode];

    return (
        <Menu label={icon} className={className}>
            <MenuItem label="System" onClick={handleMode('system')}/>
            <MenuItem label="Light" onClick={handleMode('light')}/>
            <MenuItem label="Dark" onClick={handleMode('dark')}/>
        </Menu>
    )
}