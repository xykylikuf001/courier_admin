"use client"

import {useRouter} from "next/navigation";
import Stack from "@mui/material/Stack";
import Chip from '@mui/material/Chip';

import DetailTable from "@/components/table/DetailTable";
import RefreshButton from "@/components/ui/buttons/RefreshButton";
import EditButton from "@/components/ui/buttons/EditButton";
import {ConfigVisible} from "@/openapi/client";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const Content = ({data}: { data: ConfigVisible }) => {

    const router = useRouter();
    const action = (
        <Stack direction={"row"} spacing={0.1}>
            <RefreshButton onClick={() => router.refresh()}/>
            <EditButton type="iconButton" href="/dashboard/config/manage"/>
        </Stack>
    )

    return (
        <DetailTable title="Site config"
                     hasData={!!data}
                     action={action}>
            <TableRow>
                <TableCell component="th" scope="row">
                    Phones
                </TableCell>
                <TableCell>
                    <Stack spacing={{xs: 1, sm: 2}} direction="row" useFlexGap flexWrap="wrap">
                        {data.phones.map((e, i) => (
                            <Chip label={e} key={i}/>
                        ))}
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    Emails
                </TableCell>
                <TableCell>
                    <Stack spacing={{xs: 1, sm: 2}} direction="row" useFlexGap flexWrap="wrap">
                        {data.emails.map((e, i) => (
                            <Chip label={e} key={i}/>
                        ))}
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    Support phone
                </TableCell>
                <TableCell>
                    {data.supportPhone}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    Support phone
                </TableCell>
                <TableCell>
                    {data.supportEmail}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    Regular shipping price
                </TableCell>
                <TableCell>
                    {data.regularShippingPrice}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    Regular shipping price
                </TableCell>
                <TableCell>
                    {data.expressShippingPrice}
                </TableCell>
            </TableRow>
        </DetailTable>
    )
}

export default Content;