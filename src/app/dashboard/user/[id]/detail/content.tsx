"use client"
import {useRouter} from "next/navigation";
import {MdDelete, MdPhone} from "react-icons/md";

import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";


import {UserVisible} from "@/openapi/client";
import RefreshButton from "@/components/ui/buttons/RefreshButton";
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import DetailTable from "@/components/table/DetailTable";
import {formatDatetime} from "@/lib/helper";
import {deleteAction} from "@/app/dashboard/user/actions";
import ReUsableButton from "@/components/ui/buttons/ReUsableButton";
import Form from "./form";
import {confirmPhone, getPhoneOtp} from "./actions";
import {useState} from "react";
import UserSessions from "./user-session";

interface Props {
    data: UserVisible;
}

const Content = ({data}: Props) => {
    const router = useRouter();
    const [phoneOtp, setPhoneOtp] = useState<string | null>(null);

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

    const handleGetOtpClick = async (callback: (props: {
        isError: boolean, message?: string | null
    }) => Promise<void>) => {
        if (!data.phone || data.phoneVerifiedAt != null) {
            await callback({isError: false, message: "Phone does not exist or already verified"});
            return
        }
        const response = await getPhoneOtp(data.phone);
        if (response.status === 200) {
            await callback({isError: false, message: response.message});
            setPhoneOtp(response?.data ?? "");
        } else {
            await callback({isError: true, message: response.message});
            setPhoneOtp(null);
        }
    }

    const handleConfirmPhone = async (callback: (props: {
        isError: boolean, message?: string | null
    }) => Promise<void>) => {
        const response = await confirmPhone(data.id);
        if (response.status === 200) {
            await callback({isError: false, message: response.message});
            // setTimeout(()=>{
            // router.prefetch(window.location.href);
            // router.refresh();
            window.location.reload();
            // }, 2000)
        } else {
            await callback({isError: true, message: response.message});
        }
    }

    const action = (
        <Stack direction={"row"} spacing={0.1} alignItems="center">
            <RefreshButton onClick={() => router.refresh()}/>
            <ActionsMenu isMiniButton={true}>
                {data.phoneVerifiedAt == null && <ReUsableButton
                    confirmText={"Are you sure?!"}
                    title="Confirm phone"
                    type="menuItem"
                    icon={<MdPhone/>} onClick={handleConfirmPhone}/>}
                <ReUsableButton
                    confirmText={"Are you sure?!"}
                    title="Delete"
                    type="menuItem"
                    icon={<MdDelete/>} onClick={handleDelete}/>
            </ActionsMenu>
        </Stack>
    )

    return (
        <div className="tw-space-y-10">
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
                        Name
                    </TableCell>
                    <TableCell>
                        {data.name}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Email
                    </TableCell>
                    <TableCell>
                        {data.email}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Email verified at
                    </TableCell>
                    <TableCell>
                        {data.emailVerifiedAt && formatDatetime({date: data.emailVerifiedAt})}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Phone
                    </TableCell>
                    <TableCell>
                        {data.phone}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Phone verified at
                    </TableCell>
                    <TableCell>
                        {
                            data.phoneVerifiedAt
                                ? formatDatetime({date: data.phoneVerifiedAt})
                                : (
                                    <div>
                                        {phoneOtp && <span>{phoneOtp}</span>}
                                        <ReUsableButton type="menuItem" icon={<MdPhone/>}
                                                        title="Get phone otp" onClick={handleGetOtpClick}/>
                                    </div>
                                )
                        }
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        User type
                    </TableCell>
                    <TableCell>
                        {data.userType.label}
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
            <UserSessions data={data.sessions??[]}/>
        </div>
    )
}

export default Content;
