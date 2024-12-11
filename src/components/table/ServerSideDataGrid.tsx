"use client";
import React from 'react';
import {
    DataGrid,
    GridColDef,
    useGridApiRef,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarProps,
    GridToolbarQuickFilter, useGridApiContext
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {ReactNode} from "react";
import {GridPaginationModel} from "@mui/x-data-grid/models/gridPaginationProps";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {GridRowId, GridRowModel} from "@mui/x-data-grid/models/gridRows";

declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        getAction?: (selectedRows: Map<GridRowId, GridRowModel>) => ReactNode;
    }
}

interface PropsState<T> {
    getAction?: (selectedRows: Map<GridRowId, GridRowModel>) => ReactNode;
    rows: T[];
    columns: GridColDef[];
    page: number;
    pageSize: number;
    getRowId?: (row: T) => string | number;
    withToolbar?: boolean;
}

export default function ServerSideDataGrid<T>(
    {
        columns, rows,
        page,
        pageSize,
        getRowId,
        getAction,
        withToolbar=true,
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
        <div style={{height: 1000}}>
            <DataGrid
                getRowId={getRowId}
                apiRef={apiRef}
                disableMultipleRowSelection
                checkboxSelection
                disableRowSelectionOnClick
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
                    density: "compact",
                    pagination: {
                        // paginationModel: {pageSize: 20},
                        rowCount: -1,
                    },
                }}
                pageSizeOptions={[10, 20, 50, 100, 200, 500, 1000]}
                disableColumnResize
                slots={{
                    toolbar: withToolbar?CustomGridToolbar:null,
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        getAction: getAction,
                    },
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
        </div>
    );
}

function CustomGridToolbar({getAction, ...props}: {
    getAction?: (selectedRows: Map<GridRowId, GridRowModel>) => ReactNode;
} & GridToolbarProps) {
    const apiRef = useGridApiContext();
    const selectedRows = apiRef.current.getSelectedRows();
    return (
        <GridToolbarContainer sx={{p: 2}}>
            {props.showQuickFilter && <GridToolbarQuickFilter/>}
            <Box sx={{flexGrow: 1}}/>

            {/*<GridToolbarColumnsButton />*/}
            {/*<GridToolbarFilterButton />*/}
            <GridToolbarDensitySelector/>
            {/*<GridToolbarExport*/}
            {/*    slotProps={{*/}
            {/*        tooltip: { title: 'Export data' },*/}
            {/*        button: { variant: 'outlined' },*/}
            {/*    }}*/}
            {/*/>*/}

            {/*<Button*/}
            {/*    variant="text"*/}
            {/*    size="small"*/}
            {/*    color="primary"*/}
            {/*    disabled={selectedRows.size === 0}*/}
            {/*    onClick={() => {*/}
            {/*        console.log(selectedRows)*/}
            {/*    }}*/}
            {/*    style={{ margin: '0 8px' }}*/}
            {/*>*/}
            {/*    Perform Action*/}
            {/*</Button>*/}
            {getAction && getAction(selectedRows)}
        </GridToolbarContainer>
    );
}
