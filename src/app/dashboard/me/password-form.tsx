"use client"

import React, {useState} from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";

import FormConstructor, {BaseFormInputProps} from "@/components/forms/FormConstructor";
import type {ProfilePasswordIn, UserVisible, ValidationError} from "@/openapi/client";

import {changePassword} from "./actions";


const PasswordForm = () => {
    const router = useRouter();

    const [
        errors,
        setErrors
    ] = useState<ValidationError[] | null>(null)
    const handleSubmit = async (values: ProfilePasswordIn, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => {
        const response = await changePassword(values)
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
        oldPassword: "",
        password: "",
        passwordConfirm: "",
    }

    const inputs: BaseFormInputProps[] = [

        {
            id: "oldPassword",
            name: "oldPassword",
            label: "Old password",
            inputType: "textField",
            InputProps: {
                required: true,
                type: "text",
            }
        },
        {
            id: "password",
            name: "password",
            label: "Password",
            inputType: "textField",
            InputProps: {
                required: true,
                type: "text",
            }
        },
        {
            id: "passwordConfirm",
            name: "passwordConfirm",
            label: "Password confirm",
            inputType: "textField",
            InputProps: {
                required: true,
                type: "text",
            }
        },
    ]

    const schema = z.object(
        {
            oldPassword: z.string({required_error: "This field is required"}),
            password: z.string({required_error: "This field is required"}),
            passwordConfirm: z.string({required_error: "This field is required"}),

        }
    )


    return (
        <FormConstructor<ProfilePasswordIn>
            onSubmit={handleSubmit}
            title="Change my password"
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={() => setErrors(null)}
        />
    )
}

export default PasswordForm;
