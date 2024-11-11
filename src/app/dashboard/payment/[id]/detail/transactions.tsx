"use client"
import EnhancedTable from "@/components/table/EnhancedTable";
import {PaymentVisible, TransactionVisible} from "@/openapi/client";
import {displayCurrency, formatDatetime} from "@/lib/helper";
import {useRouter} from "next/navigation";
import TrueFalseCheck from "@/components/features/TrueFalseCheck";


interface Props {
    data: TransactionVisible[];
}


export default function PaymentTransactions({data}: Props) {
    const router = useRouter()

    const columns = [
        {
            headerName: "Id",
            field: "id",
        },
        {
            headerName: "Token",
            field: "token",
        },
        {
            headerName: "Total amount",
            field: "totalAmount",
            renderCell: (row: TransactionVisible)=>{
                console.log(row.currency, "currency")
                return displayCurrency({amount: row.amount, currency: row.currency})
            }
        },
        {
            headerName: "Kind",
            field: "kind",
            renderCell: (row: TransactionVisible) => {
                return row.kind.label
            }
        },
        {
            headerName: "Is success",
            field: "isSuccess",
            renderCell: (row: TransactionVisible) => {
                return <TrueFalseCheck
                    label={row.isSuccess ? "Yes" : "No"} isTrue={row.isSuccess}
                    falseMessage={"No"}
                    trueMessage={"Yes"}/>
            }
        },
        {
            headerName: "Is action required",
            field: "isActionRequired",
            renderCell: (row: TransactionVisible) => {
                return <TrueFalseCheck
                    label={row.isActionRequired ? "Yes" : "No"} isTrue={row.isActionRequired}
                    falseMessage={"No"}
                    trueMessage={"Yes"}/>
            }
        },
        {
            headerName: "Is is already processed",
            field: "isAlreadyProcessed",
            renderCell: (row: TransactionVisible) => {
                return <TrueFalseCheck
                    label={row.isAlreadyProcessed ? "Yes" : "No"} isTrue={row.isAlreadyProcessed}
                    falseMessage={"No"}
                    trueMessage={"Yes"}/>
            }
        },
        {
            headerName: "Error",
            field: "error",
        },
        {
            headerName: "Customer Id",
            field: "customerId",
        },
        {
            headerName: "Gateway response",
            field: "gatewayResponse",
            renderCell: (row: TransactionVisible) => {
                return <pre><code>{JSON.stringify(row.gatewayResponse, null, 2)}</code></pre>
            }
        },
        {
            headerName: "Created at",
            field: "createdAt",
            renderCell: (row: TransactionVisible) => {
                return formatDatetime({date: row.createdAt})
            }
        },
    ]


    return (
        <EnhancedTable<TransactionVisible>
            title="User sessions"
            loading={false}
            currentPage={0}
            rowsPerPage={100}
            columns={columns}
            rows={data}/>
    )
}
