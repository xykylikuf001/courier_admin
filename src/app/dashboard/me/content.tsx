"use client"

import DetailTable from "@/components/table/DetailTable";
import {TableCell, TableRow} from "@mui/material";
import {formatDatetime} from "@/lib/helper";
import {UserVisible, UserSessionVisible} from "@/openapi/client";
import PasswordForm from "./password-form";
import UserSessions from "./user-sessions";

import Form from "./form";


const Content = ({data, sessions}: { data: UserVisible, sessions: UserSessionVisible[] }) => {
    return (
        <div className="space-y-10">
            <DetailTable title={"User"} hasData={true}>
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
                        Username
                    </TableCell>
                    <TableCell>
                        {data.username}
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
            <PasswordForm/>
            <UserSessions data={sessions}/>
        </div>
    )
}
export default Content;