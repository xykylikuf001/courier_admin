"use client"

import React, {useState} from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";


import FormConstructor, {BaseFormInputProps} from '@/components/forms/FormConstructor';
import type {ValidationError} from '@/openapi/client';

import {appendAttachment} from "./actions";
import {Box} from "@mui/material";
import DropzoneArea from "@/components/features/Dropzone/DropzoneArea";

const AttachmentForm = ({paymentId}: { paymentId: number }) => {
    const router = useRouter();

    const inputs: BaseFormInputProps[] = [
        {
            id: "files",
            name: "files",
            label: "",
            inputType: "componentField",
            render: (formik, error, helperText) => {
                return (
                    <Box p={3} textAlign="center">
                        <DropzoneArea
                            filesLimit={1}
                            acceptedFiles={{
                                // 'application/pdf': [".pdf"],
                                'image/*': ['.jpeg', '.png', "jpg"]
                            }}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(newFiles: File[]) => formik.setFieldValue("files", newFiles)}
                            showPreviews={true}
                            showPreviewsInDropzone={false}
                            useChipsForPreview
                            previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                            previewText="Selected files"
                        />
                    </Box>
                )
            },
        },

    ]

    const schema = z.object(
        {
            files: z.array(z.any()).length(1)
        }
    )
    const [
        errors,
        setErrors
    ] = useState<ValidationError[] | null>(null);


    const handleSubmit = async (values: { files: File[] }, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => {
        if (values.files.length === 0) {
            await callback({isError: true, message: "Please select one more file"})
        }
        const formData = new FormData();
        formData.append("file", values.files[0] as File);
        formData.append("paymentId", String(paymentId))
        const response = await appendAttachment(formData)
        if (response.status === 201) {
            await callback({
                isError: false,
                message: response.message
            })
            setErrors(null)
            if (response.data) {
                router.refresh()
            }
        } else {
            await callback({isError: true, message: response.message})
            if (response.status === 422) setErrors(response.errors)
        }
    }

    const initialValues = {
        files: []
    } as {files: File[]}

    return (
        <FormConstructor<{ files: File[] }>
            onSubmit={handleSubmit}
            title={"Append payment attachment"}
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={() => setErrors(null)}
        />
    )
}

export default AttachmentForm;