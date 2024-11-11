import React from 'react'

import {
    IconButton,
    ListItem,
    ListItemText,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material'
import {FaSignOutAlt} from 'react-icons/fa';

import Link from "@/components/Link";
import {destroyAuthCookies} from "@/lib/auth/actions";
import {useAuthContext} from "@/lib/auth/provider";

interface Props {
    closeDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const UserLink = () => {
    const {payload} = useAuthContext()
    return (
        <Link href={"/dashboard/me"}>
            <ListItemText
                primary={
                    <Typography variant="body2">
                        <span>{payload?.username}</span>
                    </Typography>
                }
            />
        </Link>
    )
}

const UserSection = ({closeDrawer}: Props) => {

    const handleLogout = async () => {
        closeDrawer(false)
        await destroyAuthCookies();
    }
    return (
        <>
            <div>User Section</div>
            <Typography
                variant="overline"
                sx={{paddingBottom: '6px', display: 'block', opacity: 0.7}}>
                Account
            </Typography>

            <ListItem
                sx={{paddingLeft: 0}}
                dense
                secondaryAction={
                    <Stack direction="row" sx={{marginRight: '-16px'}}>
                        <Tooltip title={"Logout"} onClick={handleLogout}>
                            <IconButton edge="end" aria-label="logout" size="small">
                                <FaSignOutAlt size={16}/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                }
            >
                <UserLink />
            </ListItem>
        </>
    )
}


export default UserSection;