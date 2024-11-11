"use client"

import {useRouter} from "next/navigation";
import {MdDelete} from "react-icons/md";

import Stack from "@mui/material/Stack";
import {TableCell, TableRow, } from "@mui/material";


import {LobbyVisible} from "@/openapi/client";
import RefreshButton from "@/components/ui/buttons/RefreshButton";
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import DetailTable from "@/components/table/DetailTable";
import {formatDatetime} from "@/lib/helper";
import {deleteAction} from "@/app/dashboard/lobby/actions";
import ReUsableButton from "@/components/ui/buttons/ReUsableButton";
import Form from "./form";

interface Props {
    data: LobbyVisible;
}

const Content = ({data}: Props) => {
    const router = useRouter();

    const handleDelete = async (callback: (props: {
        isError: boolean, message?: string | null
    }) => Promise<void>) => {
        const response = await deleteAction(data.id);
        if (response.status === 200) {
            await callback({isError: false, message: response.message});
            router.push("/dashboard/lobby");
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
                    title="Delete"
                    type="menuItem"
                    icon={<MdDelete/>} onClick={handleDelete}/>
            </ActionsMenu>
        </Stack>
    )
    return (
        <div className="space-y-10">
            <DetailTable title={"Lobby"} hasData={true} action={action}>
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
                        Created at
                    </TableCell>
                    <TableCell>
                        {formatDatetime({date: data.createdAt})}
                    </TableCell>
                </TableRow>
            </DetailTable>
            <Form data={data}/>

            {/*<EnhancedTable<LobbyUserVisible>*/}
            {/*    title={`Lobby users`}*/}
            {/*    loading={false}*/}
            {/*    currentPage={}*/}
            {/*    rowsPerPage={limit}*/}
            {/*    columns={columns}*/}
            {/*    rows={rows}*/}
            {/*    action={action}/>*/}
        </div>
    )
}

export default Content;
