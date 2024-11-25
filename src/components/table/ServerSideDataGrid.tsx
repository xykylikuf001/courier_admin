"use client";
import React from 'react';
import {DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
// import {columns, rows} from '@/lib/internals/data/gridData';
import Typography from "@mui/material/Typography";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import {ReactNode} from "react";
import Collapse from "@/components/ui/Collapse";
import {GridPaginationModel} from "@mui/x-data-grid/models/gridPaginationProps";
import {usePathname, useRouter, useSearchParams} from "next/navigation";


interface PropsState<T> {
    title: string
    action?: ReactNode
    expanded?: boolean;
    rows: T[];
    columns: GridColDef[];
    page: number;
    pageSize: number;
}

export default function ServerSideDataGrid<T>(
    {
        title,
        action,
        expanded = true,
        columns, rows,
        page, pageSize
    }: PropsState<T>
) {
    const apiRef = useGridApiRef();
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const handlePaginationModelChange = (model: GridPaginationModel) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", (model.page + 1).toString());
        params.set("limit", model.pageSize.toString());
        router.replace(`${pathname}?${params.toString()}`);
    }


    return (

        <Card variant={'outlined'}>
            <CardHeader title={
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div">
                    {title}
                </Typography>}
                        action={action}
            />
            <Collapse expanded={expanded} timeout="auto">
                <CardContent component={'div'}>
                    <DataGrid
                        apiRef={apiRef}
                        checkboxSelection disableRowSelectionOnClick
                        showColumnVerticalBorder={true}
                        showCellVerticalBorder={true}
                        rows={rows}
                        columns={columns}
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                        }
                        rowCount={-1}
                        paginationMode="server"
                        initialState={{
                            pagination: {
                                // paginationModel: {pageSize: 20},
                                rowCount: -1,
                            },
                        }}

                        pageSizeOptions={[10, 20, 50, 100, 200, 500, 1000]}
                        disableColumnResize
                        density="standard"
                        slotProps={{
                            filterPanel: {
                                filterFormProps: {
                                    logicOperatorInputProps: {
                                        variant: 'outlined',
                                        size: 'small',
                                    },
                                    columnInputProps: {
                                        variant: 'outlined',
                                        size: 'small',
                                        sx: {mt: 'auto'},
                                    },
                                    operatorInputProps: {
                                        variant: 'outlined',
                                        size: 'small',
                                        sx: {mt: 'auto'},
                                    },
                                    valueInputProps: {
                                        InputComponentProps: {
                                            variant: 'outlined',
                                            size: 'small',
                                        },
                                    },
                                },
                            },
                        }}

                        paginationModel={{
                            page: page - 1,
                            pageSize: pageSize
                        }}
                        onPaginationModelChange={handlePaginationModelChange}
                    />

                </CardContent>
            </Collapse>
        </Card>
    );
}