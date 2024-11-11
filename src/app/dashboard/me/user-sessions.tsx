"use client"
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import EnhancedTable from "@/components/table/EnhancedTable";
import {UserSessionVisible} from "@/openapi/client";
import { formatDatetime} from "@/lib/helper";
import ReUsableButton from "@/components/ui/buttons/ReUsableButton";
import {useRouter} from "next/navigation";

import {revoke, revokeAll} from './actions';

interface Props {
    data: UserSessionVisible[];
}


export default function UserSessions({data}: Props) {
    const router = useRouter()
    const handleRevokeAll = async (callback: (props: {
        isError: boolean, message?: string | null
    }) => Promise<void>) => {
        const response = await revokeAll();
        if (response.status === 200) {
            await callback({isError: false, message: response.message});
            router.refresh();
        } else {
            await callback({isError: true, message: response.message});
        }
    }

    const columns = [
        {
            headerName: "Id",
            field: "id",
        },
        {
            headerName: "user agent",
            field: "userAgent",
        },
        {
            headerName: "IP address",
            field: "ipAddress",
        },
        {
            headerName: "Revoked at",
            field: "revokedAt",
            renderCell: (row: UserSessionVisible) => {
                if (!row.revokedAt) return ""
                return formatDatetime({date: row.revokedAt})
            }
        },
        {
            headerName: "Created at",
            field: "createdAt",
            renderCell: (row: UserSessionVisible) => {
                return formatDatetime({date: row.createdAt})
            }
        },
        {
            headerName: "Actions",
            field: "actions",
            sortable: false,
            renderCell: (row: UserSessionVisible) => {

                const handleRevoke = async (callback: (props: {
                    isError: boolean, message?: string | null
                }) => Promise<void>) => {
                    const response = await revoke(row.id);
                    if (response.status === 200) {
                        await callback({isError: false, message: response.message});
                        router.refresh();
                    } else {
                        await callback({isError: true, message: response.message});
                    }
                }
                return (
                    <ActionsMenu>
                        <ReUsableButton
                            confirmText={"Are you sure?!"}
                            title="Revoke"
                            type="menuItem"
                            icon={<PersonOffIcon/>} onClick={handleRevoke}/>
                    </ActionsMenu>
                )
            },
        },
    ]

    const action = (
        <ActionsMenu isMiniButton={true}>
            <ReUsableButton
                confirmText={"Are you sure?!"}
                title="Revoke all"
                type="menuItem"
                icon={<PersonOffIcon/>} onClick={handleRevokeAll}/>
        </ActionsMenu>
    )

    return (
        <EnhancedTable<UserSessionVisible>
            title="User sessions"
            action={action}
            loading={false}
            currentPage={0}
            rowsPerPage={100}
            columns={columns}
            rows={data}/>
    )
}
