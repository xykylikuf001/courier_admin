"use client"
import {useState, useCallback, useEffect} from "react";
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import EnhancedTable from "@/components/table/EnhancedTable";
import ViewButton from "@/components/ui/buttons/ViewButton";
import {displayCurrency, formatDatetime} from "@/lib/helper";
import {WalletPayment} from "@/openapi/client";
import {retrieveWalletPayments} from "@/app/dashboard/wallet/[id]/detail/actions";


interface Props {
    rows: WalletPayment[];
    walletId: string;
}


export default function Payments({rows, walletId}: Props) {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [data, setData] = useState<WalletPayment[]>(rows);
    const callback = useCallback(async () => {
        const response = await retrieveWalletPayments(walletId, page, limit);
        if (response.data) {
            setData(response.data.rows)
        } else {
            setData([])
        }

    }, [page, limit])


    useEffect(() => {
        callback()
    }, [callback])

    const columns = [
        {
            headerName: "Total amount",
            field: "totalAmount",
            renderCell: (row: WalletPayment) => {
                return displayCurrency({amount: row.totalAmount, currency: row.currency})
            }
        },
        {
            headerName: "Captured amount",
            field: "capturedAmount",
            renderCell: (row: WalletPayment) => {
                return displayCurrency({amount: row.capturedAmount, currency: row.currency})
            }
        },
        {
            headerName: "Payment type",
            field: "paymentType",
            renderCell: (row: WalletPayment) => {
                return row.paymentType.label
            }
        },
        {
            headerName: "Charge status",
            field: "chargeStatus",
            renderCell: (row: WalletPayment) => {
                return row.chargeStatus.label
            }
        },
        {
            headerName: "Gateway",
            field: "gateway",
        },
        {
            headerName: "Created at",
            field: "createdAt",
            renderCell: (row: WalletPayment) => {
                return formatDatetime({date: row.createdAt})
            }
        },
        {
            headerName: "Actions",
            field: "actions",
            sortable: false,
            renderCell: (row: WalletPayment) => {
                return (
                    <ActionsMenu>
                        <ViewButton href={`/dashboard/payment/${row.id}/detail`}/>
                    </ActionsMenu>
                )
            },
        },
    ]

    return (
        <EnhancedTable<WalletPayment>
            title="Payments"
            loading={false}
            currentPage={page - 1}
            rowsPerPage={limit}
            columns={columns}
            onPageChange={(page: number)=> {
                setPage(page)
            }}
            rows={data}/>
    )
}
