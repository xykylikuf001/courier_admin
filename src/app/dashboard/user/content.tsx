"use client"
import {Fragment} from "react";
import {UserVisible} from "@/openapi/client";
import {formatDatetime} from "@/lib/helper";
import TrueFalseCheck from "@/components/features/TrueFalseCheck";
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import EnhancedTable from "@/components/table/EnhancedTable";
import ViewButton from "@/components/ui/buttons/ViewButton";
import AddButton from "@/components/ui/buttons/AddButton";


import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {deleteAction} from "./actions";
import ReUsableButton from "@/components/ui/buttons/ReUsableButton";
import {MdDelete} from "react-icons/md";



interface Props {
    rows: UserVisible[];
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
            headerName: "Username",
            field: "username",
        },
        {
            headerName: "Name",
            field: "name",
        },
        {
            headerName: "Email",
            field: "email",
        },
        {
            headerName: "Telegram ID",
            field: "telegramId",
        },
        {
            headerName: "Telegram name",
            field: "telegramName",
        },
        {
            headerName: "Pubg name",
            field: "pubgName",
        },
        {
            headerName: "Age",
            field: "age",
        },

        {
            headerName: "Is staff",
            field: "isStaff",
            renderCell: (row: UserVisible) => {
                return <TrueFalseCheck
                    label={row.isStaff ? "Yes" : "No"} isTrue={row.isStaff}
                    falseMessage={"No"}
                    trueMessage={"Yes"}/>
            }
        },
        {
            headerName: "Is active",
            field: "isActive",
            renderCell: (row: UserVisible) => {
                return <TrueFalseCheck
                    label={row.isActive ? "Yes" : "No"} isTrue={row.isActive}
                    falseMessage={"No"}
                    trueMessage={"Yes"}/>
            }
        },
        {
            headerName: "Created at",
            field: "createdAt",
            renderCell: (row: UserVisible) => {
                return formatDatetime({date: row.createdAt})
            }
        },
        {
            headerName: "Actions",
            field: "actions",
            sortable: false,
            renderCell: (row: UserVisible) => {
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
                        <ViewButton href={`/dashboard/user/${row.id}/detail`}/>
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
            <AddButton href={"/dashboard/user/create"}/>
        </ActionsMenu>
    )

    return (
        <Fragment>
            <EnhancedTable<UserVisible>
                title={`Users`}
                loading={false}
                currentPage={page - 1}
                rowsPerPage={limit}
                columns={columns}
                rows={rows}
                action={action}/>
        </Fragment>
    )
}
