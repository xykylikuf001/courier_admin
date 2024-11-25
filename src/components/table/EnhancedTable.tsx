"use client"

import React, {ReactNode} from 'react';
import {useSearchParams, useRouter, usePathname} from "next/navigation";

import Checkbox from '@mui/material/Checkbox';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


import TablePlaceholder from "@/components/table/TablePlaceholder";
import RefreshButton from "@/components/ui/buttons/RefreshButton";
import ReUsableButton from "@/components/ui/buttons/ReUsableButton";
import ActionsMenu from "@/components/features/menu/ActionsMenu";

export interface ColumnCell {
    headerName: string
    field: string
    renderCell?: (props: any) => string | JSX.Element
    sx?: object
}

interface EnhancedTableHeadProps {
    columns: ColumnCell[];
    withCheckbox?: boolean;
    onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    numSelected: number
    rowCount: number
}


function EnhancedTableHead(
    {
        columns,
        withCheckbox = false,
        onClick,
        numSelected,
        rowCount
    }: EnhancedTableHeadProps
) {
    return (
        <TableHead>
            <TableRow>
                {withCheckbox && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onClick}
                            inputProps={{
                                'aria-label': 'select all visible',
                            }}
                        />
                    </TableCell>
                )}
                {columns.map((column) => (
                    <TableCell
                        key={column.field}
                    >
                        {column.headerName}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


interface EnhancedTableProps<T> {
    rows: T[]
    columns: ColumnCell[]
    title: string
    currentPage: number
    rowsPerPage: number
    count?: number | null | undefined
    action?: ReactNode;
    loading: boolean;
    extraActions?: ReactNode;
    withRefreshButton?: boolean,
    withCheckbox?: boolean
    mainField?: string
    selectAction?: {
        icon?: ReactNode
        title: string
        onClick: (props: {
            values: string[],
            callback: (props: { isError: boolean, message?: string | null }) => Promise<void>
        }) => Promise<void>
        onCancel?: () => Promise<void>
        reFetchData?: boolean
    }[]
    onPageChange?: (page: number) => void
}


function EnhancedTable<T>(
    {
        loading,
        rows,
        columns,
        title,
        currentPage,
        rowsPerPage,
        count,
        action,
        selectAction,
        withRefreshButton = true,
        withCheckbox = false,
        mainField = "id",
        onPageChange,
    }: EnhancedTableProps<T>) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [selected, setSelected] = React.useState<string[]>([]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        count && currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - count) : 0;


    const getPerPageOptions = () => {
        const options = [5, 10, 25, 100];
        if (!options.includes(rowsPerPage)) options.push(rowsPerPage)
        return options;
    }

    const handleChangePage = async (event: unknown, newPage: number) => {
        if (onPageChange) {
            onPageChange(newPage + 1)
            return
        }
        const params = new URLSearchParams(searchParams)
        params.set("page", (newPage + 1).toString());
        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleChangePageSize = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)
        params.set("limit", event.target.value);
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`);
    };

    const getAction = () => {
        let extraActions: ReactNode = <div/>
        if (withCheckbox && selectAction && selectAction.length > 0) {
            if (selectAction.length == 1) {
                extraActions = <ReUsableButton
                    type="iconButton"
                    onCancel={selectAction[0].onCancel}
                    title={selectAction[0].title}
                    onClick={async (callback: (props: {
                        isError: boolean,
                        message?: string | null
                    }) => Promise<void>) => {
                        await selectAction[0].onClick({values: selected, callback})

                        if (selectAction[0].reFetchData) {
                            setTimeout(() => {
                                router.refresh()
                            }, 1000)
                        }
                    }}
                    icon={selectAction[0].icon}
                />
            } else {
                extraActions = (
                    <ActionsMenu isMiniButton={false}>
                        {
                            selectAction.map((item, i) => {
                                return (
                                    <ReUsableButton
                                        key={i}
                                        type="menuItem"
                                        icon={item.icon}
                                        onClick={async (callback: (props: {
                                            isError: boolean,
                                            message?: string | null
                                        }) => Promise<void>) => {
                                            await item.onClick({values: selected, callback})
                                            if (item.reFetchData) {
                                                setTimeout(() => {
                                                    router.refresh()
                                                }, 1000)
                                            }
                                        }}
                                        title={item.title}
                                        onCancel={item.onCancel}
                                    />
                                )
                            })
                        }
                    </ActionsMenu>
                )
            }
        }
        return (
            <Stack direction={"row"} spacing={0.1}>
                {selected.length > 0 && extraActions}
                {withRefreshButton && <RefreshButton onClick={() => router.refresh()}/>}
                {action}
            </Stack>
        )
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n: T) => n[mainField as keyof T]);
            setSelected(newSelected as string[]);
            return;
        }
        setSelected([]);
    };
    const isSelected = (name: string) => selected.indexOf(name) !== -1;


    const handleClick = (event: React.MouseEvent<unknown>, value: string) => {
        const selectedIndex = selected.indexOf(value);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, value);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    return (
        <Box sx={{width: '100%'}}>
            <Paper component={'div'} sx={{width: '100%', mb: 2}}>
                <Card sx={{width: '100%'}} variant={'outlined'}>
                    <CardHeader
                        title={selected.length > 0 ? (
                            <Typography
                                sx={{flex: '1 1 100%'}}
                                color="inherit"
                                variant="subtitle1"
                                component="div"
                            >
                                {selected.length} selected
                            </Typography>
                        ) : (
                            <Typography
                                sx={{flex: '1 1 100%'}}
                                variant="h6"
                                id="tableTitle"
                                component="div"
                            >
                                {title}
                            </Typography>
                        )} action={getAction()}
                    />
                    <CardContent component={'div'} sx={{overflow: 'auto'}}>
                        <Table
                            stickyHeader
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                columns={columns}
                                withCheckbox={withCheckbox}
                                numSelected={selected.length}
                                rowCount={rows.length}
                                onClick={handleSelectAllClick}
                            />
                            <TableBody>
                                <TablePlaceholder
                                    handleRefresh={() => router.refresh()}
                                    loading={loading} noDataText="No more rows"
                                    hasData={rows.length > 0}
                                />

                                {rows?.map((row: T, i: number) => {
                                    const isItemSelected = isSelected(row[mainField as keyof T] as string);
                                    const labelId = `enhanced-table-checkbox-${i}`;

                                    return (
                                        <TableRow
                                            key={i}
                                            onClick={(event) => {
                                                if (withCheckbox) handleClick(event, row[mainField as keyof T] as string)
                                            }}
                                            role={withCheckbox ? "checkbox" : "default"}
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            selected={isItemSelected}
                                            sx={
                                                {
                                                    '&:last-child td, &:last-child th': {border: 0},
                                                    "cursor": withCheckbox ? "pointer" : "default"
                                                }
                                            }

                                        >

                                            {withCheckbox &&
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                            }
                                            {columns.map((column: ColumnCell) => {
                                                if (column.renderCell) return (<TableCell key={column.field}
                                                                                          sx={{...column.sx}}>{column.renderCell(row)}</TableCell>)
                                                return (
                                                    <TableCell key={column.field}
                                                               sx={{...column.sx,}}>
                                                        {row[column.field as keyof T] as ReactNode}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            minHeight: 250,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <TablePagination
                            rowsPerPageOptions={getPerPageOptions()}
                            component="div"
                            count={count ?? -1}
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangePageSize}
                        />
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
}

export default EnhancedTable;
