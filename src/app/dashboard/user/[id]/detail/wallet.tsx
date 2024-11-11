"use client"

import {useState, Fragment} from "react";
import {useRouter} from "next/navigation";

import DetailTable from "@/components/table/DetailTable";
import {TableCell, TableRow} from "@mui/material";
import {formatDatetime, displayCurrency} from "@/lib/helper";
import {UserVisible, WalletVisible} from "@/openapi/client";
import Stack from "@mui/material/Stack";
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import ReUsableButton from "@/components/ui/buttons/ReUsableButton";
import {retrieveUserWallet} from "./actions";
import DepositDialog from "@/components/payment/DepositDialog";
import SimpleButton from "@/components/ui/buttons/SimpleButton";
import RefreshButton from "@/components/ui/buttons/RefreshButton";

const Wallet = ({user, data}: { user: UserVisible, data?: WalletVisible | null }) => {

    const [wallet, setWallet] = useState<WalletVisible | null | undefined>(data);
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter()
    const getUserWallet = async (
        callback: (props: {
            isError: boolean, message?: string | null
        }) => Promise<void>) => {
        const response = await retrieveUserWallet(user.id);
        if (response.status === 200) {
            await callback({isError: false, message: response.message});
            setWallet(response.data)
        } else {
            await callback({isError: true, message: response.message});
        }
    }

    const action = (
        <Stack direction={"row"} spacing={0.1} alignItems="center">
            <RefreshButton onClick={() => router.refresh()}/>

            {!wallet ? (
                    <ReUsableButton
                        confirmText={"Are you sure?!"}
                        title="Create user wallet"
                        type="iconButton" onClick={getUserWallet}/>

                ) :
                <ActionsMenu isMiniButton={true}>
                    <SimpleButton
                        confirmText={"Are you sure?!"}
                        title="Deposit"
                        type="menuItem" onClick={() => {
                        setOpen(true)
                    }}
                    />
                </ActionsMenu>}
        </Stack>
    )
    return (
        <Fragment>
            <DetailTable title="User wallet" hasData={!!wallet} action={action}>
                {wallet && (
                    <Fragment>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                ID
                            </TableCell>
                            <TableCell>
                                {wallet.id}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Amount
                            </TableCell>
                            <TableCell>
                                {displayCurrency({amount: wallet.amount, currency: wallet.currency})}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Created at
                            </TableCell>
                            <TableCell>
                                {formatDatetime({date: wallet.createdAt})}
                            </TableCell>
                        </TableRow>
                    </Fragment>
                )}
            </DetailTable>
            <DepositDialog disabledUserFetch={true} open={open} setOpen={setOpen}
                           initialUser={{label: user.username, value: user.id}}/>

        </Fragment>
    )
}

export default Wallet;