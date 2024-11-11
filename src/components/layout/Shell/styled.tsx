"use client"
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";


export const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: row;

    & > #styled-content {
        flex: 1;
    }
  max-width: 100vw;

  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.palette.background.default};

  & > #styled-content {
    flex: 1;
  }
`

export const StyledBox = styled("div")`
  height: 100%;
  min-height: 100vh;
  background-color: ${({theme}) => theme.palette.background.default};

  ${({theme}) => theme.breakpoints.up("xs")} {
    padding: 74px 8px 8px 8px;
  }

  ${({theme}) => theme.breakpoints.up("md")} {
    padding: 90px 20px 20px 20px;
  }
`
