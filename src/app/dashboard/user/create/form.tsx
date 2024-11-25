"use client"

import React, {useState} from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";


import FormConstructor, {BaseFormInputProps} from '@/components/forms/FormConstructor';
import {ValidationError, UserCreate} from '@/openapi/client';

import {create} from "./actions";


const Form = () => {
    const router = useRouter();
    const [errors, setErrors] = useState<ValidationError[] | null>(null);

    const inputs: BaseFormInputProps[] = [

        {
            id: "name",
            name: "name",
            label: "Name",
            inputType: "textField",
            InputProps: {
                required: true,
                type: "text",
                autoFocus: true,
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
            id: "phone",
            name: "phone",
            label: "Phone",
            inputType: "textField",
            InputProps: {
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
            id: "isActive",
            name: "isActive",
            label: "Is active",
            inputType: "checkboxField",
        },
    ]

    const schema = z.object(
        {
            email: z.string().email("Please fill valid email").optional(),
            phone: z.string().optional(),
            name: z.string({required_error: "This field is required"}),
            password: z.string({required_error: "This field is required"}).min(
                8, "Password must not be shorter than 8 symbols"
            ),

            isActive: z.boolean().optional(),
        }
    )


    const handleSubmit = async (values: UserCreate, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => {
        const response = await create({
            password: values.password,
            phone: values.phone,
            email: values.email,
            name: values.name,
            isStaff: values.isStaff,
            isActive: values.isActive,
        })
        if (response.status === 201) {
            await callback({
                isError: false,
                message: response.message
            })
            setErrors(null)
            if (response.data) {
                router.push(`/dashboard/user/${response.data.id}/detail`)
            }
        } else {
            await callback({isError: true, message: response.message})

            if (response.status === 422) setErrors(response.errors)
        }
    }

    const initialValues = {
        email: "",
        username: "",
        password: "",
        name: "",
        isActive: true,
        isStaff: false,
        phone: "",
    }
    return (
        <FormConstructor<UserCreate>
            onSubmit={handleSubmit}
            title={"Add new user"}
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={() => setErrors(null)}
        />
    )
}

export default Form;