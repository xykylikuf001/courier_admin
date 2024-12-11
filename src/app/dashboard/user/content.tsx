"use client"
import {Fragment} from "react";
import Typography from "@mui/material/Typography";
import {GridColDef} from "@mui/x-data-grid";

import {UserVisible} from "@/openapi/client";
import {formatDatetime} from "@/lib/helper";
import ViewButton from "@/components/ui/buttons/ViewButton";
import TrueFalseCheck from "@/components/features/TrueFalseCheck";
import ServerSideDataGrid from "@/components/table/ServerSideDataGrid";
import AddButton from "@/components/ui/buttons/AddButton";

interface Props {
    rows: UserVisible[];
    page: number;
    limit: number;
}


export default function Content({rows, limit, page}: Props) {

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1.5,
            minWidth: 200
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1.5,
            minWidth: 200
        },
        {
            field: 'phone',
            headerName: 'Phone',
            flex: 1.5,
            minWidth: 200
        },
        {
            field: 'phoneVerifiedAt',
            headerName: 'Phone verified at',
            flex: 1.5,
            minWidth: 200,
            align: 'right',
            headerAlign: 'right',
            renderCell: (params) => formatDatetime({date: params.value}),
        },
        {
            field: 'isActive',
            headerName: 'Is active',
            flex: 0.5,
            minWidth: 100,
            align: 'center',
            headerAlign: "center",
            renderCell: (params) => {
                return <TrueFalseCheck
                    label={params.row.isActive ? "Yes" : "No"} isTrue={params.row.isActive}
                    falseMessage={"No"}
                    trueMessage={"Yes"}/>
            },
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
                        <ViewButton type="iconButton" href={`/dashboard/user/${params.row.id}/detail`}/>
                )
            },
            sortable: false,
            filterable: false,
        },
    ];


    const getAction = () => {
        return (
            <AddButton type="iconButton" href={"/dashboard/user/create"}/>
        )
    };

    return (
        <Fragment>
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                Users
            </Typography>
            <ServerSideDataGrid
                page={page}
                pageSize={limit}
                getAction={getAction}
                columns={columns}
                rows={rows}
            />
        </Fragment>
    )
}
