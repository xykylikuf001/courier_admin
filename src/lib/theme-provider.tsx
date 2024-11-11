"use client"

import React, {ReactNode, useEffect, useState} from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles'

import {ToastContainer} from 'react-toastify';
import {parseCookies, setCookie} from 'nookies';
import {ConfirmProvider} from 'material-ui-confirm'

import { Theme as MaterialUITheme } from "@mui/system";
import {createTheme} from "@mui/material/styles"


import {
    COOKIE_ENABLE_SECURE,
    COOKIE_DEFAULT_AGE,
    COOKIE_PATH,
    COOKIE_SAME_SITE,
    COOKIE_THEME,
    COOKIE_DRAWER_STATE
} from '@/lib/constants'
import {getResolution} from '@/lib/helper'

export type ThemeContextType = {
    mode: ITheme;
    toggleTheme: () => void;
    drawer: boolean;
    toggleDrawer: () => void;
}

export type ITheme = 'dark' | 'light'


// Re-declare the emotion theme to have the properties of the MaterialUiTheme
declare module '@emotion/react' {
    export interface Theme extends MaterialUITheme {}
}


export const getTheme = (mode: "light" | "dark") => {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: "#2196f3",
                dark: "#1769aa",
                light: "#4dabf5",
                contrastText: "#fff"
            },
            success: {
                main: "#66BB6A"
            },
            info: {
                main: "#90CAF9"
            },
            secondary: {
                main: "#19857b"
            },
            error: {
                main: "#CF3050"
            },

            background: {
                paper: mode === "dark" ? "#22272E" : "#fcfcfc",
                default: mode === "dark" ? "#1C2128" : "#F6F8FA"
            }
        },
        components: {
            MuiCardHeader:{
                styleOverrides:{
                    root: {
                        paddingLeft: "30px",
                        paddingRight: "30px",
                        // backgroundColor: "#e7e6e6",
                        borderBottom: "1px solid #3e3e3e"
                    }
                }
            },
            MuiCardActions:{
                styleOverrides:{
                    root: {
                        paddingLeft: "18px",
                        paddingRight: "18px",
                        backgroundColor: mode === "dark" ? "#22272E" : "#F6F8FA"
                    }
                }
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        background: mode === "dark" ? "#1C2128" : "#F6F8FA"
                    }
                }
            },
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        userSelect: "none"
                    },
                    stickyHeader: {
                        background: mode === "dark" ? "#22272E" : "#F6F8FA"
                    }
                }
            }
        },
        typography: {
            button: {
                textTransform: "none"
            }
        },
    })
}


const ThemeContext = React.createContext<ThemeContextType>({
    mode: 'light',
    toggleTheme: () => undefined,
    drawer: true,
    toggleDrawer: ()=>undefined,
})

const ThemeProvider = ({children}: { children: ReactNode }) => {
    const [themeLoaded, setThemeLoaded] = useState(false);
    const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>("light")
    const isMobile = getResolution() === 'MOBILE'
    const DRAWER_STATE = parseCookies({})[COOKIE_DRAWER_STATE]
    const drawerInitialState = DRAWER_STATE ? DRAWER_STATE === "true" : true;

    function drawerInitialize() {
        if (isMobile) return false
        else return drawerInitialState
    }
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(drawerInitialize)

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev)
        if (isMobile) return
        setCookie({}, COOKIE_DRAWER_STATE, `${!isDrawerOpen}`, {
            path: COOKIE_PATH,
            maxAge: COOKIE_DEFAULT_AGE,
            sameSite: COOKIE_SAME_SITE,
            secure: COOKIE_ENABLE_SECURE,
        })
    }

    useEffect(() => {
        const cookies = parseCookies({})

        const initialThemeMode = cookies[COOKIE_THEME]
        if (!initialThemeMode) {
            setThemeModeCookie('light')
        } else if (initialThemeMode !== 'light') {
            setThemeMode('dark')
        }

    }, [])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setThemeLoaded(true);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);


    const setThemeModeCookie = (mode: string) => {
        setCookie({}, COOKIE_THEME, mode, {
            path: COOKIE_PATH,
            maxAge: COOKIE_DEFAULT_AGE,
            secure: COOKIE_ENABLE_SECURE,
            sameSite: COOKIE_SAME_SITE,
        })
    }


    const toggleTheme = () => {
        const mode = themeMode === 'light' ? 'dark' : 'light'
        setThemeMode(mode)
        setThemeModeCookie(mode)
    }

    const theme = getTheme(themeMode)

    const memoValue = React.useMemo(
        () => ({
            mode: themeMode,
            toggleTheme,
            toggleDrawer,
            drawer: isDrawerOpen,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [themeMode, isDrawerOpen ]
    )

    if (!themeLoaded) {
        return null; // Render a loader or placeholder while the theme is loading
    }

    return (
        <ThemeContext.Provider value={memoValue}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <ConfirmProvider
                    defaultOptions={{
                        title: "Are you sure?",
                        confirmationText: "Yes",
                        cancellationText: "Cancel",
                        confirmationButtonProps: {autoFocus: true}
                    }}>
                    {children}
                </ConfirmProvider>
                <ToastContainer
                    position={isMobile ? 'top-center' : 'top-right'}
                    pauseOnHover
                    hideProgressBar={false}
                    theme={memoValue.mode}
                    toastStyle={{
                        zIndex: 99999
                    }}
                />
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider

export const useThemeContext = (): ThemeContextType => {
    const context = React.useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a AppThemeProvider')
    }
    return context
}
