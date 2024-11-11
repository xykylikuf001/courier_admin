"use client"

import {useRouter} from "next/navigation";

import Stack from "@mui/material/Stack";
import {TableCell, TableRow,} from "@mui/material";

import {TransactionVisible} from "@/openapi/client";
import RefreshButton from "@/components/ui/buttons/RefreshButton";
import DetailTable from "@/components/table/DetailTable";
import Link from "@/components/Link";
import TrueFalseCheck from "@/components/features/TrueFalseCheck";

import {displayCurrency} from "@/lib/helper";

interface Props {
    data: TransactionVisible;
}

const Content = ({data}: Props) => {
    const router = useRouter();



    const action = (
        <Stack direction={"row"} spacing={0.1} alignItems="center">
            <RefreshButton onClick={() => router.refresh()}/>
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
                        Token
                    </TableCell>
                    <TableCell>
                        {data.token}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Staff
                    </TableCell>
                    <TableCell>
                            <Link href={`/dashboard/payment/${data.paymentId}/detail`}>{data.paymentId}</Link>
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
                        Is success
                    </TableCell>
                    <TableCell>
                        <TrueFalseCheck
                            label={data.isSuccess ? "Yes" : "No"} isTrue={data.isSuccess}
                            falseMessage={"No"}
                            trueMessage={"Yes"}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Is action Required
                    </TableCell>
                    <TableCell>
                        <TrueFalseCheck
                            label={data.isActionRequired ? "Yes" : "No"} isTrue={data.isActionRequired}
                            falseMessage={"No"}
                            trueMessage={"Yes"}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Is already processed
                    </TableCell>
                    <TableCell>
                        <TrueFalseCheck
                            label={data.isAlreadyProcessed ? "Yes" : "No"} isTrue={data.isAlreadyProcessed}
                            falseMessage={"No"}
                            trueMessage={"Yes"}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Kind
                    </TableCell>
                    <TableCell>
                        {data.kind.label}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        error
                    </TableCell>
                    <TableCell>
                        {data.error}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component="th" scope="row">
                        Gateway response
                    </TableCell>
                    <TableCell>
                        <pre><code>{JSON.stringify(data.gatewayResponse, null, 2)}</code></pre>
                    </TableCell>
                </TableRow>
            </DetailTable>
        </div>
    )
}

export default Content;
