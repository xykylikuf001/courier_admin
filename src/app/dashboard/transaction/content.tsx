"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation";

import {TransactionVisible} from "@/openapi/client";
import Link from "@/components/Link";
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import EnhancedTable from "@/components/table/EnhancedTable";
import ViewButton from "@/components/ui/buttons/ViewButton";
import {displayCurrency, formatDatetime} from "@/lib/helper";
import TrueFalseCheck from "@/components/features/TrueFalseCheck";


interface Props {
    rows: TransactionVisible[];
    page: number;
    limit: number;
}


export default function Content({rows, page, limit}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleChange = async (key: string, value: any) => {
        const params = new URLSearchParams(searchParams)
        params.set(key, value);
        router.replace(`${pathname}?${params.toString()}`);
    };

    const columns = [
        {
            headerName: "Id",
            field: "id",
        },
        {
            headerName: "Amount",
            field: "amount",
            renderCell: (row: TransactionVisible)=>{
                return displayCurrency({amount: row.amount, currency: row.currency})
            }
        },
        {
            headerName: "Payment",
            field: "paymentId",
            renderCell: (row: TransactionVisible)=>{
                return <Link href={`/dashboard/payment/${row.paymentId}/detail`}>{row.paymentId}</Link>
            }
        },
        {
            headerName: "Kind",
            field: "paymentType",
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
            headerName: "Is already processed",
            field: "isAlreadyProcessed",
            renderCell: (row: TransactionVisible) => {
                return <TrueFalseCheck
                    label={row.isAlreadyProcessed ? "Yes" : "No"} isTrue={row.isAlreadyProcessed}
                    falseMessage={"No"}
                    trueMessage={"Yes"}/>
            }
        },
        {
            headerName: "Created at",
            field: "createdAt",
            renderCell: (row: TransactionVisible) => {
                return formatDatetime({date: row.createdAt})
            }
        },
        {
            headerName: "Actions",
            field: "actions",
            sortable: false,
            renderCell: (row: TransactionVisible) => {
                return (
                    <ActionsMenu>
                        <ViewButton href={`/dashboard/transaction/${row.id}/detail`}/>
                    </ActionsMenu>
                )
            },
        },
    ]

    return (
            <EnhancedTable<TransactionVisible>
                title="Payments"
                loading={false}
                currentPage={page - 1}
                rowsPerPage={limit}
                columns={columns}
                rows={rows}/>
    )
}
