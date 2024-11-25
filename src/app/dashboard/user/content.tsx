"use client"
import {Fragment} from "react";
import Typography from "@mui/material/Typography";
import {GridColDef} from "@mui/x-data-grid";

import {UserVisible} from "@/openapi/client";
import {formatDatetime} from "@/lib/helper";
import ViewButton from "@/components/ui/buttons/ViewButton";
import TrueFalseCheck from "@/components/features/TrueFalseCheck";
import ServerSideDataGrid from "@/components/table/ServerSideDataGrid";
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import AddButton from "@/components/ui/buttons/AddButton";

interface Props {
    rows: UserVisible[];
    page: number;
    limit: number;
}


export default function Content({rows, limit, page}: Props) {
    // const columns: GridColDef[] = [
    //     { field: 'name', headerName: 'Name', width: 150 },
    //     // { field: 'col2', headerName: 'Column 2', width: 150 },
    // ];

    // const router = useRouter();
    // const searchParams = useSearchParams();
    // const pathname = usePathname();

    // const handleChange = async (key: string, value: any) => {
    //     const params = new URLSearchParams(searchParams)
    //     params.set(key, value);
    //     router.replace(`${pathname}?${params.toString()}`);
    // };


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
                    <ActionsMenu isMiniButton>
                        <ViewButton href={`/dashboard/user/${params.row.id}/detail`}/>
                    </ActionsMenu>
                )
            },
            sortable: false,
            filterable: false,
        },
        // {
        //     field: 'users',
        //     headerName: 'Users',
        //     headerAlign: 'right',
        //     align: 'right',
        //     flex: 1,
        //     minWidth: 80,
        // },
        // {
        //     field: 'eventCount',
        //     headerName: 'Event Count',
        //     headerAlign: 'right',
        //     align: 'right',
        //     flex: 1,
        //     minWidth: 100,
        // },
        // {
        //     field: 'viewsPerUser',
        //     headerName: 'Views per User',
        //     headerAlign: 'right',
        //     align: 'right',
        //     flex: 1,
        //     minWidth: 120,
        // },
        // {
        //     field: 'averageTime',
        //     headerName: 'Average Time',
        //     headerAlign: 'right',
        //     align: 'right',
        //     flex: 1,
        //     minWidth: 100,
        // },
        // {
        //     field: 'conversions',
        //     headerName: 'Daily Conversions',
        //     flex: 1,
        //     minWidth: 150,
        //     renderCell: renderSparklineCell,
        // },
    ];


    const action = (
        <ActionsMenu isMiniButton={true}>
            <AddButton href={"/dashboard/user/create"}/>
        </ActionsMenu>
    )

    return (
        <Fragment>
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                Overview
            </Typography>
            <ServerSideDataGrid page={page} pageSize={limit} title={"Users"} action={action} columns={columns}
                                rows={rows}/>
        </Fragment>
    )
}
