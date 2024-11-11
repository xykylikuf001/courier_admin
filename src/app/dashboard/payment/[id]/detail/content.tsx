"use client"

import {useRouter} from "next/navigation";

import Stack from "@mui/material/Stack";
import {TableCell, TableRow} from "@mui/material";
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

import {PaymentVisible} from "@/openapi/client";
import RefreshButton from "@/components/ui/buttons/RefreshButton";
import DetailTable from "@/components/table/DetailTable";
import {displayCurrency, formatDatetime} from "@/lib/helper";
import Link from "@/components/Link";
import TrueFalseCheck from "@/components/features/TrueFalseCheck";
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import ReUsableButton from "@/components/ui/buttons/ReUsableButton";
import {refund} from "./actions";
import PaymentTransactions from "@/app/dashboard/payment/[id]/detail/transactions";
import AttachmentList from "@/app/dashboard/payment/[id]/detail/file-attachment";

interface Props {
    data: PaymentVisible;
}

const Content = ({data}: Props) => {
    const router = useRouter();

    const handleRefund = async (callback: (props: {
        isError: boolean, message?: string | null
    }) => Promise<void>) => {
        const response = await refund(data.id);
        if (response.status === 200) {
            await callback({isError: false, message: response.message});
        } else {
            await callback({isError: true, message: response.message});
        }
    }

    const action = (
        <Stack direction={"row"} spacing={0.1} alignItems="center">
            <RefreshButton onClick={() => router.refresh()}/>
            <ActionsMenu isMiniButton={true}>

                <ReUsableButton
                    confirmText={"Are you sure?!"}
                    title="Refund"
                    type="menuItem"
                    icon={<MoneyOffIcon/>} onClick={handleRefund}/>
            </ActionsMenu>
        </Stack>
    )
    return (
        <div className="space-y-10">
            <DetailTable title={"Payment"} hasData={true} action={action}>
                <TableRow>
                    <TableCell component="th" scope="row">
                        ID
                    </TableCell>
                    <TableCell>
                        {data.id}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Wallet
                    </TableCell>
                    <TableCell>
                        <Link href={`/dashboard/wallet/${data.walletId}/detail`}>{data.walletId}</Link>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Staff
                    </TableCell>
                    <TableCell>
                        {data.staff &&
                            <Link href={`/dashboard/user/${data.staffId}/detail`}>{data.staff.username}</Link>}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Payment type
                    </TableCell>
                    <TableCell>
                        {data.paymentType.label}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Gateway
                    </TableCell>
                    <TableCell>
                        {data.gateway}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Is active
                    </TableCell>
                    <TableCell>
                        <TrueFalseCheck
                            label={data.isActive ? "Yes" : "No"} isTrue={data.isActive}
                            falseMessage={"No"}
                            trueMessage={"Yes"}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        To confirm
                    </TableCell>
                    <TableCell>
                        <TrueFalseCheck
                            label={data.toConfirm ? "Yes" : "No"} isTrue={data.toConfirm}
                            falseMessage={"No"}
                            trueMessage={"Yes"}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Charge status
                    </TableCell>
                    <TableCell>
                        {data.chargeStatus.label}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Token
                    </TableCell>
                    <TableCell>
                        {data.token}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Total amount
                    </TableCell>
                    <TableCell>
                        {displayCurrency({amount: data.totalAmount, currency: data.currency})}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Captured amount
                    </TableCell>
                    <TableCell>
                        {displayCurrency({amount: data.capturedAmount, currency: data.currency})}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Store payment method
                    </TableCell>
                    <TableCell>
                        {data.storePaymentMethod.label}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Card first digits
                    </TableCell>
                    <TableCell>
                        {data.ccFirstDigits}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Card last digits
                    </TableCell>
                    <TableCell>
                        {data.ccLastDigits}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Card brand
                    </TableCell>
                    <TableCell>
                        {data.ccBrand}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Card expiration month
                    </TableCell>
                    <TableCell>
                        {data.ccExpMonth}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Card expiration year
                    </TableCell>
                    <TableCell>
                        {data.ccExpYear}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Payment method type
                    </TableCell>
                    <TableCell>
                        {data.paymentMethodType}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Customer ip address
                    </TableCell>
                    <TableCell>
                        {data.customerIpAddress}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Extra data
                    </TableCell>
                    <TableCell>
                        <pre><code>{JSON.stringify(data.extraData, null, 2)}</code></pre>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Return url
                    </TableCell>
                    <TableCell>
                        {data.returnUrl}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        PSP reference
                    </TableCell>
                    <TableCell>
                        {data.pspReference}
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
                <TableRow>
                    <TableCell component="th" scope="row">
                        Private meta data
                    </TableCell>
                    <TableCell>
                        <pre><code>{JSON.stringify(data.privateMetadata, null, 2)}</code></pre>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Private meta data
                    </TableCell>
                    <TableCell>
                        <pre><code>{JSON.stringify(data.publicMetadata, null, 2)}</code></pre>
                    </TableCell>
                </TableRow>
            </DetailTable>
            <PaymentTransactions data={data.transactions ?? []}/>
            <AttachmentList objId={data.id} rows={data.attachments??[]}/>
        </div>
    )
}

export default Content;
