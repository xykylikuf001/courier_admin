"use client"

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";

import type {PlaceBase, PlaceVisible, ValidationError} from "@/openapi/client";
import FormConstructor, {BaseFormInputProps} from "@/components/forms/FormConstructor";

import {edit} from "./actions";


interface Props {
    data: PlaceVisible
}

const Form = ({data}: Props) => {
    const updateWithId = edit.bind(null, data.id)
    const router = useRouter();
    const [
        errors,
        setErrors
    ] = useState<ValidationError[] | null>(null)
    const handleSubmit = async (values: PlaceBase, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => {
        const response = await updateWithId(values)
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
        slug: data.slug,
        // localtionLevel: data.locationLevel.value??"",
        isActive: data.isActive,
    }

    const inputs: BaseFormInputProps[] = [
        {
            id: "slug",
            name: "slug",
            label: "Slug",
            inputType: "textField",
            InputProps: {
                required: true,
                type: "text",
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
            slug: z.string().optional(),

            isActive: z.boolean().optional(),

        }
    )


    return (
        <FormConstructor<PlaceBase>
            resetForm={false}
            onSubmit={handleSubmit}
            title="Edit place"
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={() => setErrors(null)}
        />
    )
}

export default Form;
