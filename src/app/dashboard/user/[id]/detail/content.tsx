"use client"
import {useRouter} from "next/navigation";
import {MdDelete} from "react-icons/md";

import Stack from "@mui/material/Stack";
import {TableCell, TableRow} from "@mui/material";


import {UserVisible} from "@/openapi/client";
import RefreshButton from "@/components/ui/buttons/RefreshButton";
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import DetailTable from "@/components/table/DetailTable";
import {formatDatetime} from "@/lib/helper";
import {deleteAction} from "@/app/dashboard/user/actions";
import ReUsableButton from "@/components/ui/buttons/ReUsableButton";
import Form from "./form";
import Wallet from "@/app/dashboard/user/[id]/detail/wallet";

interface Props {
    data: UserVisible;
}

const Content = ({data}: Props) => {
    const router = useRouter();

    const handleDelete = async (callback: (props: {
        isError: boolean, message?: string | null
    }) => Promise<void>) => {
        const response = await deleteAction(data.id);
        if (response.status === 200) {
            await callback({isError: false, message: response.message});
            router.push("/dashboard/user");
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
            <DetailTable title={"User"} hasData={true} action={action}>
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
            <Wallet user={data} data={data.wallet}/>

        </div>
    )
}

export default Content;
