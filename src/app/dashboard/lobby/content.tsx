"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {MdDelete} from "react-icons/md";

import ReUsableButton from "@/components/ui/buttons/ReUsableButton";
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import EnhancedTable from "@/components/table/EnhancedTable";
import ViewButton from "@/components/ui/buttons/ViewButton";
import AddButton from "@/components/ui/buttons/AddButton";
import {displayCurrency, formatDatetime} from "@/lib/helper";
import {LobbyVisible} from "@/openapi/client";

import {deleteAction} from "./actions";
import TrueFalseCheck from "@/components/features/TrueFalseCheck";


interface Props {
    rows: LobbyVisible[];
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
            headerName: "Telegram group",
            field: "telegramGroup",
        },
        {
            headerName: "Winner group",
            field: "winnerGroup",
        },
        {
            headerName: "Status",
            field: "status",
            renderCell: (row: LobbyVisible) => {
                return row.status.label
            }
        },
        {
            headerName: "Lobby type",
            field: "lobbyType",
            renderCell: (row: LobbyVisible) => {
                return row.lobbyType.label
            }
        },
        {
            headerName: "Stake amount",
            field: "stakeAmount",
            renderCell: (row: LobbyVisible) => {
                return displayCurrency({amount: row.stakeAmount, currency: row.currency})
            }
        },
        {
            headerName: "Total amount",
            field: "totalAmount",
            renderCell: (row: LobbyVisible) => {
                return displayCurrency({amount: row.totalAmount, currency: row.currency})
            }
        },
        {
            headerName: "Price amount",
            field: "priceAmount",
            renderCell: (row: LobbyVisible) => {
                return displayCurrency({amount: row.priceAmount, currency: row.currency})
            }
        },
        {
            headerName: "Fee amount",
            field: "feeAmount",
            renderCell: (row: LobbyVisible) => {
                return displayCurrency({amount: row.feeAmount, currency: row.currency})
            }
        },

        {
            headerName: "Is paid",
            field: "isPaid",
            renderCell: (row: LobbyVisible) => {
                return <TrueFalseCheck
                    label={row.isPaid ? "Yes" : "No"} isTrue={row.isPaid}
                    falseMessage={"No"}
                    trueMessage={"Yes"}/>
            }
        },

        {
            headerName: "Start at",
            field: "startAt",
            renderCell: (row: LobbyVisible) => {
                return formatDatetime({date: row.createdAt})
            }
        },
        {
            headerName: "Created at",
            field: "createdAt",
            renderCell: (row: LobbyVisible) => {
                return formatDatetime({date: row.createdAt})
            }
        },
        {
            headerName: "Actions",
            field: "actions",
            sortable: false,
            renderCell: (row: LobbyVisible) => {
                const handleDelete = async (callback: (props: {
                    isError: boolean, message?: string | null
                }) => Promise<void>) => {
                    const response = await deleteAction(row.id);
                    if (response.status === 200) {
                        await callback({isError: false, message: response.message});
                        router.refresh();
                    } else {
                        await callback({isError: true, message: response.message});
                    }
                }

                return (
                    <ActionsMenu>
                        <ViewButton href={`/dashboard/lobby/${row.id}/detail`}/>
                        <ReUsableButton
                            confirmText={"Are you sure?!"}
                            title="Delete"
                            type="menuItem"
                            icon={<MdDelete/>} onClick={handleDelete}/>
                    </ActionsMenu>
                )
            },
        },
    ]


    const action = (
        <ActionsMenu isMiniButton={true}>
            <AddButton href={"/dashboard/lobby/create"}/>
        </ActionsMenu>
    )

    return (
            <EnhancedTable<LobbyVisible>
                title="Lobbies"
                loading={false}
                currentPage={page - 1}
                rowsPerPage={limit}
                columns={columns}
                rows={rows}
                action={action}/>
    )
}
