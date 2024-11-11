"use client"

import React, {ReactNode} from "react";
import {usePathname} from 'next/navigation'

import {
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Toolbar,
    Tooltip
} from '@mui/material'
import {CSSObject, styled, Theme} from '@mui/material/styles'
import {MdDashboard, MdPeople} from 'react-icons/md'


import {NextLinkComposed} from "@/components/Link";
import {getResolution} from "@/lib/helper"
import {useThemeContext} from "@/lib/theme-provider";


const drawerWidth = 200
const closedDrawerWidth = 50

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `${closedDrawerWidth}px`,
    [theme.breakpoints.up('sm')]: {
        width: `${closedDrawerWidth}px`
    }
})

export const StyledDrawer = styled(Drawer, {shouldForwardProp: prop => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme)
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme)
        })
    })
)


type Route = {
    label: string
    children: {
        title: string,
        url: string,
        query?: any,
        icon: ReactNode
        disabled: boolean
        superAdmin?: boolean
    }[]
}

export const getRoutes = (t: (value: string) => string): Route[] => {

    return [
        {
            label: t("Dashboard"),
            children: [
                {title: t("Home"), url: "/dashboard", icon: <MdDashboard/>, disabled: false},
            ]
        },
        {
            label: t("Subjects"),
            children: [
                // {title: t("Config"), url: "/dashboard/config", icon: <MdDashboard/>, disabled: false},
                {title: t("Users"), url: "/dashboard/user", icon: <MdPeople/>, disabled: false},
                {title: t("Lobby"), url: "/dashboard/lobby", icon: <MdDashboard/>, disabled: false},
                {title: t("Wallets"), url: "/dashboard/wallet", icon: <MdDashboard/>, disabled: false},
                {title: t("Payments"), url: "/dashboard/payment", icon: <MdDashboard/>, disabled: false},
                {title: t("Transactions"), url: "/dashboard/transaction", icon: <MdDashboard/>, disabled: false},
            ]
        },
    ]
}

const container = typeof window !== "undefined" ? () => window.document.body : undefined


const Sidebar = () => {
    const routes = getRoutes((message) => message)
    const isMobile = getResolution() === "MOBILE";
    const {drawer, toggleDrawer} = useThemeContext()

    const pathname = usePathname()

    const drawerContent = (
        <>
            {!isMobile && <Toolbar/>}
            <List component="nav" sx={{height: '100%'}}>
                {routes.map((group, i) => {
                    return (
                        <React.Fragment key={group.label}>
                            <List
                                subheader={
                                    isMobile || drawer ? (
                                        <ListSubheader
                                            sx={{
                                                lineHeight: '32px',
                                                paddingLeft: '14px',
                                                fontSize: '0.75rem',
                                                fontWeight: 'normal'
                                            }}
                                        >
                                            {group.label}
                                        </ListSubheader>
                                    ) : null
                                }
                            >
                                {group.children.map(link => {
                                    const [, , ...segments] = pathname.split('/');
                                    const pathnameWithoutLocale = segments.join("/");
                                    let isSelectedRoute = false
                                    if (link.url !== "/dashboard" && `/${pathnameWithoutLocale}` !== "/dashboard") {
                                        isSelectedRoute = `/${pathnameWithoutLocale}`.startsWith(link.url)
                                    } else if (link.url === "/dashboard" && `/${pathnameWithoutLocale}` === "/dashboard") {
                                        isSelectedRoute = true;
                                    }
                                    return (
                                        <Tooltip title={drawer ? '' : link.title} placement="left-end" key={link.url}>
                                            <ListItemButton
                                                component={NextLinkComposed}
                                                to={{
                                                    pathname: link.url,
                                                    query: link?.query
                                                }}
                                                dense selected={isSelectedRoute} disabled={link?.disabled}>
                                                <ListItemIcon style={{minWidth: 34}}>{link.icon}</ListItemIcon>
                                                <ListItemText primary={link.title}/>
                                            </ListItemButton>
                                        </Tooltip>

                                    )
                                })}
                            </List>
                            {i !== routes.length - 1 && <Divider/>}
                        </React.Fragment>
                    )
                })}
            </List>
        </>
    )

    return (
        <>
            {isMobile && (
                <Drawer
                    container={container}
                    variant="temporary"
                    onClose={() => toggleDrawer()}
                    sx={{
                        zIndex: theme => theme.zIndex.drawer + 2,
                        '& .MuiPaper-root': {
                            width: 200,
                            backgroundColor: theme => theme.palette.background.paper,
                            backgroundImage: 'none'
                        }
                    }}
                    open={drawer}
                    ModalProps={{
                        keepMounted: true
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}
            {!isMobile && (
                <StyledDrawer variant="permanent" open={drawer}>
                    {drawerContent}
                </StyledDrawer>
            )}
        </>
    )
}

export default Sidebar;