"use client"
import {useRouter} from "next/navigation";
// import {MdDelete} from "react-icons/md";

import Stack from "@mui/material/Stack";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";


import {OrderVisible} from "@/openapi/client";
import RefreshButton from "@/components/ui/buttons/RefreshButton";
// import ActionsMenu from "@/components/features/menu/ActionsMenu";
import DetailTable from "@/components/table/DetailTable";
import {formatDatetime} from "@/lib/helper";
import Link from "@/components/Link";
// import {deleteAction} from "@/app/dashboard/user/actions";
// import ReUsableButton from "@/components/ui/buttons/ReUsableButton";
import Form from "./form";

interface Props {
    data: OrderVisible;
}

const Content = ({data}: Props) => {
    const router = useRouter();

    // const handleDelete = async (callback: (props: {
    //     isError: boolean, message?: string | null
    // }) => Promise<void>) => {
    //     const response = await deleteAction(data.id);
    //     if (response.status === 200) {
    //         await callback({isError: false, message: response.message});
    //         router.push("/dashboard/user");
    //     } else {
    //         await callback({isError: true, message: response.message});
    //     }
    // }
    
    const action = (
        <Stack direction={"row"} spacing={0.1} alignItems="center">
            <RefreshButton onClick={() => router.refresh()}/>
            {/*<ActionsMenu isMiniButton={true}>*/}
            {/*    <ReUsableButton*/}
            {/*        confirmText={"Are you sure?!"}*/}
            {/*        title="Delete"*/}
            {/*        type="menuItem"*/}
            {/*        icon={<MdDelete/>} onClick={handleDelete}/>*/}
            {/*</ActionsMenu>*/}
        </Stack>
    )
    return (
        <div className="tw-space-y-10">
            <DetailTable title={"Order"} hasData={true} action={action}>
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
                        User
                    </TableCell>
                    <TableCell>
                        {data.user && <Link href={`/dashboard/user/${data.user.id}/detail`}>{data.user.name}</Link>}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Code
                    </TableCell>
                    <TableCell>
                        {data.code}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Status
                    </TableCell>
                    <TableCell>
                        {data.status.label}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Sender name
                    </TableCell>
                    <TableCell>
                        {data.senderName}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Sender phone
                    </TableCell>
                    <TableCell>
                        {data.senderPhone}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Receiver name
                    </TableCell>
                    <TableCell>
                        {data.receiverName}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Receiver phone
                    </TableCell>
                    <TableCell>
                        {data.receiverPhone}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Billing address
                    </TableCell>
                    <TableCell>
                        {data.billingAddress}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Shipping address
                    </TableCell>
                    <TableCell>
                        {data.shippingAddress}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Shipping type
                    </TableCell>
                    <TableCell>
                        {data.shippingType.label}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Price
                    </TableCell>
                    <TableCell>
                        {data.price??""}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Shipping amount
                    </TableCell>
                    <TableCell>
                        {data.shippingAmount??""}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Note
                    </TableCell>
                    <TableCell>
                        {data.note??""}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Completed at
                    </TableCell>
                    <TableCell>
                        {data.completedAt && formatDatetime({date: data.completedAt})}
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

        </div>
    )
}

export default Content;
