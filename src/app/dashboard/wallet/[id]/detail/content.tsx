"use client"
import {useState} from "react";

import {useRouter} from "next/navigation";
import Stack from "@mui/material/Stack";
import {TableCell, TableRow,} from "@mui/material";


import {WalletVisibleExtended} from "@/openapi/client";
import RefreshButton from "@/components/ui/buttons/RefreshButton";
import DetailTable from "@/components/table/DetailTable";
import {displayCurrency, formatDatetime} from "@/lib/helper";
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import CopyContainer from "@/components/features/Copy";
import Link from "@/components/Link";
import DepositDialog from "@/components/payment/DepositDialog";
import SimpleButton from "@/components/ui/buttons/SimpleButton";
import Payments from "@/app/dashboard/wallet/[id]/detail/payments";

interface Props {
    data: WalletVisibleExtended;
}

const Content = ({data}: Props) => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);

    const action = (
        <Stack direction={"row"} spacing={0.1} alignItems="center">
            <RefreshButton onClick={() => router.refresh()}/>
            <ActionsMenu isMiniButton={true}>
                <SimpleButton
                    confirmText={"Are you sure?!"}
                    title="Deposit"
                    type="menuItem" onClick={()=>{setOpen(true)}}
                />
            </ActionsMenu>
        </Stack>
    )
    return (
        <div className="space-y-10">
            <DetailTable title={"Wallet"} hasData={true} action={action}>
                <TableRow>
                    <TableCell component="th" scope="row">
                        ID
                    </TableCell>
                    <TableCell>
                        <CopyContainer text={data.id}/>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component="th" scope="row">
                        User
                    </TableCell>
                    <TableCell>
                        <Link href={`/dashboard/user/${data.user.id}/detail`}>{data.user.username}</Link>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Amount
                    </TableCell>
                    <TableCell>
                        {displayCurrency({amount: data.amount, currency: data.currency})}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Created at
                    </TableCell>
                    <TableCell>
                        {formatDatetime({date: data.createdAt})}
                    </TableCell>
                </TableRow>
            </DetailTable>
            <Payments rows={data.payments} walletId={data.id}/>

            <DepositDialog disabledUserFetch={true} open={open} setOpen={setOpen} initialUser={{label: data.user.username, value: data.user.id}}/>
        </div>
    )
}

export default Content;
