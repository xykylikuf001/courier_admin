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
            id: "username",
            name: "username",
            label: "Username",
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
            id: "birthday",
            name: "birthday",
            label: "Birthday",
            inputType: "datetimeField",

        },
        {
            id: "isActive",
            name: "isActive",
            label: "Is active",
            inputType: "checkboxField",
        },
        {
            id: "isStaff",
            name: "isStaff",
            label: "Is staff",
            inputType: "checkboxField",
        },

    ]

    const schema = z.object(
        {
            username: z.string({required_error: "This field is required"}),
            email: z.string().email("Please fill valid email").optional(),
            name: z.string({required_error: "This field is required"}),

            isStaff: z.boolean().optional(),
            isActive: z.boolean().optional(),
            birthday: z.string({required_error: "This field is required"}).datetime({"message": "Please fill valid date"}),
        }
    )


    const handleSubmit = async (values: UserCreate, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => {
        const response = await create({
            username: values.username,
            password: values.password,
            email: values.email,
            name: values.name,
            isStaff: values.isStaff,
            isActive: values.isActive,
            birthday: values.birthday
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
        birthday: "",
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