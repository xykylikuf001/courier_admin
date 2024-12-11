"use client"

import React, {useState} from "react";
import { z } from "zod";
import {useRouter} from "next/navigation";

import FormConstructor, { BaseFormInputProps } from "@/components/forms/FormConstructor";
import type {ValidationError, PlaceTranslationBase, PlaceTranslationVisible} from "@/openapi/client";

import {editTranslation} from "./actions";

const Form = ({data}: {data: PlaceTranslationVisible})=>{
    const editWithIdAndLocale = editTranslation.bind(
        null, data.id, data.locale.value
    );
    const router = useRouter();

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
            id: "fullName",
            name: "fullName",
            label: "Full name",
            inputType: "textField",
            InputProps: {
                type: "text",
            }
        },

    ]

    const schema = z.object(
        {
            name: z.string({required_error: "This field required"}),
            fullName: z.string().optional(),
        }
    )
    const [
        errors,
        setErrors
    ] = useState< ValidationError[]|null>(null)
    const handleSubmit = async (values: PlaceTranslationBase, callback: (props: {
        isError: boolean,
        message?: string | null
    })=>Promise<void>)=>{
        const response = await editWithIdAndLocale(values)
        if (response.status === 200){
            await callback({
                isError: false,
                message: response.message
            })
            setErrors(null)
            router.refresh()
        }else{
            await callback({isError: true, message: response.message})
            if (response.status === 422) setErrors(response.errors)
        }
    }

    const initialValues = {
        name: data.name,
        fullName: data.fullName,
    }

    return (
        <FormConstructor<PlaceTranslationBase>
            onSubmit={handleSubmit}
            title={`Edit place translation: ${data.locale.label}`}
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={()=>setErrors(null)}
        />
    )
}

export default Form;