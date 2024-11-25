"use client"
import {styled} from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'
import TableCell from '@mui/material/TableCell'

export const StyledTableCell = styled(TableCell)`
  position: absolute;
  width: 100%;
  border-bottom: none;
`

export const StyledLinearProgress = styled(LinearProgress)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`