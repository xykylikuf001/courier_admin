"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation";

import ActionsMenu from "@/components/features/menu/ActionsMenu";
import EnhancedTable from "@/components/table/EnhancedTable";
import ViewButton from "@/components/ui/buttons/ViewButton";
import {displayCurrency, formatDatetime} from "@/lib/helper";
import {WalletVisibleExtended} from "@/openapi/client";
import Link from "@/components/Link";
import CopyContainer from "@/components/features/Copy";

interface Props {
    rows: WalletVisibleExtended[];
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
            headerName: "Wallet",
            field: "userId",
            renderCell: (row: WalletVisibleExtended)=>{
                return <CopyContainer text={row.id}/>
            }
        },
        {
            headerName: "User",
            field: "user",
            renderCell: (row: WalletVisibleExtended)=>{
                return <Link href={`/dashboard/user/${row.user.id}/detail`}>{row.user.username}</Link>
            }
        },
        {
            headerName: "Amount",
            field: "amount",
            renderCell: (row: WalletVisibleExtended)=>{
                return displayCurrency({amount: row.amount, currency: row.currency})
            }
        },
        {
            headerName: "Created at",
            field: "createdAt",
            renderCell: (row: WalletVisibleExtended) => {
                return formatDatetime({date: row.createdAt})
            }
        },
        {
            headerName: "Actions",
            field: "actions",
            sortable: false,
            renderCell: (row: WalletVisibleExtended) => {
                return (
                    <ActionsMenu>
                        <ViewButton href={`/dashboard/wallet/${row.id}/detail`}/>
                    </ActionsMenu>
                )
            },
        },
    ]

    return (
        <EnhancedTable<WalletVisibleExtended>
            title="Wallets"
            loading={false}
            currentPage={page - 1}
            rowsPerPage={limit}
            columns={columns}
            rows={rows}/>
    )
}
