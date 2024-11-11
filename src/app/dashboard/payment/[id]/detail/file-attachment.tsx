"use client"

import {PaymentAttachmentVisible} from "@/openapi/client";
import EnhancedTable from "@/components/table/EnhancedTable";
import FileAttachment from "@/components/FileAttachment";
import {useRouter} from "next/navigation";
import AttachmentForm from "./attachment-form";
import {formatDatetime} from "@/lib/helper";


interface Props {
    rows: PaymentAttachmentVisible[];
    objId: number;
}


export default function AttachmentList({objId,rows}: Props) {
    const router = useRouter()
    const columns = [
        {
            headerName: "ID",
            field: "id",
        },
        {
            headerName: "File",
            field: "File",
            renderCell: (row: PaymentAttachmentVisible) => {
                return (
                    <FileAttachment fileType={row.file.fileType.value}
                           TypeProps={{
                               alt: "",
                               height: 100,
                               width: 100,
                               style: {objectFit: "contain"}
                           }}
                           asLink={true}
                           data={row.file}/>
                )
            }
        },
        {
            headerName: "Created at",
            field: "createdAt",
            renderCell: (row: PaymentAttachmentVisible) => {
                return formatDatetime({date: row.createdAt})
            }
        },
    ]


    return (
        <div className="space-y-10">
            <EnhancedTable<PaymentAttachmentVisible>
                rowsPerPage={100}
                currentPage={1}
                title="Payment attachments"
                loading={false}
                columns={columns}
                rows={rows}/>
            <AttachmentForm paymentId={objId}/>
        </div>
    )
}