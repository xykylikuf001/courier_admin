import React from 'react'

import TableRow from '@mui/material/TableRow'

import ErrorPlaceholder from "@/components/ui/ErrorPlaceholder";
import {StyledLinearProgress, StyledTableCell} from "@/components/table/styled";


interface Props {
    noDataText?: string
    errorText?: string
    loading?: boolean
    hasData?: boolean
    handleRefresh?: ()=>void
    isError?: boolean
}

const TablePlaceholder = ({loading, errorText, noDataText, hasData, handleRefresh, isError}: Props) => {
    const loadingState = (loading) && (
        <TableRow sx={{position: 'relative', height: 'auto'}}>
            <StyledTableCell colSpan={2}>
                <StyledLinearProgress/>
            </StyledTableCell>
        </TableRow>
    )

    const errorState =  isError && !loading && (
      <TableRow sx={{ position: 'relative', height: 60 }}>
        <StyledTableCell>
            <ErrorPlaceholder handleRefresh={handleRefresh} message={errorText}/>
        </StyledTableCell>
      </TableRow>
    )

    const emptyState = !loading && !hasData && (
        <TableRow sx={{position: 'relative', height: 100,}}>
            <StyledTableCell>
                <ErrorPlaceholder handleRefresh={handleRefresh} message={noDataText??'No more rows'}/>
                {/*<StyledText>{noDataText}</StyledText>*/}
            </StyledTableCell>
        </TableRow>
    )

    return (
        <>
            {loadingState}
            {errorState}
            {emptyState}
        </>
    )
}

export default TablePlaceholder;