"use client"

import React, {useState} from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";

import FormConstructor, {BaseFormInputProps} from "@/components/forms/FormConstructor";
import type { UserVisible, ValidationError} from "@/openapi/client";

import {edit} from "./actions";


interface Props {
    data: UserVisible
}

interface ProfileUpdate  {
    name: string;
}

const Form = ({data}: Props) => {
    const router = useRouter();

    const [
        errors,
        setErrors
    ] = useState<ValidationError[] | null>(null)
    const handleSubmit = async (values: ProfileUpdate, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => {
        const response = await edit(values)
        if (response.status === 200) {
            await callback({
                isError: false,
                message: response.message
            })
            setErrors(null)
            router.refresh();
        } else {
            await callback({isError: true, message: response.message})
            if (response.status === 422) setErrors(response.errors)
        }
    }
    const initialValues = {
        name: data.name,
    }

    const inputs: BaseFormInputProps[] = [
        {
            id: "name",
            name: "name",
            label: "Name",
            inputType: "textField",
            InputProps: {
                required: true,
                type: "text",
            }
        },

    ]

    const schema = z.object(
        {
            name: z.string({required_error: "This field is required"}),
        }
    )


    return (
        <FormConstructor<ProfileUpdate>
            onSubmit={handleSubmit}
            title="Edit my data"
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={() => setErrors(null)}
        />
    )
}

export default Form;
