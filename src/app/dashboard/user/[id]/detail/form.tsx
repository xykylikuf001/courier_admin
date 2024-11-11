"use client"

import React, {useState} from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";

import FormConstructor, {BaseFormInputProps} from "@/components/forms/FormConstructor";
import type {UserBase, UserVisible, ValidationError} from "@/openapi/client";

import {edit} from "./actions";


interface Props {
    data: UserVisible
}

const Form = ({data}: Props) => {
    const updateWithId = edit.bind(null, data.id)
    const router = useRouter();

    const [
        errors,
        setErrors
    ] = useState<ValidationError[] | null>(null)
    const handleSubmit = async (values: UserBase, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => {
        const response = await updateWithId({
            username: values.username,
            name: values.name,
            email: values.email,
            isActive: values.isActive,
            isStaff: values.isStaff,
            birthday: values.birthday
        })
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
        username: data.username,
        email: data.email,
        isActive: data.isActive,
        isStaff: data.isStaff,
        birthday: data.birthday
    }

    const inputs: BaseFormInputProps[] = [
        {
            id: "username",
            name: "username",
            label: "Username",
            inputType: "textField",
            InputProps: {
                required: true,
                type: "text",
            }
        },
        {
            id: "email",
            name: "email",
            label: "Email",
            inputType: "textField",
            InputProps: {
                type: "text",
            }
        },
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
        {
            id: "password",
            name: "password",
            label: "Password",
            inputType: "textField",
            InputProps: {
                type: "text",
            }
        },

        {
            id: "birthday",
            name: "birthday",
            label: "Birthday",
            inputType: "datetimeField",

        },
        {
            id: "isStaff",
            name: "isStaff",
            label: "Is Staff",
            inputType: "checkboxField",
        },
        {
            id: "isActive",
            name: "isActive",
            label: "Is Active",
            inputType: "checkboxField",
        }
    ]

    const schema = z.object(
        {
            username: z.string({required_error: "This field is required"}),
            email: z.string().email("Please fill valid email").nullable().optional(),
            name: z.string({required_error: "This field is required"}),

            isStaff: z.boolean().optional(),
            isActive: z.boolean().optional(),
            birthday: z.string({required_error: "This field is required"}).datetime({"message": "Please fill valid date"}),

        }
    )


    return (
        <FormConstructor<UserBase>
            onSubmit={handleSubmit}
            title="Edit user"
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={() => setErrors(null)}
        />
    )
}

export default Form;
