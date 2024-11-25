"use client"
import {Fragment} from "react";

import {GridColDef} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

import {OrderVisible} from "@/openapi/client";
import {formatDatetime} from "@/lib/helper";
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import ServerSideDataGrid from "@/components/table/ServerSideDataGrid";
import ViewButton from "@/components/ui/buttons/ViewButton";


interface Props {
    rows: OrderVisible[];
    page: number;
    limit: number;
}


export default function Content({rows, limit, page}: Props) {




    const columns: GridColDef[] = [
        {
            field: 'code',
            headerName: 'Code',
            flex: 1.5,
            minWidth: 200
        },
        {
            field: 'senderName',
            headerName: 'Sender name',
            flex: 1.5,
            minWidth: 200
        },
        {
            field: 'senderPhone',
            headerName: 'Sender Phone',
            flex: 1.5,
            minWidth: 200
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            minWidth: 200,

            renderCell: (params) => params.row.status.label,
        },
        {
            field: 'createdAt',
            headerName: 'Created at',
            flex: 1,
            minWidth: 200,
            align: 'right',
            headerAlign: 'right',

            renderCell: (params) => formatDatetime({date: params.value}),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => {
                return (
                    <ActionsMenu isMiniButton>
                        <ViewButton href={`/dashboard/order/${params.row.id}/detail`}/>
                    </ActionsMenu>
                )
            },
            sortable: false,
            filterable: false,
        },
    ];



    return (
        <Fragment>
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                Overview
            </Typography>

            <ServerSideDataGrid
                page={page} pageSize={limit}
                title={"Orders"}  columns={columns} rows={rows}/>
        </Fragment>
    )
}
