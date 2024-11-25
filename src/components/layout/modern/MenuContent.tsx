import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import GradingIcon from '@mui/icons-material/Grading';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
// import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {NextLinkComposed} from "@/components/Link";
import Tooltip from "@mui/material/Tooltip";
import {usePathname} from "next/navigation";
// import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
// import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const mainListItems = [
    {text: 'Home', icon: <HomeRoundedIcon/>, to: "/dashboard"},
    // { text: 'Analytics', icon: <AnalyticsRoundedIcon /> },
    {text: 'Clients', icon: <PeopleRoundedIcon/>, to: "/dashboard/user"},
    {text: 'Orders', icon: <GradingIcon/>, to: "/dashboard/order"},
    // { text: 'Tasks', icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
    {text: 'Settings', icon: <SettingsRoundedIcon/>, to: "/dashboard/settings"},
    // { text: 'About', icon: <InfoRoundedIcon /> },
    // { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
    const pathname = usePathname()

    return (
        <Stack sx={{flexGrow: 1, p: 1, justifyContent: 'space-between'}}>
            <List dense>
                {mainListItems.map((item, index) => {

                    const [, , ...segments] = pathname.split('/');
                    const pathnameWithoutLocale = segments.join("/");
                    let isSelectedRoute = false
                    if (item.to !== "/dashboard" && `/${pathnameWithoutLocale}` !== "/dashboard") {
                        isSelectedRoute = `/${pathnameWithoutLocale}`.startsWith(item.to)
                    } else if (item.to === "/dashboard" && `/${pathnameWithoutLocale}` === "/dashboard") {
                        isSelectedRoute = true;
                    }
                    return (

                        <ListItem key={index} disablePadding sx={{display: 'block'}}>
                            <Tooltip title={item.text} placement="left-end" key={index}>

                                <ListItemButton
                                    selected={isSelectedRoute}
                                    component={NextLinkComposed}
                                    to={item.to}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </Tooltip>

                        </ListItem>
                    )
                })}
            </List>

            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            component={NextLinkComposed}
                            to={item.to}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}