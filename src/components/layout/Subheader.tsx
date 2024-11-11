"use client"

// import useTranslation from "next-translate/useTranslation";

import {Divider, Typography} from '@mui/material'
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {styled} from "@mui/material/styles";


import Link from "@/components/Link";
import {getResolution} from "@/lib/helper";


export const StyledContainer = styled('div')`
   display: grid;
   padding: 8px;
   ${({ theme }) => theme.breakpoints.up('xs')} {
      grid-auto-flow: row;
      width: 100%;
   }
   ${({ theme }) => theme.breakpoints.up('md')} {
      grid-auto-flow: column;
      justify-content: space-between;
      align-items: center;
   }
`

 

const Subheader = ()=>{
    const isMobile = getResolution() === 'MOBILE';
    // const {t} = useTranslation("common");
    const subtitle = "Subtitle";
    return (
        <>
            <StyledContainer>

                <Typography sx={{fontWeight: 'bold'}} variant={isMobile ? 'h6' : 'h5'} color="primary">
                    Title
                </Typography>
                <Breadcrumbs maxItems={2} aria-label="breadcrumb" color='default'>
                    <Link underline="none" color="inherit" href="/dashboard/">
                        Home
                    </Link>
                    {/* {tree && tree.map((item, i) =>
                        <Link key={i} href={item.url} underline={'none'} color={'inherit'}>
                            Title
                        </Link>)} */}
                    {/*<Link underline="hover" color="inherit" href="#">*/}
                    {/*    Accessories*/}
                    {/*</Link>*/}
                    {/*<Link underline="hover" color="inherit" href="#">*/}
                    {/*    New Collection*/}
                    {/*</Link>*/}
                    {subtitle && <Typography color="default">{subtitle}</Typography>}
                </Breadcrumbs>

            </StyledContainer>
            <Divider sx={{mb: '14px !important'}}/>
        </>
    )
}

export default Subheader;