"use client"

import EnhancedTable from "@/components/table/EnhancedTable";
import {UserSessionVisible} from "@/openapi/client";
import {formatDatetime} from "@/lib/helper";
import {useRouter} from "next/navigation";

interface Props {
    data: UserSessionVisible[];
}


export default function UserSessions({data}: Props) {
    const router = useRouter()


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
    ]


    return (
        <EnhancedTable<UserSessionVisible>
            title="User sessions"
            loading={false}
            currentPage={0}
            rowsPerPage={100}
            columns={columns}
            rows={data}/>
    )
}
