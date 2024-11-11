"use client"


import {usePathname, useRouter, useSearchParams} from "next/navigation";

import ActionsMenu from "@/components/features/menu/ActionsMenu";
import EnhancedTable from "@/components/table/EnhancedTable";
import ViewButton from "@/components/ui/buttons/ViewButton";
import {displayCurrency, formatDatetime} from "@/lib/helper";
import {PaymentVisible} from "@/openapi/client";
import Link from "@/components/Link";
import TrueFalseCheck from "@/components/features/TrueFalseCheck";


interface Props {
    rows: PaymentVisible[];
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
            headerName: "Wallet",
            field: "walletId",
            renderCell: (row: PaymentVisible)=>{
                return <Link href={`/dashboard/wallet/${row.walletId}/detail`}>{row.walletId}</Link>
            }
        },
        {
            headerName: "Staff user",
            field: "staffId",
            renderCell: (row: PaymentVisible)=>{
                if (!row.staff) return <div/>
                return <Link href={`/dashboard/user/${row.staffId}/detail`}>{row.staff.username}</Link>
            }
        },
        {
            headerName: "Total amount",
            field: "totalAmount",
            renderCell: (row: PaymentVisible)=>{
                return displayCurrency({amount: row.totalAmount, currency: row.currency})
            }
        },
        {
            headerName: "Capture amount",
            field: "capturedAmount",
            renderCell: (row: PaymentVisible)=>{
                return displayCurrency({amount: row.capturedAmount, currency: row.currency})
            }
        },
        {
            headerName: "Charge status",
            field: "chargeStatus",
            renderCell: (row: PaymentVisible) => {
                return row.chargeStatus.label
            }
        },
        {
            headerName: "Payment type",
            field: "paymentType",
            renderCell: (row: PaymentVisible) => {
                return row.paymentType.label
            }
        },
        {
            headerName: "Is active",
            field: "isActive",
            renderCell: (row: PaymentVisible) => {
                return <TrueFalseCheck
                    label={row.isActive ? "Yes" : "No"} isTrue={row.isActive}
                    falseMessage={"No"}
                    trueMessage={"Yes"}/>
            }
        },
        {
            headerName: "Created at",
            field: "createdAt",
            renderCell: (row: PaymentVisible) => {
                return formatDatetime({date: row.createdAt})
            }
        },
        {
            headerName: "Actions",
            field: "actions",
            sortable: false,
            renderCell: (row: PaymentVisible) => {
                return (
                    <ActionsMenu>
                        <ViewButton href={`/dashboard/payment/${row.id}/detail`}/>
                    </ActionsMenu>
                )
            },
        },
    ]

    return (
            <EnhancedTable<PaymentVisible>
                title="Payments"
                loading={false}
                currentPage={page - 1}
                rowsPerPage={limit}
                columns={columns}
                rows={rows}/>
    )
}
