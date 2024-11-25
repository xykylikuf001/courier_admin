"use client"

import React, {useState} from "react";
import {z} from "zod";

import FormConstructor, {BaseFormInputProps} from "@/components/forms/FormConstructor";
import type {UserBase, UserVisible, ValidationError} from "@/openapi/client";

import {edit} from "./actions";


interface Props {
    data: UserVisible
}

const Form = ({data}: Props) => {
    const updateWithId = edit.bind(null, data.id)

    const [
        errors,
        setErrors
    ] = useState<ValidationError[] | null>(null)
    const handleSubmit = async (values: UserBase, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => {
        const response = await updateWithId({
            name: values.name,
            email: values.email,
            isActive: values.isActive,
            isStaff: values.isStaff,
            phone: values.phone,
            phoneVerifiedAt: values.phoneVerifiedAt,
            emailVerifiedAt: values.emailVerifiedAt,
            password: values.password,
        })
        if (response.status === 200) {
            await callback({
                isError: false,
                message: response.message
            })
            setErrors(null)

            // setTimeout(()=>{
                // router.prefetch(window.location.href);
                // router.refresh();
                window.location.reload();

            // }, 2000)
        } else {
            await callback({isError: true, message: response.message})
            if (response.status === 422) setErrors(response.errors)
        }
    }
    const initialValues = {
        name: data.name,
        email: data?.email??"",
        emailVerifiedAt: data.emailVerifiedAt??"",
        phone: data?.phone??"",
        phoneVerifiedAt: data.phoneVerifiedAt??"",
        isActive: data.isActive,
        isStaff: data.isStaff,
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
            id: "emailVerifiedAt",
            name: "emailVerifiedAt",
            label: "Email Verified At",
            inputType: "datetimeField",
        },
        {
            id: "phone",
            name: "phone",
            label: "Phone",
            inputType: "textField",
            InputProps: {
                type: "text",
            }
        },

        {
            id: "phoneVerifiedAt",
            name: "phoneVerifiedAt",
            label: "Phone Verified At",
            inputType: "datetimeField",
        },
        {
            id: "password",
            name: "password",
            label: "Password",
            inputType: "textField",

            InputProps: {
                type: "text",
                placeholder: "If you leave it empty password will not changed"
            }
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
            email: z.string().email("Please fill valid email").nullable().optional(),
            phone: z.string().nullable().optional(),
            name: z.string({required_error: "This field is required"}),

            isStaff: z.boolean().optional(),
            isActive: z.boolean().optional(),

        }
    )


    return (
        <FormConstructor<UserBase>
            resetForm={false}
            onSubmit={handleSubmit}
            title="Edit order"
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={() => setErrors(null)}
        />
    )
}

export default Form;
